# Change Log
All notable changes to this project will be documented in this file.
This project adheres to [Semantic Versioning](http://semver.org/).
This change log adheres to standards from [Keep a CHANGELOG](http://keepachangelog.com).

## [Unreleased]
- none

## [2.3.0] - 2017-01-01
### Added
- Added `allowUseStrict` option to [`no-unused-expression`] to allow `'use strict';` statements.
- Use [`eslint-ast-utils`] to replace some logic.

### Fixed
- Allow properties named `arguments` in [`no-arguments`].
- Allow function expressions in [`no-mutating-assign`].

## [2.2.0] - 2016-08-31
- Added [`no-valueof-field`] rule

## [2.1.0] - 2016-08-26
### Added
- Added [`no-arguments`] rule
- Added [`no-rest-parameters`] rule

## [2.0.0] - 2016-08-24
### Removed
- **Breaking**: Removed support for Node < v4

### Added
- Added [`no-proxy`] rule
- Added [`no-mutating-methods`] rule
- Added error reports when using `object.__defineSetter__()` or `object.__defineGetter__()` in [`no-get-set`] rule

### Fixed
- Fixed error in [`no-mutating-assign`] report message

## [1.3.0] - 2016-06-22
### Added
- Added `allowThis` option to [`no-mutation`]

## [1.2.0] - 2016-06-21
### Added
- Added `exceptions` option to [`no-mutation`]
- Added [`no-events`] rule
- Added [`no-get-set`] rule

## [1.1.0] - 2016-06-16
### Added
- Added [`no-delete`] rule
- Added [`no-nil`] rule
- Added [`no-unused-expression`] rule

## 1.0.0 - 2016-06-15
### Added
- Added [`no-class`] rule
- Added [`no-let`] rule
- Added [`no-loops`] rule
- Added [`no-mutating-assign`] rule
- Added [`no-mutation`] rule
- Added [`no-this`] rule
- Added [`no-throw`] rule

[Unreleased]: https://github.com/jfmengels/eslint-plugin-fp/compare/v2.3.0...master
[2.3.0]: https://github.com/jfmengels/eslint-plugin-fp/compare/v2.2.0...v2.3.0
[2.2.0]: https://github.com/jfmengels/eslint-plugin-fp/compare/v2.1.0...v2.2.0
[2.1.0]: https://github.com/jfmengels/eslint-plugin-fp/compare/v2.0.0...v2.1.0
[2.0.0]: https://github.com/jfmengels/eslint-plugin-fp/compare/v1.3.0...v2.0.0
[1.3.0]: https://github.com/jfmengels/eslint-plugin-fp/compare/v1.2.0...v1.3.0
[1.2.0]: https://github.com/jfmengels/eslint-plugin-fp/compare/v1.1.0...v1.2.0
[1.1.0]: https://github.com/jfmengels/eslint-plugin-fp/compare/v1.0.0...v1.1.0

[`eslint-ast-utils`]: https://github.com/jfmengels/eslint-ast-utils

[`no-arguments`]: ./docs/rules/no-arguments.md
[`no-class`]: ./docs/rules/no-class.md
[`no-delete`]: ./docs/rules/no-delete.md
[`no-events`]: ./docs/rules/no-events.md
[`no-get-set`]: ./docs/rules/no-get-set.md
[`no-let`]: ./docs/rules/no-let.md
[`no-loops`]: ./docs/rules/no-loops.md
[`no-mutating-assign`]: ./docs/rules/no-mutating-assign.md
[`no-mutating-methods`]: ./docs/rules/no-mutating-methods.md
[`no-mutation`]: ./docs/rules/no-mutation.md
[`no-nil`]: ./docs/rules/no-nil.md
[`no-proxy`]: ./docs/rules/no-proxy.md
[`no-rest-parameters`]: ./docs/rules/no-rest-parameters.md
[`no-this`]: ./docs/rules/no-this.md
[`no-throw`]: ./docs/rules/no-throw.md
[`no-unused-expression`]: ./docs/rules/no-unused-expression.md
[`no-valueof-field`]: ./docs/rules/no-valueof-field.md
