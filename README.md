# yukassa.github.io

Astro で構築したクリエイティブデベロッパー yukassa のポートフォリオサイトです。全ページはダミーコンテンツで構成され、クリエイティブ開発の実績を見せるための UI を擬似的に再現しています。

## サイト構成

- **Home (`/`)** — ダッシュボードレイアウトでプロフィール、強みチップ、注目プロジェクト、外部リンクをカード状に配置。
- **About (`/about`)** — ヒーローセクションと価値観リスト、ダミー経歴タイムラインを掲載。カード要素は横幅に合わせてラップし、ヒーローは左右に余白を持たせています。
- **Projects (`/projects`)** — プロジェクト概要カードを一覧化。タグラインは折り返し対応、メタ情報は小画面でフレックスラップします。
- **Resume (`/resume`)** — タグフィルタ付きのタイムラインをカラム表示。凡例タグやフィルタ UI はレスポンシブ余白を持ち、スクロール時も軸が揃うよう調整済み。
- **Skills (`/skills`)** — スキルカテゴリ別バーグラフ、担当システムカード、資格・学習中リストで構成。ヒーローと各パネルに共通の横方向余白を設定。
- **Tech Notes (`/tech-notes`)** — ケーススタディのダミー記事一覧。カードごとにタグ・要約・CTA を備え、ページ全体で統一した内側余白を確保。
- **共通ヘッダー / フッター** — `BaseLayout` がナビゲーション、外部リンク、フッターコピー（© 2025 yukassa）を提供。

### コンテンツデータ

- `src/data/projects.json` — プロジェクトタイトル、タグライン、各ページで参照されるスラッグ。
- `src/data/resume.json` — タイムライン、スキルカテゴリ、資格、システム構成などの元データ。
- `src/data/skills.json` / `notes.json` — スキルグリッドや Tech Notes のダミー記事メタ。

### 主要コンポーネント

- `src/components/Hero.astro` — ホームヒーローの再利用コンポーネント。
- `src/components/ProjectCard.astro` — Projects ページで使用。
- `src/components/SkillsGrid.astro` / `ContactBanner.astro` — インデックスページの共通 UI パーツ。

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

- `src/layouts/BaseLayout.astro` — 全ページ共通のシェル。グローバルナビとフッターを提供。
- `src/pages/` — 各ページの Astro ファイル。`about.astro` や `projects/index.astro` などルーティングに対応。
- `src/components/` — ホーム向けパネルや CTA を中心とした再利用コンポーネント群。
- `src/assets/` — 共通スタイル・フォント定義。
- `src/data/` — JSON 形式のダミーコンテンツ。
- `public/images/projects/` — プロジェクトカード用のプレースホルダー画像。
- `docs/` — ワイヤーフレームや作業タスクの補助資料。

## 次のステップの例

- ダミーデータを実データへ差し替え、`links.live` / `writeUp` の URL を確定させる
- Tech Notes の実記事を `src/content/` などに移し、本番導線を整備
- GitHub Pages デプロイ（`.github/workflows/deploy.yml`）が成功するか確認し、カスタムドメイン設定があれば調整
