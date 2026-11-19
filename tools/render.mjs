// Renders a script from this template as the launcher does (octarine-client's scaffold package: Plan), for the
// template's CI: the same layers, renames, substitutions escaped by the kind of file, merges and the composed
// src/index.ts, byte for byte (the launcher's tests compare the two). No dependencies.
//
//   node tools/render.mjs --game dota2 --out <dir> [--features all|id,id] [--values values.json]
import fs from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..')

function args() {
  const out = { features: 'all', values: null }
  const a = process.argv.slice(2)
  for (let i = 0; i < a.length; i += 2) out[a[i].replace(/^--/, '')] = a[i + 1]
  if (!out.game || !out.out) {
    console.error('usage: node tools/render.mjs --game <id> --out <dir> [--features all|id,id] [--values values.json]')
    process.exit(2)
  }
  return out
}

const read = (rel) => fs.readFileSync(path.join(ROOT, rel), 'utf8')
const json = (rel) => JSON.parse(read(rel))

function walk(rel) {
  const full = path.join(ROOT, rel)
  if (!fs.existsSync(full)) return []
  const out = []
  const go = (dir, prefix) => {
    for (const e of fs.readdirSync(dir, { withFileTypes: true }).sort((x, y) => (x.name < y.name ? -1 : x.name > y.name ? 1 : 0))) {
      const p = prefix ? `${prefix}/${e.name}` : e.name
      if (e.isDirectory()) go(path.join(dir, e.name), p)
      else out.push(p)
    }
  }
  go(full, '')
  return out
}

function typeOf(name) {
  const l = name.toLowerCase()
  if (/\.(ts|tsx|mjs|cjs|js)$/.test(l)) return 'code'
  if (l.endsWith('.json') || l.endsWith('.madgerc')) return 'json'
  if (l.endsWith('.md') || l.endsWith('.mdc')) return 'markdown'
  return 'text'
}

// The inside of a JSON string as Go's encoding/json writes it (<, > and & escaped, U+2028/9 too).
function jsonBody(s) {
  return JSON.stringify(s)
    .slice(1, -1)
    .replace(/</g, '\\u003c')
    .replace(/>/g, '\\u003e')
    .replace(/&/g, '\\u0026')
    .replace(/\u2028/g, '\\u2028')
    .replace(/\u2029/g, '\\u2029')
}

