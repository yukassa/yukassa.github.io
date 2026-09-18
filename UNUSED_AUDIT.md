# 未使用ファイル・未使用プロパティ 調査レポート (2026-08-31)

Content Layer API への正式移行に合わせて実施した、未使用ファイル・`resume.json` 内未使用プロパティの洗い出し結果と、その後の対応記録。

関連: [investigation-report-2026-08-31.md](investigation-report-2026-08-31.md)(コンテンツが表示されなくなった原因調査)

> **追記(2026-08-31・実行)**: 本レポートで「未使用」と判定した項目のうち、以下を**削除・修正済み**です(詳細は各セクション参照)。
> 1. resume.json 内の未使用プロパティ(実質未使用含む)
> 2. 未使用ファイル・ディレクトリ(意図的に除外していたものを含む)
> 3. ナビゲーションから辿れないページ関連のファイル・ディレクトリ(`/about` `/skills` `/tech-notes` `/playground`)
> 4. devcontainer 起動の軽量化(3-1)
> 5. GitHub Pages デプロイ時のサイト軽量化(3-3)
>
> **「3-4. 軽量化以前に、そもそもデプロイが成功していない可能性」は指示により今回は未実行です。**

---

## 1. resume.json 内の未使用プロパティ → ✅ 削除済み

`src/content/resume/resume.json` および `src/content.config.ts` のスキーマから、以下のフィールドを削除しました。

| フィールド | 対応 |
|---|---|
| `keyProjects` | ✅ 削除済み(Selected Worksは別コレクションから取得のため未使用だった) |
| `personalProjects` | ✅ 削除済み(Personal Worksも別コレクションから取得のため未使用だった。内容は既に `crowd-simulation-optimization.mdx` の元ネタとして反映済み) |
| `interests` | ✅ 削除済み(実質未使用。表示箇所だった「Playground (In Preparation)」ティザーのHTMLコメントブロック自体も、`/playground` ページ削除に合わせて `index.astro` から削除) |
| `basics.name` / `basics.label` / `basics.url` / `basics.location` | ✅ 削除済み(参照箇所なし) |
| `basics.summary` | 維持(使用中: Hero文言・メタディスクリプション) |
| `education` / `work` / `skills` | 維持(使用中) |

### 未対応のまま残っている不整合: `/resume` ページとのフィールド名の不一致

`src/pages/resume.astro` は `resume.json` の実データと異なるフィールド名(`data.experience`、`school.degree`/`school.school` 等)を期待しており、`certifications` / `learning` / `productSystems` も `resume.json` に存在しません。**今回の対応スコープ外のため、`/resume` ページ自体・当該フィールドの参照コードは変更していません。** `/resume` は現状もナビゲーション未リンクのページです(後述)。

---

## 2. 未使用ファイル・ディレクトリ → ✅ 削除済み

以下をすべて削除しました。

**コンテンツ**
- `src/content/skills/*.json`(9ファイル: accessibility, astro, content, design, fb, react, si, ts, ur)
- `src/content/projects/dummy-analytics-dashboard.json` / `dummy-booking-platform.json` / `dummy-design-system.json` / `dummy-photography-portfolio.json`
- `src/content/projects/_dummy-memo.mdx`(意図的に除外されていた下書き)
- `src/content/projects/_boid-simulation.mdx`(意図的に除外されていた下書き。内容は `crowd-simulation-optimization.mdx` に統合済み)
- `public/images/projects/atlas-analytics.svg` / `atelier-booking.svg` / `nebula-design-system.svg` / `komorebi-portfolio.svg`(上記 dummy-*.json からのみ参照されていた画像)

**コンポーネント / アセット**
- `src/components/ProjectCard.astro`
- `src/components/SkillsGrid.astro`
- `src/assets/astro.svg`
- `src/assets/background.svg`

**ページ・コレクション定義(ナビゲーションから辿れないページに関連するもの)**
- `src/pages/about.astro`
- `src/pages/skills.astro`
- `src/pages/tech-notes/`(ディレクトリごと)
- `src/pages/playground.astro`
- `src/content/tech-notes/`(ディレクトリごと。`tech-notes` ページの削除に伴い不要化)
- `src/content.config.ts` から `techNotesCollection` の定義と `collections` エクスポートの `'tech-notes'` エントリを削除

**関連コードの追従修正**
- `src/layouts/BaseLayout.astro`: `navItems` からコメントアウトされていた `Playground` 項目を削除
- `src/pages/index.astro`: 削除した `interests` を参照していた、Playground用の死んだHTMLコメントブロック(マークアップ・対応するCSS)を削除
- `src/pages/projects/[slug].astro`: 個人プロジェクトの「戻る」リンク先を、削除した `/playground` から `/#personal-works`(トップページのPersonal Worksセクション)に変更

**検証**: `npx astro sync` / `npm run dev` で全ページ(`/`, `/resume`, `/projects`, `/projects/[slug]` 全4件)が200、削除した4ページ(`/about` `/skills` `/tech-notes` `/playground`)が期待通り404になることを確認済みです。

