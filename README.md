# yukassa.github.io

Astro で構築したクリエイティブデベロッパー yukassa のポートフォリオサイトです。以下のページを用意し、すべてダミーコンテンツで仮実装しています。

- Home / About Me（ひと目で人物像と注目プロジェクトがわかる）
- Projects（優先順に並べた主要案件の詳細）
- Resume / Skills（経歴・資格・スキルマトリクス）
- Tech Notes（ケーススタディや学習ログのメモ）
- 共通フッター：外部リンク、© 2025 yukassa

## 開発環境

- Node.js 18 以上 (devcontainer では preinstall 済み)
- Astro 5 系

### セットアップ

```sh
npm install
```

### ローカル開発

```sh
npm run dev
```

ブラウザで http://localhost:4321 を開いて確認します。

### ビルド

```sh
npm run build
```

生成物は `dist/` 以下に出力されます。

## プロジェクト構成 (抜粋)

- `src/layouts/BaseLayout.astro` — ヘッダー／フッター／ナビゲーション（全ページ共通）
- `src/pages/index.astro` — Home（注目プロジェクトとスキル紹介）
- `src/pages/about.astro` — About Me（プロフィールと選抜プロジェクトへの導線）
- `src/pages/projects/` — Projects 一覧
- `src/pages/resume.astro` — Resume / Skills ページ
- `src/pages/tech-notes/` — Tech Notes 一覧
- `src/data/` — プロジェクト・スキル・経歴・ノートのダミーデータ
- `public/images/projects/` — 各プロジェクトのプレースホルダー SVG
- `docs/` — ワイヤーフレームやタスクリストなどの補助資料

## 次のステップの例

- ダミーデータを実データへ差し替え、`links.live` / `writeUp` の URL を確定させる
- Tech Notes の実記事を `src/content/` などに移し、本番導線を整備
- GitHub Pages デプロイ（`.github/workflows/deploy.yml`）が成功するか確認し、カスタムドメイン設定があれば調整