function escape(type, s) {
  switch (type) {
    case 'json':
      return jsonBody(s)
    case 'code':
      return jsonBody(s).replace(/\\"|`|\$/g, (m) => (m === '`' ? '\\u0060' : m === '$' ? '\\u0024' : '\\u0022'))
    case 'markdown':
      return s.replace(/[\\`*_[\]<>#|!~]/g, (c) => '\\' + c)
  }
  return s
}

const PLACEHOLDER = /@@([A-Za-z]+)@@/g
const CODE_LINE = /^(export )?const [A-Z][A-Z0-9_]* = "[^"\\]*"$/

function substitute(name, type, text, vals) {
  if (!/@@[A-Za-z]+@@/.test(text)) return text
  if (type === 'code') {
    text.split('\n').forEach((line, i) => {
      if (/@@[A-Za-z]+@@/.test(line) && !CODE_LINE.test(line.trim())) throw new Error(`${name}:${i + 1}: a substitution outside a constant's string`)
    })
  }
  return text.replace(PLACEHOLDER, (m, key) => {
    if (!(key in vals)) throw new Error(`${name}: unknown ${m}`)
    return escape(type, vals[key])
  })
}

// Go's encoding of a merged JSON file: tabs, "key": value, one a line.
function encode(v, depth = 0) {
  const ind = (d) => '\t'.repeat(d)
  if (Array.isArray(v)) {
    if (v.length === 0) return '[]'
    return '[\n' + v.map((x) => ind(depth + 1) + encode(x, depth + 1)).join(',\n') + '\n' + ind(depth) + ']'
  }
  if (v && typeof v === 'object') {
    const keys = Object.keys(v)
    if (keys.length === 0) return '{}'
    return '{\n' + keys.map((k) => ind(depth + 1) + '"' + jsonBody(k) + '": ' + encode(v[k], depth + 1)).join(',\n') + '\n' + ind(depth) + '}'
  }
  if (typeof v === 'string') return '"' + jsonBody(v) + '"'
  return JSON.stringify(v)
}

function merge(dst, src, at) {
  for (const k of Object.keys(src)) {
    if (!(k in dst)) {
      dst[k] = src[k]
      continue
    }
    const d = dst[k]
    const s = src[k]
    if (d && s && typeof d === 'object' && typeof s === 'object' && !Array.isArray(d) && !Array.isArray(s)) merge(d, s, `${at}.${k}`)
    else if (encode(d) !== encode(s)) throw new Error(`merge ${at}.${k}: two different values`)
  }
}

export function render(game, features, vals) {
  const tpl = json('template.json')
  const g = json(`games/${game}/game.json`)
  const chosen = g.features.map((f) => f.id).filter((id) => features === 'all' || features.includes(id))
  const files = new Map()
  const find = (rel) => [...files.keys()].find((k) => k.toLowerCase() === rel.toLowerCase())
  const layers = ['common/files', `games/${game}/files`, `common/licenses/${vals.license}/files`, ...chosen.map((id) => `games/${game}/features/${id}/files`)]
  for (const layer of layers) {
    for (const rel0 of walk(layer)) {
      const dir = rel0.includes('/') ? rel0.slice(0, rel0.lastIndexOf('/') + 1) : ''
      const base = rel0.slice(dir.length)
      const rel = tpl.rename && tpl.rename[base] ? dir + tpl.rename[base] : rel0
      if (find(rel)) throw new Error(`${rel}: two layers write it`)
      const raw = read(`${layer}/${rel0}`).replace(/\r\n/g, '\n')
      files.set(rel, substitute(`${layer}/${rel0}`, typeOf(rel), raw, vals))
    }
  }
  const mergeFile = (src, rel) => {
    const key = find(rel)
    if (!key) throw new Error(`merge ${rel}: no such file`)
    const add = JSON.parse(substitute(src, 'json', read(src), vals))
    const cur = JSON.parse(files.get(key))
    merge(cur, add, rel)
    files.set(key, encode(cur) + '\n')
  }
  for (const id of chosen) {
    const root = `games/${game}/features/${id}/merge`
    for (const rel of walk(root)) mergeFile(`${root}/${rel}`, rel)
  }
  if (vals.repositoryUrl) mergeFile('common/optional/repository.json', 'package.json')
  if (find('src/index.ts')) throw new Error('src/index.ts is composed by the launcher')
  files.set('src/index.ts', 'import "./translations"\nimport "./menu"\n' + chosen.map((id) => `import "./features/${id}"\n`).join(''))
  for (const [rel, text] of files) {
    if (/@@[A-Za-z]+@@/.test(text)) throw new Error(`${rel}: a substitution is left`)
    if (typeOf(rel) === 'json') JSON.parse(text)
  }
  return new Map([...files.entries()].sort(([a], [b]) => (a < b ? -1 : a > b ? 1 : 0)))
}

// The values the CI renders with: every kind of character a value may hold.
export function ciValues(game) {
  const g = json(`games/${game}/game.json`)
  return {
    gameId: game,
    gameTitle: g.title,
    sdkDir: g.sdkDir,
    scriptName: 'Template Check',
    packageName: 'template-check',
    description: 'Checks "the" template <ok> & `$x` *a_b*',
    author: 'Octarine CI',
    repositoryUrl: 'https://github.com/octarine-public/template-check',
    license: json('template.json').defaultLicense,
    menuTab: g.menuTabs[0],
    year: '2026',
    packageManager: 'npm',
  }
}

if (process.argv[1] && path.resolve(process.argv[1]) === fileURLToPath(import.meta.url)) {
  const a = args()
  const vals = a.values ? JSON.parse(fs.readFileSync(a.values, 'utf8')) : ciValues(a.game)
  const features = a.features === 'all' ? 'all' : a.features.split(',').filter(Boolean)
  const files = render(a.game, features, vals)
  for (const [rel, text] of files) {
    const p = path.join(a.out, rel)
    fs.mkdirSync(path.dirname(p), { recursive: true })
    fs.writeFileSync(p, text)
  }
  console.log(`${a.game}: ${files.size} files -> ${a.out}`)
}
