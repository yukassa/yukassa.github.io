# yukassa.github.io

物理学のバックグラウンドを持つ Backend & R&D Engineer、yukassa のポートフォリオサイトです。 Astro と MDX を用いて構築されています。

## サイト構成

- **Home (`/`)** — 自己紹介（Hero）、学歴・職歴（Background）、主な実績（Selected Works）を表示。Playground（実験室）セクションは現在非表示設定ですが、コードベースには含まれています。
- **Projects (`/projects/[slug]`)** — 各プロジェクトの詳細ページ。MDX 形式で記述されており、アーキテクチャ図の拡大表示機能や、数式（LaTeX）のレンダリングに対応しています。
  - Metaverse Efficacy Verification (R&D)
  - Calendar Sync System (Backend)
  - User Churn Prediction Analysis (ML/XAI)
- **Resume (`/resume`)** / **Skills (`/skills`)** / **Projects一覧 (`/projects`)** / **Tech Notes (`/tech-notes`)** / **About (`/about`)** / **Playground (`/playground`)** — 補助的なページ群。ヘッダーナビゲーションからは `Selected Works` 以外リンクされておらず、URL直接アクセスでのみ到達できます。実装状況やデータの整合性については [UNUSED_AUDIT.md](UNUSED_AUDIT.md) を参照してください。
- **共通ヘッダー / フッター** — `BaseLayout` がナビゲーション、外部リンク、フッターコピー（© 2025 yukassa）を提供。

## 主な機能・特徴

- **MDX によるリッチコンテンツ**: プロジェクト詳細は .mdx ファイルで管理され、文章、コードブロック、コンポーネントを混在させて記述しています。
- **インタラクティブな図解**: ZoomImage コンポーネントにより、アーキテクチャ図やフローチャートをクリックで拡大（モーダル表示）し、詳細を確認できます。
- **レスポンシブデザイン**: スマートフォンからデスクトップまで、デバイス幅に合わせてレイアウトが最適化されます。

## 開発環境

- **Framework**: Astro 7 系
- **Runtime**: Node.js 22.12 以上（Astro 7 の要件）
- **Styling**: CSS (Global & Scoped), Markdown styling
- **Content**: [Astro Content Layer API](https://docs.astro.build/en/guides/content-collections/)（MDX / JSON）

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

```
src/
├── components/
│   ├── Hero.astro          # トップページのヒーローセクション
│   ├── ZoomImage.astro     # 画像拡大用モーダルコンポーネント
│   ├── ContactBanner.astro
│   └── ...
├── content/
│   ├── resume/
│   │   └── resume.json     # 経歴・学歴・スキルなどのデータ (単一ファイル)
│   └── projects/           # ケーススタディの原稿 (MDX)
│       ├── calendar-sync-system.mdx
│       ├── metaverse-efficacy-verification.mdx
│       └── user-churn-prediction-analysis.mdx
├── content.config.ts       # コンテンツコレクションの定義 (loader / スキーマ)
├── layouts/
│   └── BaseLayout.astro    # 共通ヘッダー・フッター・メタデータ
├── pages/
│   ├── index.astro         # トップページ
│   └── projects/
│       ├── index.astro     # プロジェクト一覧ページ
│       └── [slug].astro    # プロジェクト詳細の動的ルーティング
└── styles/                 # グローバルスタイル定義
```

> `src/content/skills/`・`src/content/tech-notes/` にもコンテンツファイルがありますが、現状の利用実態は [UNUSED_AUDIT.md](UNUSED_AUDIT.md) を参照してください。

## 新しいプロジェクト（Selected Works）を追加する

トップページの **Selected Works** と Playground のカード一覧は、`resume.json` ではなく `src/content/projects/` 配下の MDX ファイルから自動生成されています（`src/pages/index.astro` が `getCollection('projects')` で取得）。新しい実績を追加する手順は次の通りです。

1. `src/content/projects/` に新しい `.mdx` ファイルを作成します（例: `new-project.mdx`）。
   - ファイル名がそのまま詳細ページの URL（`/projects/new-project`）になります。
   - ファイル名の先頭を `_`（アンダースコア）にすると、下書き扱いとなり一覧・ビルドの両方から除外されます。
2. フロントマターに以下のフィールドを記述します（スキーマ定義: [`src/content.config.ts`](src/content.config.ts)）。

   ```yaml
   ---
   name: "プロジェクト名" # 必須
   summary: "1〜2行の概要" # 必須
   architecture: "使用アーキテクチャ" # 任意（カードのタグに表示）
   technologies: ["Go", "AWS"] # 任意（技術スタック表示）
   projectType: "work" # "work"（既定値） | "personal"
   order: 10 # 任意（既定値 99、小さいほど先頭に表示）
   details: # 任意（カードの箇条書きポイント、先頭2件のみ表示）
     - "ポイント1"
     - "ポイント2"
   relatedLink: # 任意（外部リンクボタン）
     label: "リンクの表示名"
     url: "https://example.com"
   ---
   本文には MDX 形式で詳細な説明を書けます。数式（KaTeX）やコンポーネントの埋め込みにも対応しています。
   ```

3. `projectType` によって表示先が変わります。
   - `"work"`（既定値・省略可） → トップページの **Selected Works** に表示
   - `"personal"` → `/playground` ページに表示
4. 表示順は `order` の昇順です。値を省略すると `99` 扱いとなり最後尾に表示されます。
5. `npm run dev` を起動した状態でファイルを保存すると、即座に反映されます。追加後は詳細ページ（`/projects/<ファイル名>`）が正しく開けることも確認してください。

## 今後の展望 (TODO)

- **Playground の公開**: 現在準備中（In Preparation）としている技術検証ページの実装と公開。
