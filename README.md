# yukassa.github.io

物理学のバックグラウンドを持つ Backend & R&D Engineer、yukassa のポートフォリオサイトです。 Astro と MDX を用いて構築されています。

## サイト構成

- **Home (`/`)** — 自己紹介（Hero）、主な実績（Selected Works）、およびスキルセットの概要を表示。Playground（実験室）セクションは現在非表示設定ですが、コードベースには含まれています。
- **Projects (`/projects/[slug]`)** — 各プロジェクトの詳細ページ。MDX 形式で記述されており、アーキテクチャ図の拡大表示機能や、数式（LaTeX）のレンダリングに対応しています。
  - Metaverse Efficacy Verification (R&D)
  - Calendar Sync System (Backend)
  - User Churn Prediction Analysis (ML/XAI)
- **共通ヘッダー / フッター** — `BaseLayout` がナビゲーション、外部リンク、フッターコピー（© 2025 yukassa）を提供。

## 主な機能・特徴

- **MDX によるリッチコンテンツ**: プロジェクト詳細は .mdx ファイルで管理され、文章、コードブロック、コンポーネントを混在させて記述しています。
- **インタラクティブな図解**: ZoomImage コンポーネントにより、アーキテクチャ図やフローチャートをクリックで拡大（モーダル表示）し、詳細を確認できます。
- **レスポンシブデザイン**: スマートフォンからデスクトップまで、デバイス幅に合わせてレイアウトが最適化されます。

## 開発環境

- **Framework**: Astro 5 系
- **Runtime**: Node.js 18+
- **Styling**: CSS (Global & Scoped), Markdown styling
- **Content**: MDX (Extended Markdown)

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
│   ├── ProjectCard.astro   # プロジェクト一覧用カード
│   ├── ZoomImage.astro     # 画像拡大用モーダルコンポーネント
│   └── ...
├── content/
│   └── projects/           # ケーススタディの原稿 (MDX)
│       ├── calendar-sync-system.mdx
│       ├── metaverse-efficacy-verification.mdx
│       └── user-churn-prediction-analysis.mdx
├── layouts/
│   └── BaseLayout.astro    # 共通ヘッダー・フッター・メタデータ
├── pages/
│   ├── index.astro         # トップページ
│   └── projects/
│       └── [slug].astro    # プロジェクト詳細の動的ルーティング
└── styles/                 # グローバルスタイル定義
```

## 今後の展望 (TODO)

- **Playground の公開**: 現在準備中（In Preparation）としている技術検証ページの実装と公開。
