# KICKER DROPS 体験キットガイド

購入者へ案内する、7章の動画・テキストガイドです。HTML / CSS / JavaScriptのみで動作し、ビルドや管理画面、データベースはありません。

## コンテンツの更新

`content.js` の対象章を編集します。動画はYouTubeへ限定公開で登録し、埋め込みを許可してください。

- `title`: 章名
- `category` / `summary`: 目次の英語表記 / 短い案内
- `videoUrl`: YouTubeの動画URL（`https://www.youtube.com/watch?v=…` または `https://youtu.be/…`）。空欄なら「動画は準備中です」と表示。
- `body`: 解説本文。空行で段落を区切ります。独立した段落の先頭を `## ` にすると小見出し、各行を `- ` で始めると箇条書きになります。HTMLは使用しません。空欄なら「解説は準備中です」と表示。
- `externalLink`: `{ label: "リンク名", url: "https://…" }`。不要なら `null`。
- `id`: 直接アクセス用の識別子。既存の章リンクが変わるため、公開後は変更しません。

7章のテキスト解説を登録済みです。動画URLは未登録で、動画枠には準備中を表示します。⑦には卸専門店のリンクを設定しています。不正な動画URLは埋め込まず準備中を表示します。

本文は初心者向けの基本手順です。材料の変更時は、実際に同梱する製品とメーカーの現行使用説明を照合し、対象素材・重ね塗り・乾燥時間の案内を更新してください。動画追加時にも本文と手順が一致することを確認してください。

技術事項の確認先（2026-10-22確認）：[Angelus FAQ](https://angelusdirect.com/pages/faqs)、[革靴のペイント手順](https://angelusdirect.com/blogs/news/how-to-paint-leather-shoes)、[スプラッタの実例](https://angelusdirect.com/blogs/news/angelus-tutorials-space-jam-2-custom-lebron-kids-shoes)、[アセトンの安全情報](https://anzeninfo.mhlw.go.jp/anzen/gmsds/67-64-1.html)。

## ローカル確認

このフォルダで `python3 -m http.server 8080` を実行し、`http://localhost:8080` を開きます。スマホ幅320px・390pxとPCで目次・各章・前後移動・戻る・再読み込みを確認します。

動画追加後は、YouTubeにログインしていない状態で埋め込み再生、全画面表示、「YouTubeで見る」リンクを確認してください。YouTube側の公開・埋め込み・年齢等の制限によっては再生できません。

## GitHub Pages

専用の公開リポジトリ `kickerdrops-bot/kicker-drops-kit-guide` にこのフォルダのファイルだけを保存し、GitHub Pagesを `main` ブランチ / ルートから公開しています。

公開URL：https://kickerdrops-bot.github.io/kicker-drops-kit-guide/

`noindex` は検索エンジン向けの指定です。閲覧認証はなく、公開URLと公開リポジトリから第三者も内容を閲覧できます。認証情報や購入者情報は保存しないでください。

画像は既存のKICKER DROPSロゴ原本を複製したものです。動画本体はリポジトリへ保存しません。
