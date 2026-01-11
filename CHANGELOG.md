# Change Log

## [0.1.1] - 2026-01-11

- tuning extension.js

## [0.1.0] - 2026-01-09

Breaking changes. Change extension display name, add support for strong-ja and attrs:

- Update extension displayName to mention strong-ja.
- Add new settings for cjk-breaks, strong-ja, and attrs (including plugin-level enable/disable and option toggles).
- Set cjk-breaks normalizeSoftBreaks to default on, with an opt-out setting.
- Add spacing controls for cases where a line break is suppressed after punctuation (spaceAfterPunctuation and add/remove lists).
- Auto-register markdown-it-attrs when missing and include it as a dependency.
- Use strong-ja for extended em/strong parsing (including emphasis over links/HTML/code in mixed text) and document the behavior.
- Expand README with English/Japanese examples and updated settings reference.

Note 32.

## [0.0.3] - 2024-06-30

- Add simple sample

## [0.0.2] - 2024-06-30

- Fix extension display name

## [0.0.1] - 2024-06-30

- Initial release
