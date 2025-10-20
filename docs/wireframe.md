# Astro Portfolio Wireframe

Astro で実装するポートフォリオサイトの情報設計と主要画面レイアウトを整理しました。デスクトップ/モバイルの ASCII ワイヤーフレームと、Astro コンポーネント分割の指針を含みます。

## 共通レイアウト

- `site-header`: ロゴ、グローバルナビ (Home / Works / About / Blog / Contact)、主要 CTA
- `app-shell`: 余白 1200px max-width のセンター化コンテナ、セクション間スペーシング 64px
- `site-footer`: コピーライト、SNS リンク、メール、Back to top ボタン
- スクロールに追従する `back-to-top` + 進捗インジケーター (Intersection Observer 想定)
- テーマ/スタイルは別タスクで定義 (Light/Dark 切替対応を想定)

---

## Home (Desktop)

```
+--------------------------------------------------------------------------------+
| LOGO             | Home | Works | About | Blog | Contact | [Hire Me]         |
+--------------------------------------------------------------------------------+
| [Hero Portrait]           Hi, I'm ____                                          |
|                           Creative Dev building human-centered products        |
| [Primary CTA: View Works]  [Secondary CTA: Contact]   | Skills: tags line      |
+-------------------------------------+------------------------------------------+
| Recent Projects (grid 2x2)          | Featured Project                         |
| [Card: thumb, title, stack, CTA]    | [Large visual][Short copy][Live | Code]  |
+-------------------------------------+------------------------------------------+
| Skills Snapshot: icon row (Frontend | Design | Backend | Tooling | Speaking)    |
+--------------------------------------------------------------------------------+
| Testimonials slider: client quote, name, role, logo                            |
+--------------------------------------------------------------------------------+
| Blog Teaser: 3 cards (image, title, tag, date, button)                         |
+--------------------------------------------------------------------------------+
| Contact Banner: short copy, email, CTA button                                  |
+--------------------------------------------------------------------------------+
| Footer: social icons, copyright, back to top                                   |
+--------------------------------------------------------------------------------+
```

### Home (Mobile)

```
+----------------------------------+
| LOGO                [☰]          |
+----------------------------------+
| Hero image                         |
| "Hi, I'm ____"                    |
| Copy line                          |
| [View Works]                      |
| [Contact]                         |
+----------------------------------+
| Projects cards (stack / swipe)    |
+----------------------------------+
| Skills chips (2 column grid)      |
+----------------------------------+
| Testimonials slider (1-up)        |
+----------------------------------+
| Blog cards (stack)                |
+----------------------------------+
| Contact banner                    |
+----------------------------------+
| Footer links                      |
+----------------------------------+
```

### Home スコープ調整

- Must Have: ヒーロー (コピー + CTA 2種)、最新プロジェクト 3 件、スキルチップ、コンタクトバナー、フッター
- Should Have: 特徴的なフィーチャープロジェクト枠、Testimonials 1 枚表示、ブログティーザー
- Could Have: スクロール進捗バー、滞留時間に応じたアニメーション、ダークテーマ切替
- Out of Scope (現時点): 3D ヒーロー演出、リアルタイム GitHub 連携、CMS 連動フォーム

### Home 実装タスク (初期リリース順)

- レイアウトコンテナとレスポンシブグリッドのセットアップ (Desktop ↔ Mobile)
- Hero セクションのコピー/CTA/ビジュアルの配置とアクセシビリティ対応
- Projects セクション: ダミー JSON 読み込み、カードコンポーネントの作成
- Skills セクション: アイコン or Emoji チップのスタイル調整とラップ処理
- Contact バナー: CTA ボタン + メールリンク、再利用可能なコンポーネント化
- 余裕があれば Testimonials/Blog を切り出し、のちのデータ連携に備え props 設計

### Home データ・依存関係

- ダミーデータ: `src/data/projects.json`, `src/data/skills.json`, `src/data/testimonials.json`
- 収集が必要なアセット: Hero 画像、プロジェクトサムネイル (最大 4 枚)、クライアントロゴ
- インタラクション: Testimonials スライダーは Astro Islands + Embla/Swiper を想定 (後回し可)
- アナリティクス/タグ: 初期スコープ外、インストール時に `BaseLayout` で統合予定

