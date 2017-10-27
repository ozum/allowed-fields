<!-- Titles: Added, Changed, Deprecated, Removed, Fixed, Security -->

## Change Log

This project adheres to [Semantic Versioning](http://semver.org/).

### 0.1.5 - 2017-10-27

#### Added

* `add-module-exports` babel plugin is added. `require('fix-set')` is working now.


### 0.1.0 - 2017-10-17

#### Added

* `*` support. 
  * `relation.*` returns false even `relation.*` is whitelisted, but some fields of relation are blacklisted.
  * `relation.*` returns true when there is only blacklist and relation is not black listed.
