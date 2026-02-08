# Change Log

## [0.2.2] - 2026-02-08

Update dependencies:
  - @peaceroad/markdown-it-cjk-breaks-mod@0.1.7
  - @peaceroad/markdown-it-strong-ja@0.7.2

- Fix:
    - Treat strong-ja mode "default" as the plugin's "japanese".
- Change:
    - Clarify strong-ja mode description and add enum UI descriptions for selectable settings.

## [0.2.1] - 2026-01-18

Update p7d-markdown-it-strong-ja@0.6.1
- Fix: 
    - fix: trim trailing spaces only on terminal text tokens.

## [0.2.0] - 2026-01-18

- Fix: 
    - Fixed a bug where text would disappear when used in conjunction with other plugins because the highlighting process did not have a map.
- Change:
    - Last time, we added markdown-it-attrs if it wasn't already included. However, this seemed redundant, so we discontinued it.
- Breaking Change
    - For highlighting, we introduced the mode option described below. In conjunction with this, we changed the processing so that when a sentence containing a mixture of Japanese and English contains a combination of three or more asterisks, it is considered to be Japanese text, starting with the beginning. Also, for English paragraphs that do not contain Japanese, the output is now more similar to markdown-it.
- Modify Options:
- Add strong-ja mode setting (japanese-only/aggressive/compatible).
    - Default strong-ja mode to japanese-only in configuration.
- Remove strong-ja disableDollarMath setting (always use plugin default).
- Remove strong-ja disallowMixed setting (always use plugin default).

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
