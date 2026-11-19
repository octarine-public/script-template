# Octarine script template

The launcher's «Создать скрипт» renders a new script from this repository. Nothing here runs: the launcher
reads the manifests, copies the files and substitutes `@@name@@` values, with no code of the repository
executed.

- `template.json`: the variables, the licenses, the names a script may not take, the games.
- `common/files/`: every game's files; `common/licenses/<id>/files/`: the license's files;
  `common/optional/repository.json`: merged into package.json when a repository URL is given.
- `games/<game>/game.json`: the SDK folder, the menu tabs, the features; `games/<game>/files/`: the game's
  base; `games/<game>/features/<id>/files/`: a feature's whole files, `…/merge/`: JSON merged into the
  script's (translations).
- `ai/`: the project rule, the core rules and the skills the launcher renders for the AI tools chosen;
  a game's SDK repository may carry its own `ai/`, which then wins.

A substitution in code stands only inside a string literal (`const X = "@@name@@"`), so the template
itself type-checks as it is. `src/index.ts` is composed by the launcher from the features chosen.
