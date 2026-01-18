# p7d-markdown-it-linebreak-and-strong-ja

## English

Adjust handling of line breaks and emphasis parsing in VS Code Markdown preview.

This extension bundles:

- [@peaceroad/markdown-it-cjk-breaks-mod](https://www.npmjs.com/package/@peaceroad/markdown-it-cjk-breaks-mod)
- [@peaceroad/markdown-it-strong-ja](https://www.npmjs.com/package/@peaceroad/markdown-it-strong-ja)

Note: For more details, see the npm package.

### Examples

#### markdown-it-strong-ja (em/strong)

Em/strong examples (Editor):

```md
HTMLは**「HyperText Markup Language」**の略です。
HTMLは*「HyperText Markup Language」*の略です。
```

Em/strong examples (Markdown Preview HTML):

```HTML
<p>HTMLは<strong>「HyperText Markup Language」</strong>の略です。</p>
<p>HTMLは<em>「HyperText Markup Language」</em>の略です。</p>
```

Mixed content emphasis Example:

```md
string**[text](url)**
```

strong-ja output (default):

```HTML
<p>string<strong><a href="url">text</a></strong></p>
```

When `mode: "compatible"`, output keeps markdown-it behavior:

```HTML
<p>string**<a href="url">text</a>**</p>
```

#### markdown-it-cjk-breaks-mod (line breaks)

Line break example (Editor):

```md
梅雨時の空はcloudy
で、ra
inが降り続き、
日本のnatureは更に
greenになります。
```

Line break example (Markdown Preview HTML):

```HTML
<p>梅雨時の空はcloudyで、ra
inが降り続き、日本のnatureは更にgreenになります。</p>
```

Normally, line breaks within a p element are displayed as half-width spaces.

Also, default punctuation targets for spacing: `['！', '？', '⁉', '！？', '？！', '!?', '?!', '.', ':']`.

```md
こんにちは！
World
```

Output:

```HTML
<p>こんにちは！ World</p>
```

Note. If. `spaceAfterPunctuation: full`, a full-width space is inserted instead of a half-width space.

normalizeSoftBreaks Example:

```md
**漢**
字
```

With default settings (normalizeSoftBreaks enabled):

```HTML
<p><strong>漢</strong>字</p>
```

To disable, set `p7dMarkdownItLinebreak.cjkBreaks.disableNormalizeSoftBreaks` to `true`.


### Settings

- `p7dMarkdownItLinebreak.cjkBreaks.disable` (default: `false`) Disable markdown-it-cjk-breaks-mod.
- `p7dMarkdownItLinebreak.cjkBreaks.disableEither` (default: `false`) Require both sides to be CJK (disable either-side suppression).
- `p7dMarkdownItLinebreak.cjkBreaks.disableNormalizeSoftBreaks` (default: `false`) Disable softbreak normalization for other plugins.
- `p7dMarkdownItLinebreak.cjkBreaks.spaceAfterPunctuation` (default: `"half"`) Insert `"half"` or `"full"` space after punctuation when a line break is suppressed; use `"none"` to disable.
- `p7dMarkdownItLinebreak.cjkBreaks.spaceAfterPunctuationTargetsAdd` (default: `""`) Additional punctuation triggers to append (comma-separated).
- `p7dMarkdownItLinebreak.cjkBreaks.spaceAfterPunctuationTargetsRemove` (default: `""`) Punctuation triggers to remove (comma-separated).
- `p7dMarkdownItLinebreak.strongJa.disable` (default: `false`) Disable markdown-it-strong-ja.
- `p7dMarkdownItLinebreak.strongJa.mode` (default: `"default"`) Emphasis pairing mode: `"default"` (`"japanese-only"`), `"aggressive"`, or `"compatible"`.
  - `"japanese-only"` (default via `"default"`): When a line contains Japanese (hiragana/katakana/kanji/fullwidth punctuation), the leading `**` pairs aggressively; English-only lines follow markdown-it pairing.
  - `"aggressive"`: Always pair the leading `**` greedily, regardless of language.
  - `"compatible"`: Match markdown-it pairing; leading `**` stays literal.
  Note: Pairing scans `*`/`**` left-to-right. Japanese-first pairing can wrap punctuation/quotes (e.g. `「」`, `（` `）`) and mixed lines keep aggressive pairing in `"japanese-only"`; inline links/HTML/code spans are re-wrapped after pairing to avoid broken emphasis. Multiline or nested emphasis can differ from vanilla markdown-it (e.g. markdown-it may leave trailing `**`).

Note: `spaceAfterPunctuationTargetsAdd/Remove` take effect only when `spaceAfterPunctuation` is not `"none"`.

## 日本語

VS Code の Markdown プレビューで改行と強調解析を調整します。

この拡張機能に含まれるプラグイン:

- markdown-it-cjk-breaks-mod
- markdown-it-strong-ja

### 例

#### markdown-it-strong-ja（強調）

強調の例（エディタ）:

```md
HTMLは**「HyperText Markup Language」**の略です。
HTMLは*「HyperText Markup Language」*の略です。
```

強調の例（Markdown プレビュー HTML）:

```HTML
<p>HTMLは<strong>「HyperText Markup Language」</strong>の略です。</p>
<p>HTMLは<em>「HyperText Markup Language」</em>の略です。</p>
```

さらに、以下ののような場合でも変換します。

```md
string**[text](url)**
```

strong-jaの出力（規定）:

```HTML
<p>string<strong><a href="url">text</a></strong></p>
```

markdown-it に合わせたい場合は `mode: "compatible"` を指定してください。

```HTML
<p>string**<a href="url">text</a>**</p>
```

#### markdown-it-cjk-breaks-mod（改行）

改行処理の例（エディタ）:

```md
梅雨時の空はcloudy
で、ra
inが降り続き、
日本のnatureは更に
greenになります。
```

改行処理の例（Markdown プレビュー HTML）:

```HTML
<p>梅雨時の空はcloudyで、ra
inが降り続き、日本のnatureは更にgreenになります。</p>
```

通常は、p要素内の改行は半角スペースとして表示されます。

改行前が感嘆符などの場合（`['！', '？', '⁉', '！？', '？！', '!?', '?!', '.', ':']`）には、規定で空白が挿入されます。

```md
こんにちは！
World
```

出力:

```HTML
<p>こんにちは！ World</p>
```

補足： `spaceAfterPunctuation: full` の場合は半角スペースの代わりに全角スペースが挿入されます。

また、改行前に強調処理がある場合も同様に処理されます。

```md
**漢**
字
```

出力：

```HTML
<p><strong>漢</strong>字</p>
```

無効化する場合は`p7dMarkdownItLinebreak.cjkBreaks.disableNormalizeSoftBreaks`を`true`にしてください。

### 設定

- `p7dMarkdownItLinebreak.cjkBreaks.disable` (既定: `false`) markdown-it-cjk-breaks-mod を無効化します。
- `p7dMarkdownItLinebreak.cjkBreaks.disableEither` (既定: `false`) 前後両方が CJK のときだけ改行抑制します。
- `p7dMarkdownItLinebreak.cjkBreaks.disableNormalizeSoftBreaks` (既定: `false`) 他プラグイン由来の softbreak 正規化を無効化します。
- `p7dMarkdownItLinebreak.cjkBreaks.spaceAfterPunctuation` (既定: `"half"`) 抑制時に `"half"` / `"full"` の空白を挿入します。 `"none"` で無効化します。
- `p7dMarkdownItLinebreak.cjkBreaks.spaceAfterPunctuationTargetsAdd` (既定: `""`) 追加する句読点トリガー（カンマ区切り）。
- `p7dMarkdownItLinebreak.cjkBreaks.spaceAfterPunctuationTargetsRemove` (既定: `""`) 除外する句読点トリガー（カンマ区切り）。
- `p7dMarkdownItLinebreak.strongJa.disable` (既定: `false`) markdown-it-strong-ja を無効化します。
- `p7dMarkdownItLinebreak.strongJa.mode` (既定: `"default"`) 強調のペアリングモード（`"default"` は `"japanese-only"`、`"aggressive"`、`"compatible"`）。
  - `"japanese-only"`（`"default"` の既定）: 行に日本語（ひらがな/カタカナ/漢字/全角記号）が含まれる場合、先頭の `**` を強めにペアリングし、英語のみの行は markdown-it のペアリングに従います。
  - `"aggressive"`: 言語に関係なく先頭の `**` を常に貪欲にペアリングします。
  - `"compatible"`: markdown-it と同じペアリング（先頭の `**` は文字として残ります）。
  補足: `*`/`**` は左からペアリングされます。日本語の括弧や句読点（`「」`、`（` `）` など）をまたいでペアリングされることがあり、`"japanese-only"` では混在文も日本語寄りで処理します。インラインのリンク/HTML/コードはペアリング後に再ラップされ、複数行/ネスト強調は markdown-it と挙動が異なる場合があります（末尾の `**` が残るなど）。

補足: `spaceAfterPunctuationTargetsAdd/Remove` は `spaceAfterPunctuation` が `"none"` のときは無効です。

## Build

```
npm run build
vsce package
```
