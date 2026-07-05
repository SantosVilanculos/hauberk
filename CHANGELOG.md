# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.1.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [Unreleased]

### Added

### Changed

### Fixed

## [0.2.0] - 2026-07-06

### Added
- Recent packages history section in popup showing the last 20 redirected packages
- Per-package redirect count displayed next to each package name
- Deduplication: re-visiting a package moves it to the top of the list
- Whole-row clickable package items that open npmx.dev in a new tab
- Clear history button to reset the recent packages list
- Ko-fi support link in popup footer
- Scoped npm package (`@scope/name`) support in URL extraction and links

### Changed
- Package entries now track `visits` and `lastVisit` instead of a single `timestamp`

## [0.1.0] - 2026-07-06

### Added
- Initial Manifest V3 browser extension for Chrome and Firefox
- Declarative net request rule to redirect `npmjs.com/package/*` to `npmx.dev/package/*`
- Popup UI with auto-redirect toggle, redirect counter, and status badge
- Real-time counter updates via `storage.onChanged` listener
- Reset counter button with visual feedback
- Dark-themed glassmorphism popup design
- Monorepo structure with pnpm workspaces for Chrome and Firefox packages
- PNG icons at 16, 32, 48, and 128 sizes
- Official npmx.dev favicon SVG icon
- Build scripts for packaging extensions into zip archives

[unreleased]: https://github.com/santosvilanculos/hauberk/compare/v0.2.0...HEAD
[0.2.0]: https://github.com/santosvilanculos/hauberk/compare/v0.1.0...v0.2.0
[0.1.0]: https://github.com/santosvilanculos/hauberk/releases/tag/v0.1.0