---

## 追加ページ候補

- Works Detail (`/works/[slug]`): プロジェクト概要、課題・解決策、結果、使用技術、ギャラリー、関連プロジェクトリンク
- Style Guide (`/style-guide`): カラーパレット、タイポ、コンポーネントプレビュー (デザイントークン共有用)
- Resume (`/resume`): Markdown → PDF 変換対応、Experience/Skills の簡易版、ダウンロードボタン
- Now Page (`/now`): 現在の取り組み・ステータス共有、定期的なアップデートでエンゲージメント向上
- 404 / 500 (カスタムエラーページ): ブランディング整合を保ち、主要 CTA を設置
- Legal (Privacy / Terms): 外部フォームサービスや分析ツール導入時に必要な告知内容

## Works / Projects

```
+--------------------------------------------------------------------------------+
| Page Header: title, subtitle, filter tabs (All | Web | UI/UX | OSS | Freelance) |
+--------------------------------------------------------------------------------+
| Filter bar sticky on scroll                                                     |
+--------------------------------------------------------------------------------+
| Project Grid (desktop 3 col, tablet 2, mobile 1)                                |
| [Thumb][Title][Stack tags]                                                      |
| [Summary][Buttons: Case Study | Live | Code]                                    |
+--------------------------------------------------------------------------------+
| Pagination controls (numbers + next)                                           |
+--------------------------------------------------------------------------------+
```

- 個別プロジェクト詳細ページは `src/pages/works/[slug].astro` で後続設計

---

## About

```
+---------------------------------------------------------------+
| Hero block: portrait, name, short mission statement            |
+---------------------------------------------------------------+
| Biography timeline (education, experience, awards)             |
+---------------------------------------------------------------+
| Skill Matrix: level bars / badges grouped by category          |
+---------------------------------------------------------------+
| Tool Stack: icon grid with short captions                      |
+---------------------------------------------------------------+
| CTA bar: Download Resume, Contact                              |
+---------------------------------------------------------------+
```

---

## Blog

```
+--------------------------------------------------------------------------------+
| Blog Hero: title, RSS/subscribe CTA, tagline                                   |
+--------------------------------------------------------------------------------+
| Post List: responsive cards (image, title, excerpt, tags, date)                |
+--------------------------------------------------------------------------------+
| Sidebar (desktop only): search, categories, featured posts                     |
+--------------------------------------------------------------------------------+
| Pagination / infinite scroll                                                   |
+--------------------------------------------------------------------------------+
```

- Astro Content Collections で記事管理、MD/MDX を想定

---

## Contact

```
+---------------------------------------------------------------+
| Intro text: availability, timezone                             |
+---------------------------------------------------------------+
| Contact Form: name, email, project type select, message textarea|
+---------------------------------------------------------------+
| Direct links: Email, LinkedIn, GitHub, Calendly                 |
+---------------------------------------------------------------+
| FAQ accordion (optional)                                        |
+---------------------------------------------------------------+
```

---

## Astro コンポーネント分割案

- `src/layouts/BaseLayout.astro`: meta、header、footer、theme script
- `src/components/NavBar.astro`: ナビゲーション、モバイルドロワー
- `src/components/Hero.astro`: Home 用ヒーローコピー + CTA
- `src/components/ProjectCard.astro`: サムネ、タグ、CTA を props で制御
- `src/components/ProjectHighlight.astro`: 大型ビジュアル用セクション
- `src/components/SkillsGrid.astro`: カテゴリ別アイコン / チップ表示
- `src/components/TestimonialSlider.astro`: Astro Islands + Swiper/Embla
- `src/components/BlogCard.astro`: 記事カード、Content Collections と連携
- `src/components/ContactBanner.astro`: ホーム/フッターに再利用
- `src/components/ContactForm.astro`: フォーム処理 (後続でフォームサービス接続)

---

## 次アクション

1. Astro プロジェクト初期化 (`npm create astro@latest`) と `.devcontainer` 連携
2. ダミーコンテンツ (projects.json, testimonials.json, posts) を作成
3. Global スタイルトークン (カラー、タイポ、スペーシング) 設計
4. Home ページから順にセクション実装、レスポンシブ確認
5. Contact フォーム連携 (Formspree など) とバリデーション実装
