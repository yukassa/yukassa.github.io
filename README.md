# yukassa.github.io

物理学のバックグラウンドを持つ Backend & R&D Engineer、yukassa のポートフォリオサイトです。 Astro と MDX を用いて構築されています。

## サイト構成

- **Home (`/`)** — 自己紹介（Hero）、学歴・職歴（Background）、主な実績（Selected Works）、個人研究（Personal Works）を表示。
- **Projects (`/projects/[slug]`)** — 各プロジェクトの詳細ページ。MDX 形式で記述されており、アーキテクチャ図の拡大表示機能や、数式（LaTeX）のレンダリングに対応しています。
  - Metaverse Efficacy Verification (R&D) — Selected Works
  - Calendar Sync System (Backend) — Selected Works
  - User Churn Prediction Analysis (ML/XAI) — Selected Works
  - Crowd Simulation & Optimization — Personal Works
- **Resume (`/resume`)** / **Projects一覧 (`/projects`)** — 補助的なページ。ヘッダーナビゲーションからは `Selected Works` 以外リンクされておらず、URL直接アクセスでのみ到達できます。詳細は [UNUSED_AUDIT.md](UNUSED_AUDIT.md) を参照してください。
- **共通ヘッダー / フッター** — `BaseLayout` がナビゲーション、外部リンク、フッターコピー（© 2025 yukassa）を提供。

> `/about` `/skills` `/tech-notes` `/playground` は 2026-08-31 の棚卸しで削除済みです（未使用ファイル調査の結果、いずれもナビゲーションから到達できずダミーデータのみのページだったため）。経緯は [UNUSED_AUDIT.md](UNUSED_AUDIT.md) を参照してください。

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

## 新しいプロジェクト（Selected Works / Personal Works）を追加する

トップページの **Selected Works** / **Personal Works** のカード一覧は、`resume.json` ではなく `src/content/projects/` 配下の MDX ファイルから自動生成されています（`src/pages/index.astro` が `getCollection('projects')` で取得）。新しい実績を追加する手順は次の通りです。

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
   - `"personal"` → トップページの **Personal Works** に表示
   - いずれの場合も詳細ページ（`/projects/<ファイル名>`）は共通で生成されます（`src/pages/projects/[slug].astro`）。詳細ページの「戻る」リンクも `projectType` に応じて `/#selected-works` または `/#personal-works` に自動で出し分けられます
4. 表示順は `order` の昇順です。値を省略すると `99` 扱いとなり最後尾に表示されます。
5. `npm run dev` を起動した状態でファイルを保存すると、即座に反映されます。追加後は詳細ページ（`/projects/<ファイル名>`）が正しく開けることも確認してください。

## 今後の展望 (TODO)

- **ヘッダーナビゲーションの整理**: `Selected Works` 以外(`Personal Works` / `/resume` / `/projects`)はヘッダーナビゲーションからリンクされていません。正式公開するページが決まったら `src/layouts/BaseLayout.astro` の `navItems` に追加してください。
- **デプロイの復旧**: `npm run build` が `BaseLayout.astro` のCSS(noise-texture)まわりでエラーになる問題、および GitHub Actions の Node バージョン不一致の問題が未修正のまま残っています。詳細は [investigation-report-2026-08-31.md](investigation-report-2026-08-31.md) と [UNUSED_AUDIT.md](UNUSED_AUDIT.md) の該当箇所を参照してください。
