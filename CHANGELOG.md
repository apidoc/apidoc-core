# Changelog for apidoc-core

## 0.15.1
* Use str.trim() instead of own regex vulnerable to ReDOS.
Note that this vulnerability is not impacting this project as an attacker would need to control your source code from which you generate the documentation.
Done in #120 by @ready-research.

## 0.15.0

### Fixed
* Fix incorrect return type in @apiPrivate parser (PR #112 from nomoon)

## 0.14.0

### Added

* Implement apiBody and apiQuery tags by @SWheeler17 #104
* Expose parseSource function by @woodgear #109
* Add GitHub actions by @tommy87 #107

## 0.13.0

### Added

* Enable the use of an apiUse block in an apiDefine block (#99 by tommy87)

## 0.12.0

### Changed

* Allow '#' and '@' in apiParam names (#102 by Fulvio Gentile)

## 0.11.1

* Correctly merge the dev branch

## 0.11.0

### Added

* Allow filtering by tag (PR #91 by @omaretna)

### Fixed

* Fix apiprivate parser issue (PR #81 by @jason-gao)

## 0.10.0

### Added

* Allow the use of | to specify different types: {String|Number} (#62)
* Allow the use of $ in the param name (#36)
* Allow special characters in name and group

### Changed

* Update dependencies
* Use os.EOL instead of own logic for line endings

### Fixed

* Update elixir's syntax (#65)
