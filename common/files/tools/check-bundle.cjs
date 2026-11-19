// Every source file has to be reachable from index.ts: the bundler starts there, and a file no
// import leads to is dropped without a word - the package keeps serving whatever it built last.
//
//   node tools/check-bundle.cjs
const ts = require("typescript")
const fs = require("fs")
const path = require("path")

const SDK_DIR = "@@sdkDir@@"
const ROOT = path.resolve(__dirname, "..").replace(/\\/g, "/")
const ENTRY = `${ROOT}/index.ts`

const config = ts.parseJsonConfigFileContent(
	ts.readConfigFile(path.join(ROOT, "tsconfig.json"), ts.sys.readFile).config,
	ts.sys,
	ROOT
)
const program = ts.createProgram(config.fileNames, { ...config.options, noEmit: true })

const reached = new Set()
walk(program.getSourceFile(ENTRY))

const unreachable = program
	.getSourceFiles()
	.map(file => file.fileName.replace(/\\/g, "/"))
	.filter(
		name =>
			name.startsWith(`${ROOT}/`) &&
			!name.endsWith(".d.ts") &&
			!name.startsWith(`${ROOT}/${SDK_DIR}/`) &&
			!name.startsWith(`${ROOT}/tools/`) &&
			!reached.has(name)
	)
	.map(name => path.relative(ROOT, name).replace(/\\/g, "/"))
	.sort()

if (unreachable.length === 0) {
	console.log(`${path.basename(ROOT)}: every source file is reachable from index.ts`)
	process.exit(0)
}

console.error(
	`${unreachable.length} source files are unreachable from index.ts and would be dropped ` +
		`from the bundle:\n${unreachable.map(name => `  ${name}`).join("\n")}`
)
process.exit(1)

function walk(file) {
	if (file === undefined || reached.has(file.fileName.replace(/\\/g, "/"))) {
		return
	}
	reached.add(file.fileName.replace(/\\/g, "/"))
	for (const specifier of imported(file)) {
		const resolved = ts.resolveModuleName(
			specifier,
			file.fileName,
			config.options,
			ts.sys
		).resolvedModule
		if (resolved !== undefined) {
			walk(program.getSourceFile(resolved.resolvedFileName))
		}
	}
}

function imported(file) {
	const specifiers = []
	for (const statement of file.statements) {
		if (
			(ts.isImportDeclaration(statement) || ts.isExportDeclaration(statement)) &&
			statement.moduleSpecifier !== undefined &&
			ts.isStringLiteral(statement.moduleSpecifier)
		) {
			specifiers.push(statement.moduleSpecifier.text)
		}
	}
	return specifiers
}

// keeps the require of fs honest when the entry moves
void fs
