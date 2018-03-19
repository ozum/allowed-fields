# Change Log

All notable changes to this project will be documented in this file. See [standard-version](https://github.com/conventional-changelog/standard-version) for commit guidelines.

<a name="0.3.3"></a>

## [0.3.3](https://github.com/ozum/allowed-fields/compare/v0.3.2...v0.3.3) (2018-03-18)

<!-- Titles: Added, Changed, Deprecated, Removed, Fixed, Security -->

### 0.3.0 - 2017-11-25

#### Added

* `Joi` validations.

#### Changed

* From Flow to TypeScript.

### 0.2.0 - 2017-11-25

#### Added

* Runtime flow checks.

### Changed

* Flow types moved to unified folder.
* Lint and flow tests moved to posttest.
* `concurrently` added for `watch` scripts.
* Dependency updates.

### 0.1.5 - 2017-10-27

#### Added

* `add-module-exports` babel plugin is added. `require('fix-set')` is working now.

### 0.1.0 - 2017-10-17

#### Added

* `*` support.
  * `relation.*` returns false even `relation.*` is whitelisted, but some fields of relation are blacklisted.
  * `relation.*` returns true when there is only blacklist and relation is not black listed.