### ナビゲーションから辿れないページ(現状・削除後)

- `/about` `/skills` `/tech-notes` `/playground` → ✅ 削除済み(上記)
- `/resume` → **削除せず維持**(今回のスコープ外)。ただし依然としてナビゲーションからはリンクされていません(以前は削除済みの `about.astro` からのみリンクされていましたが、その `about.astro` 自体が削除されたため、`/resume` への内部リンクは現状ゼロ件になりました)
- `/projects`(一覧ページ、`src/pages/projects/index.astro`) → **削除せず維持**(今回のスコープ外。当初のリストにも含まれていませんでした)。ただし唯一のリンク元だった `/skills` ページが削除されたため、`/projects` への内部リンクも現状ゼロ件になりました
- トップページの **Personal Works セクション**(`/`)は `/projects/<slug>` の詳細ページへ直接リンクしています

---

## 3. 軽量化の余地(devcontainer / サイト)

### 3-1. devcontainer 起動の軽量化 → ✅ 実行済み

- [.devcontainer/devcontainer.json](.devcontainer/devcontainer.json): `nodeGypDependencies` を `true` → `false` に変更
- 同ファイル: Node機能の `"version"` を `"latest"` → `"22"`、`"npmVersion"` を `"latest"` → `"10"` に固定(`package.json` が要求する Node `>=22.12.0` を満たす範囲)
- [.devcontainer/bootstrap.sh](.devcontainer/bootstrap.sh): 毎回のコンテナ作成時に実行していた `npm install -g npm@latest` を削除(Node機能側でnpmバージョンを固定したため不要)
- `ghcr.io/devcontainers/features/github-cli:1` は「削除候補ではなく確認事項」だったため、**今回は変更していません**(必要か判断が必要であれば別途対応)

### 3-2. コンテナ内でのサイト起動の軽量化(参考情報・対応不要)

- `node_modules` の主要な依存(`@img/sharp`, `@rolldown`, `@shikijs`, `lightningcss` 等)はAstro/Viteのコア機能が直接使用しており、削除するとビルド・devサーバーが動作しなくなるため対応候補にはしていません
- `@img/sharp`(19MB)はAstroの画像最適化機能(`astro:assets`)向けの依存ですが、このリポジトリでは未使用(素の `<img>` タグのみ)。Astro側の都合で依存自体は切り離せないため、参考情報として記載のみに留めています

### 3-3. GitHub Pages デプロイ時のサイト軽量化 → ✅ 実行済み

- 未使用の `public/images/projects/*.svg` 4件を削除済み(前節と重複。`dist/` への無条件コピー対象だったため、これで確実にデプロイサイズが減っています)
- [src/layouts/BaseLayout.astro](src/layouts/BaseLayout.astro) から全ページ共通の `import 'katex/dist/katex.min.css'` を削除し、数式を実際に使う [src/pages/projects/[slug].astro](src/pages/projects/%5Bslug%5D.astro) 側にスコープし直しました。これにより、数式を使わないページ(Home / Resume / Projects一覧など)では約24KBのCSSが配信されなくなりました
- Google Fonts の外部読み込みについては、デプロイサイズとは別軸のトレードオフ(自ホスティングすると逆にリポジトリ・デプロイサイズが増える)のため、**今回は変更していません**

**検証**: `npm run dev` で、トップページに `katex` の記述が出力されないこと、プロジェクト詳細ページには出力されることを確認済みです。

### 3-4. 軽量化以前に、そもそもデプロイが成功していない可能性(重要・未実行)

**指示により今回は対応していません。** 以下2点が未解消のまま残っています。

1. [investigation-report-2026-08-31.md](investigation-report-2026-08-31.md) に記載済みの `npm run build` 失敗(`src/layouts/BaseLayout.astro` の `noise-texture` CSS で `lightningcss` のCSS圧縮がエラーになる)
2. `.github/workflows/deploy.yml` が `node-version: 20` を指定しているが、`astro` 7.2.9 は Node `>=22.12.0` を要求しており不一致

今回の一連の削除・軽量化を反映した状態でも `npm run build` はこの1.のCSSエラーで失敗することを確認済みです(content collection関連のエラーは発生していないため、今回の変更による新規の回帰ではないことは確認できています)。

---

## 判断待ちの項目まとめ(残っているもの)

1. `/resume` ページのフィールド名不一致(`experience`/`school.degree`等) → `resume.json` の実データに合わせて修正するか、別のダミーページとしてこのまま残すか
2. `/resume` `/projects`(一覧)を正式にナビゲーションへ追加するか、削除するか、現状のまま(URL直打ちのみ到達可能)にするか
3. `.github/workflows/deploy.yml` の `node-version: 20` を `astro` の要求する `>=22.12.0`(例: `22`)に修正するか
4. `BaseLayout.astro` の `noise-texture` CSS(`filter="url(%23n)"`)による `npm run build` 失敗の修正
