import tsPlugin from "@typescript-eslint/eslint-plugin"
import tsParser from "@typescript-eslint/parser"
import prettierConfig from "eslint-config-prettier"
import importPlugin from "eslint-plugin-import-x"
import prettierPlugin from "eslint-plugin-prettier"
import simpleImportSort from "eslint-plugin-simple-import-sort"
import unicorn from "eslint-plugin-unicorn"
import unusedImports from "eslint-plugin-unused-imports"

/** The SDK declarations: generated, never linted. */
const SDK_DIR = "@@sdkDir@@"

export default [
	{
		ignores: [
			"node_modules/**",
			"scripts/**",
			"scripts_files/**",
			`${SDK_DIR}/**`,
			"standard.d.ts",
			"octarine-core.d.ts"
		]
	},
	{
		files: ["**/*.ts", "**/*.tsx"],
		languageOptions: {
			parser: tsParser,
			sourceType: "module",
			parserOptions: {
				sourceType: "module",
				project: ["./tsconfig.json"],
				tsconfigRootDir: import.meta.dirname
			}
		},
		plugins: {
			"@typescript-eslint": tsPlugin,
			import: importPlugin,
			unicorn,
			"simple-import-sort": simpleImportSort,
			"unused-imports": unusedImports,
			prettier: prettierPlugin
		},
		rules: {
			"@typescript-eslint/adjacent-overload-signatures": "error",
			"@typescript-eslint/array-type": ["error", { default: "array" }],
			"@typescript-eslint/await-thenable": "error",
			"@typescript-eslint/consistent-type-assertions": "error",
			"@typescript-eslint/consistent-type-imports": [
				"error",
				{ prefer: "type-imports", fixStyle: "inline-type-imports" }
			],
			"@typescript-eslint/dot-notation": "error",
			"@typescript-eslint/explicit-member-accessibility": [
				"error",
				{ accessibility: "explicit", overrides: { constructors: "no-public" } }
			],
			"@typescript-eslint/naming-convention": [
				"error",
				{
					selector: "default",
					format: ["camelCase", "PascalCase"],
					leadingUnderscore: "forbid",
					trailingUnderscore: "allow"
				},
				{
					selector: ["variable", "function"],
					format: ["camelCase", "PascalCase", "UPPER_CASE"],
					modifiers: ["exported", "global"],
					leadingUnderscore: "forbid",
					trailingUnderscore: "forbid"
				},
				{
					selector: "variable",
					format: ["UPPER_CASE", "camelCase", "PascalCase"],
					modifiers: ["const"],
					leadingUnderscore: "forbid",
					trailingUnderscore: "forbid"
				},
				{
					selector: "classProperty",
					format: ["UPPER_CASE", "camelCase", "PascalCase"],
					modifiers: ["readonly"],
					leadingUnderscore: "forbid",
					trailingUnderscore: "allow"
				},
				{
					selector: "method",
					format: ["camelCase", "PascalCase"],
					leadingUnderscore: "allow",
					trailingUnderscore: "allow"
				},
				{
					selector: ["parameter", "variable"],
					format: ["camelCase"],
					leadingUnderscore: "allow",
					trailingUnderscore: "allow"
				},
				{
					selector: [
						"typeLike",
						"objectLiteralProperty",
						"objectLiteralMethod"
					],
					format: ["camelCase", "UPPER_CASE", "PascalCase", "snake_case"],
					leadingUnderscore: "forbid",
					trailingUnderscore: "forbid"
				},
				{
					selector: "enumMember",
					format: null,
					leadingUnderscore: "forbid",
					trailingUnderscore: "forbid"
				}
			],
			"@typescript-eslint/no-empty-function": [
				"error",
				{ allow: ["methods", "setters"] }
			],
			"@typescript-eslint/no-empty-object-type": "error",
			"@typescript-eslint/no-floating-promises": "error",
			"@typescript-eslint/no-misused-new": "error",
			"@typescript-eslint/no-namespace": "error",
			"@typescript-eslint/no-require-imports": "error",
			"@typescript-eslint/no-shadow": ["error", { hoist: "all" }],
			"@typescript-eslint/no-this-alias": "error",
			"@typescript-eslint/no-unnecessary-type-assertion": "error",
			"@typescript-eslint/no-unused-expressions": "error",
			"@typescript-eslint/prefer-function-type": "error",
			"@typescript-eslint/prefer-namespace-keyword": "error",
			"@typescript-eslint/require-await": "error",
			"@typescript-eslint/triple-slash-reference": [
				"error",
				{ path: "always", types: "prefer-import", lib: "always" }
			],
			curly: ["error", "all"],
			eqeqeq: ["error", "smart"],
			"guard-for-in": "error",
			"id-denylist": [
				"error",
				"any",
				"Number",
				"number",
				"String",
				"string",
				"Boolean",
				"boolean",
				"Undefined",
				"undefined"
			],
			"id-match": "error",
			"constructor-super": "error",
			"no-caller": "error",
			"no-cond-assign": "error",
			"no-debugger": "error",
			"no-duplicate-case": "error",
			"no-duplicate-imports": "error",
			"no-empty": ["error", { allowEmptyCatch: true }],
			"no-eval": "error",
			"no-extra-bind": "error",
			"no-lone-blocks": "error",
			"no-lonely-if": "warn",
			"no-multi-str": "error",
			"no-new-func": "error",
			"no-new-wrappers": "error",
			"no-sequences": "error",
			"no-sparse-arrays": "error",
			"no-template-curly-in-string": "error",
			"no-undef-init": "error",
			"no-unmodified-loop-condition": "error",
			"no-unsafe-finally": "error",
			"no-unused-labels": "error",
			"no-unused-vars": "off",
			"no-useless-call": "error",
			"no-useless-concat": "error",
			"no-useless-return": "error",
			"no-else-return": "error",
			"object-shorthand": "error",
			"prefer-const": "error",
			"prefer-object-spread": "error",
			"use-isnan": "error",
			"array-callback-return": "error",
			"prefer-arrow-callback": "error",
			"func-style": ["warn", "declaration", { allowArrowFunctions: true }],
			"unicorn/prefer-ternary": "error",
			"import/first": "error",
			"import/no-default-export": "error",
			"import/no-duplicates": "error",
			"import/no-self-import": "error",
			"simple-import-sort/imports": "error",
			"simple-import-sort/exports": "error",
			"unused-imports/no-unused-imports": "error",
			"unused-imports/no-unused-vars": [
				"warn",
				{
					vars: "all",
					varsIgnorePattern: "^_",
					args: "after-used",
					argsIgnorePattern: "^_"
				}
			],
			"prettier/prettier": "error"
		}
	},
	{
		files: ["**/*.d.ts"],
		rules: {
			"@typescript-eslint/consistent-type-imports": "off",
			"@typescript-eslint/naming-convention": "off"
		}
	},
	prettierConfig
]
