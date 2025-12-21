# yukassa.github.io

物理学のバックグラウンドを持つバックエンドエンジニア yukassa のポートフォリオサイトです。 Astro と MDX を使用して構築されており、数式（LaTeX）やコードブロックを含むリッチなプロジェクト詳細ページを生成します。

## サイト構成

- **Home (`/`)** — 自己紹介、経歴（Background）、主要プロジェクト（Key Projects）、個人開発（Personal Lab）、興味分野（Interests）を 1 ページに集約したダッシュボードスタイル。

- **Project Detail (`/projects/[slug]`)** — MDX で記述された各プロジェクトの詳細ページ。数理モデルの解説や実装の詳細を表示。

## データ管理

本サイトのコンテンツは、情報の種類によって 2 つの場所で管理されています。

1. **基本情報 (`src/content/resume/resume.json`)**

- プロフィール、学歴（Academic）、職歴（Career）、興味タグ（Interests）を管理。
- サイト全体の基本設定や、トップページのタイムライン表示に使用されます。

2. **プロジェクト詳細 (`src/content/projects/*.mdx`)**

- 仕事のプロジェクト（Key Projects）および個人開発（Personal Lab）の実績データ。
- Markdown + JSX (MDX) 形式で記述し、数式やコンポーネントの埋め込みが可能です。

## プロジェクト詳細ページの追加手順

新しいプロジェクトを追加する場合、src/content/projects/ ディレクトリ内に新しい .mdx ファイルを作成します。 ファイル名がそのまま URL のスラッグ（/projects/ファイル名）になります。

1. **Key Projects（仕事の実績）を追加する場合**
   トップページの「Key Projects」セクションに表示させたい場合は、Frontmatter（ファイルの先頭部分）の projectType を "work" に設定します。

例: src/content/projects/new-work-project.mdx

```Markdown

---
name: "プロジェクト名"
summary: "トップページのカードに表示される短い概要文。"
architecture: "R&D / Statistical Analysis"  # カード右上のタグ
technologies: ["Python", "AWS", "Go"]       # 使用技術
projectType: "work"                         # ★ここを "work" にする
relatedLink:                                # 外部リンクがある場合（任意）
  label: "TechBook"
  url: "https://example.com"
---

## Overview
ここから詳細ページの本文を Markdown で記述します...
```

2. **Personal Projects（個人開発・研究）を追加する場合**
   トップページの「Personal Lab」セクション（※表示設定時）に表示させたい場合は、projectType を "personal" に設定します。

例: src/content/projects/my-simulation.mdx

```Markdown

---
name: "シミュレーション名"
summary: "トップページに表示される概要。"
architecture: "Physics Simulation"
technologies: ["Python", "NumPy", "Matplotlib"]
projectType: "personal"                     # ★ここを "personal" にする
---

## Mathematical Model
数式も記述可能です。

$$
F = ma
$$

```

## 開発環境

- Node.js 18 以上
- Astro 5 系

### セットアップ

```Bash

npm install
```

### ローカル開発

```Bash

npm run dev
```

ブラウザで http://localhost:4321 を開いて確認します。

### ビルド

```Bash

npm run build
```

生成物は dist/ 以下に出力されます。

## プロジェクト構成 (抜粋)

- src/pages/
  - index.astro: トップページ。resume.json と MDX コレクションを読み込んで表示。
  - projects/[slug].astro: プロジェクト詳細ページの動的ルート生成用ファイル。
- src/content/
  - projects/: プロジェクト詳細の MDX ファイル群。
  - resume/: resume.json を格納。
  - config.ts: コンテンツコレクションのスキーマ定義。
- src/layouts/BaseLayout.astro: 全ページ共通のレイアウト（ヘッダー、メタタグ等）。
- src/styles/: グローバルスタイル（CSS 変数、リセット CSS）。
