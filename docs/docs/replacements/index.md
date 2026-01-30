# Replacements

When using the [ESLint plugin](https://github.com/es-tooling/eslint-plugin-depend) or the [CLI](https://github.com/e18e/cli), you may be suggested replacement modules for dependencies you have. This is a list of replacements, along with their migration guides and any useful information.

## What are these?

The e18e community maintains a list of modules and their recommended replacements via the [module-replacements](https://github.com/es-tooling/module-replacements) repository.

Typically, a module might be flagged as replaceable if it:

- Is no longer actively maintained
- Has more performant or modern alternatives
- Has known security vulnerabilities
- Lacks support for modern JavaScript features (e.g. ES Modules, TypeScript)

Where it was not possible to contribute upstream to the existing modules, replacement modules have been created by the wider community in most cases.

## List of replaceable modules

> [!NOTE]
> This is not an exhaustive list - similar modules to the ones listed here can often be replaced by roughly the same steps.

| Module | Auto-fixable |
| -- | -- |
| [`@jsdevtools/ez-spawn`](./ez-spawn.md) | :x: |
| [`axios`](./axios.md) | :x: |
| [`bluebird`](./bluebird-q.md) | :x: |
| [`body-parser`](./body-parser.md) | :x: |
| [`buf-compare`](./buf-compare.md) | :x: |
| [`buffer-equal`](./buffer-equal.md) | :x: |
| [`buffer-equals`](./buffer-equals.md) | :x: |
| [`builtin-modules`](./builtin-modules.md) | :x: |
| [`chalk`](./chalk.md) | :ballot_box_with_check: |
| [`core-util-is`](./core-util-is.md) | :x: |
| [`cpx`](./cpx.md) | :x: |
| [`crypto-js`](./crypto-js.md) | :x: |
| [`deep-equal`](./deep-equal.md) | :ballot_box_with_check: |
| [`depcheck`](./depcheck.md) | :x: |
| [`dot-prop`](./dot-prop.md) | :x: |
| [`dotenv`](./dotenv.md) | :x: |
| [`emoji-regex`](./emoji-regex.md) | :x: |
| [`eslint-plugin-es`](./eslint-plugin-es.md) | :x: |
| [`eslint-plugin-eslint-comments`](./eslint-plugin-eslint-comments.md) | :x: |
| [`eslint-plugin-import`](./eslint-plugin-import.md) | :x: |
| [`eslint-plugin-node`](./eslint-plugin-node.md) | :x: |
| [`eslint-plugin-react`](./eslint-plugin-react.md) | :x: |
| [`eslint-plugin-vitest`](./eslint-plugin-vitest.md) | :x: |
| [`execa`](./execa.md) | :x: |
| [`ez-spawn`](./ez-spawn.md) | :x: |
| [`faker`](./faker.md) | :x: |
| [`fast-glob`](./fast-glob.md) | :x: |
| [`find-cache-dir`](./find-cache-dir.md) | :x: |
| [`find-cache-directory`](./find-cache-directory.md) | :x: |
| [`find-file-up`](./find-file-up.md) | :x: |
| [`find-pkg`](./find-pkg.md) | :x: |
| [`find-up`](./find-up.md) | :x: |
| [`fs-extra`](./fs-extra.md) | :x: |
| [`glob`](./glob.md) | :x: |
| [`globby`](./globby.md) | :x: |
| [`graphemer`](./graphemer.md) | :x: |
| [`invariant`](./invariant.md) | :x: |
| [`is-builtin-module`](./is-builtin-module.md) | :ballot_box_with_check: |
| [`jQuery`](./jquery.md) | :x: |
| [`js-yaml`](./js-yaml.md) | :x: |
| [`jsx-ast-utils`](./jsx-ast-utils.md) | :x: |
| [`lint-staged`](./lint-staged.md) | :x: |
| [`lodash-underscore`](./lodash-underscore.md) | :x: |
| [`materialize-css`](./materialize-css.md) | :x: |
| [`md5`](./md5.md) | :ballot_box_with_check: |
| [`mkdirp`](./mkdirp.md) | :x: |
| [`moment`](./moment.md) | :x: |
| [`npm-run-all`](./npm-run-all.md) | :x: |
| [`object-hash`](./object-hash.md) | :x: |
| [`ora`](./ora.md) | :x: |
| [`path-exists`](./path-exists.md) | :x: |
| [`pkg-dir`](./pkg-dir.md) | :x: |
| [`qs`](./qs.md) | :x: |
| [`read-package-up`](./read-package-up.md) | :x: |
| [`read-pkg`](./read-pkg.md) | :x: |
| [`read-pkg-up`](./read-pkg-up.md) | :x: |
| [`readable-stream`](./readable-stream.md) | :x: |
| [`rimraf`](./rimraf.md) | :x: |
| [`shortid`](./shortid.md) | :x: |
| [`sort-object`](./sort-object.md) | :x: |
| [`string-width`](./string-width.md) | :x: |
| [`strip-ansi`](./strip-ansi.md) | :x: |
| [`tempy`](./tempy.md) | :x: |
| [`traverse`](./traverse.md) | :ballot_box_with_check: |
| [`uri-js`](./uri-js.md) | :x: |
| [`utf8`](./utf8.md) | :x: |
| [`xmldom`](./xmldom.md) | :x: |
