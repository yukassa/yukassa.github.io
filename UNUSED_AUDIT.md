# 未使用ファイル・未使用プロパティ 調査レポート (2026-08-31)

Content Layer API への正式移行に合わせて実施した、未使用ファイル・`resume.json` 内未使用プロパティの洗い出し結果。**削除するか、今後使う予定として残すかは未判断。** このリストをもとに判断してください。

関連: [investigation-report-2026-08-31.md](investigation-report-2026-08-31.md)(コンテンツが表示されなくなった原因調査)

> **追記(2026-08-31)**: トップページに「Personal Works」セクションを新設し、`src/content/projects/crowd-simulation-optimization.mdx` を追加しました。この新規コンテンツは `resume.json` の `personalProjects` と下書き `_boid-simulation.mdx` の内容を参考にして書き起こしたものです(いずれも直接読み込んで使ったわけではなく、文章の元ネタとして参照しただけ)。関連箇所を更新済みです。

---

## 1. resume.json 内の未使用プロパティ

`src/content/resume/resume.json` のトップレベルフィールドごとの利用状況。

| フィールド         | 状態          | 詳細                                                                                                                                                              |
| ------------------ | ------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `keyProjects`      | ❌ 未使用     | トップページの「Selected Works」は `resume.json` ではなく別コレクション `src/content/projects/*.mdx` から取得しており、このフィールドはどこからも読まれていない   |
| `personalProjects` | ❌ 未使用     | トップページ「Personal Works」・Playgroundページも同様に `src/content/projects/*.mdx`(`projectType: 'personal'`)から取得しており、コードから直接読まれることはない。※ただし2026-08-31追加の `crowd-simulation-optimization.mdx` は、この中身(Crowd Evacuation Simulation)を文章の元ネタとして参考にしている |
| `interests`        | ⚠️ 実質未使用 | `src/pages/index.astro` で変数には取り出しているが、表示箇所はHTMLコメントアウトされた「Playground (In Preparation)」セクション内のみで、現状は画面に表示されない |
| `basics.name`      | ❌ 未使用     | 参照箇所なし                                                                                                                                                      |
| `basics.label`     | ❌ 未使用     | 参照箇所なし                                                                                                                                                      |
| `basics.url`       | ❌ 未使用     | 参照箇所なし                                                                                                                                                      |
| `basics.location`  | ❌ 未使用     | 参照箇所なし                                                                                                                                                      |
| `basics.summary`   | ✅ 使用中     | トップページのHero文言・メタディスクリプションに使用                                                                                                              |
| `education`        | ✅ 使用中     | トップページ「Academic」タイムラインに使用(`institution`/`area`/`studyType`/`period`/`summary`/`links`)                                                           |
| `work`             | ✅ 使用中     | トップページ「Career」タイムラインに使用(`company`/`position`/`period`/`summary`)                                                                                 |
| `skills`           | ✅ 使用中     | `/skills` ページの棒グラフ表示、`/resume` ページのスキル一覧に使用。※今回のスキーマ修正で復活(以前はZodスキーマ未定義のため実行時に値が握りつぶされていた)        |

### 付随して見つかった不整合: `/resume` ページとのフィールド名の不一致

`src/pages/resume.astro` は `resume.json` の実データと異なるフィールド名を期待している。

- `data.experience` を参照 → 実データは `work`(`experience` というフィールドは存在しない)
- `education` の子要素で `school.degree` / `school.school` を参照 → 実データは `studyType` / `institution`
- `data.certifications` / `data.learning` / `data.productSystems`(`/projects` 一覧ページでも使用)を参照 → いずれも `resume.json` に存在しないフィールド

いずれも `|| []` 等のフォールバックがあるため実行時エラーにはならず、該当箇所が常に空表示になっているだけの状態。ページ自体に「※内容はすべてダミーデータに基づいたフィクションです」との注記があり、意図的なプレースホルダーの可能性がある。

---

## 2. 未使用ファイル

### コンテンツファイル

| ファイル                                                                                                                                                   | 状態            | 詳細                                                                                                                                                                               |
| ---------------------------------------------------------------------------------------------------------------------------------------------------------- | --------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `src/content/skills/*.json`(9ファイル: accessibility, astro, content, design, fb, react, si, ts, ur)                                                       | ❌ 完全に孤立   | `content.config.ts` の `collections` に未定義。`getCollection('skills')` を呼ぶコードもどこにもない。`/skills` ページは代わりに `resume.json` の `skills` フィールドを使用している |
| `src/content/projects/dummy-analytics-dashboard.json`<br>`dummy-booking-platform.json`<br>`dummy-design-system.json`<br>`dummy-photography-portfolio.json` | ❌ 未読み込み   | `projects` コレクションのローダーは `.mdx` のみを対象にしているため、これらの `.json` ファイルは読み込まれない                                                                     |
| `src/content/projects/_dummy-memo.mdx`                                                                                                                     | ⚠️ 意図的に除外 | ファイル名がアンダースコア始まりのため、Astroの規約により下書き扱いで一覧・ビルド対象から除外される。事故ではなく意図的な下書きと思われる                                          |
| `src/content/projects/_boid-simulation.mdx`                                                                                                                | ⚠️ 意図的に除外・内容は転用済み | 上記と同様に下書き扱いで除外されている。※2026-08-31、この内容は新規作成した `crowd-simulation-optimization.mdx`(Personal Works)に統合済みのため、このファイル自体は重複した下書きメモとして残っている状態 |
| `public/images/projects/atlas-analytics.svg`<br>`atelier-booking.svg`<br>`nebula-design-system.svg`<br>`komorebi-portfolio.svg`                            | ⚠️ 実質未使用   | 上記の未読み込み `dummy-*.json` からのみ参照されている画像。ファイル名から見て、将来実データを入れる想定で準備されたものの可能性がある                                             |

### コンポーネント

| ファイル                           | 状態                            |
| ---------------------------------- | ------------------------------- |
| `src/components/ProjectCard.astro` | ❌ どこからもimportされていない |
| `src/components/SkillsGrid.astro`  | ❌ どこからもimportされていない |

(`Hero.astro`, `ContactBanner.astro`, `ZoomImage.astro`, `BaseLayout.astro` は使用中)

### その他

| ファイル                    | 状態                                                               |
| --------------------------- | ------------------------------------------------------------------ |
| `src/assets/astro.svg`      | ❌ どこからも参照なし。Astroテンプレート初期生成物の残骸と思われる |
| `src/assets/background.svg` | ❌ どこからも参照なし                                              |

### ナビゲーションから辿れないページ(削除候補ではなく確認事項)

以下は削除候補ではなく、「サイト内リンクからは到達できない(URL直打ちでのみアクセス可能)」という状態の確認事項。

- `/about` — サイト内にリンクなし
- `/skills` — サイト内にリンクなし
- `/tech-notes` — サイト内にリンクなし(記事詳細ページ `[slug].astro` も存在せず、一覧の「記事を読む」的リンクは無効化された状態)
- `/playground` — サイト内にリンクなし。トップページの「Playground (In Preparation)」ティザーに `href="/playground"` があるが、このセクション自体がHTMLコメントアウトされているため実際には生きたリンクではない(前回レポート時の記載を訂正)。ヘッダーナビゲーションの項目もコメントアウトされたまま
- （新設）**Personal Works セクション(`/`)** — 2026-08-31に追加。`/projects/<slug>` の詳細ページへは直接リンクしているが、`/playground` ページ自体へのリンクはこのセクションには置いていない

---

## 3. 軽量化の余地(devcontainer / サイト)(2026-08-31追記)

devcontainerの起動、コンテナ内でのサイト起動、GitHub Pagesへのデプロイ時のサイト軽量化について調査した結果。**実行はせず調査のみ。**

### 3-1. devcontainer 起動の軽量化

| 項目 | 内容 |
|---|---|
| `nodeGypDependencies: true`(`.devcontainer/devcontainer.json`) | ❗**削除候補**。node-gyp用のビルドツール一式(build-essential, python3等)をインストールする設定だが、`node_modules` 内でネイティブビルドを要するパッケージ(`binding.gyp` を持つもの)は0件。ネイティブ処理が必要な依存(`lightningcss`, `@rolldown/binding`, `@img/sharp`, `@astrojs/compiler`, `@bruits/satteri`)はすべてプラットフォーム別のプリビルド `.node` バイナリ(`*-linux-arm64-gnu` 等)を直接使っており、ビルド工程自体が発生しない。この設定を `false` にすることで、コンテナ初回ビルド時間とイメージサイズを削減できる可能性が高い |
| Node機能の `"version": "latest"` / `"npmVersion": "latest"`(devcontainer.json) | ⚠️ 再現性・ビルドキャッシュの観点で気になる点。「latest」は再構築のたびに解決結果が変わりうるため、Dockerレイヤーキャッシュが効きにくくなる場合がある。`package.json` が要求する Node `>=22.12.0` に合わせて具体的なバージョン(例: `"22"`)を固定すると、起動の高速化と再現性向上が見込める |
| `bootstrap.sh` の `npm install -g npm@latest` | ⚠️ 毎回のコンテナ作成時にグローバルnpmを最新化しており、わずかながら追加のネットワーク・時間コストが発生している。Node機能に同梱されるnpmをそのまま使う運用でも支障はなさそうであれば省略可能 |
| `ghcr.io/devcontainers/features/github-cli:1` | ℹ️ 削除候補ではなく確認事項。`gh` コマンド自体はこのリポジトリのビルド・実行フローには不要(GitHub Actionsのワークフローも `gh` を使っていない)。開発者の手元での利便性(PR作成など)のためだけに入れているのであれば、不要なら外すことでイメージサイズを削減できる |

### 3-2. コンテナ内でのサイト起動の軽量化

- `npm run dev`(Astro devサーバー)自体の起動速度は `node_modules` のサイズにはほぼ依存しない(Viteの依存事前バンドルはキャッシュされる)。起動を軽くする主な手段は上記 3-1 の devcontainer 側の見直し
- `node_modules` 全体は 160MB。内訳は `@img`(sharp, 19MB)`@rolldown`(17MB)`@shikijs`(14MB)`@esbuild`(9.9MB)`lightningcss-linux-arm64-gnu`(8.6MB)など。いずれもAstro/Viteのコア機能が直接使用する依存であり、削除するとビルドやdevサーバー自体が動作しなくなるため、パッケージ単位での削減余地はほぼ無い
  - 例外として `@img/sharp`(19MB)は、Astroの画像最適化機能(`astro:assets` の `<Image />` / `getImage()`)向けの依存だが、**このリポジトリではどこからも使われていない**(全て素の `<img>` タグ)。Astro側の仕組み上、依存自体を切り離すのは現実的ではないため「使っていないが外せない」参考情報として記載

### 3-3. GitHub Pages デプロイ時のサイト軽量化

- **`public/` 配下のファイルは、使用有無に関わらずビルド時に無条件で `dist/` へコピーされる**(Astroの仕様上、静的パススルー)。前節で「未使用」と判定した `public/images/projects/` の4つのSVG(`atlas-analytics.svg` 等、計16KB)は、対応する `dummy-*.json` が読み込まれていなくても、ファイル自体は毎回デプロイ物に含まれてしまっている。削除すれば確実にデプロイサイズが(わずかだが)減る
- **`src/layouts/BaseLayout.astro` で `katex/dist/katex.min.css` を全ページ共通で読み込んでいる**(2行目)。実際に数式(KaTeX)を使っているのは `metaverse-efficacy-verification.mdx` など一部のプロジェクト詳細ページのみで、Home/Resume/Skills/About等の数式を使わないページにも約24KBのCSSが毎回配信されている。プロジェクト詳細ページ(`src/pages/projects/[slug].astro`)側にスコープを移せば、他ページの軽量化が見込める(なおKaTeXのフォント本体1.2MBは `@font-face` の遅延読み込みのため、数式を使わないページでは元々読み込まれない)
- **誤解しやすい点の整理**: `src/components/ProjectCard.astro` / `SkillsGrid.astro`(未importコンポーネント)や `src/content/skills/*.json`(未読み込みコンテンツ)は、削除しても**デプロイされるサイトのサイズには影響しない**。Astroはビルド時に実際に参照されているファイルのみをバンドルするため、これらは元々 `dist/` に含まれていない。削除する意義は「リポジトリ・保守性の整理」であり、「サイトの軽量化」とは別軸の話である点に注意
- Astroのビルド出力は既に `output: "static"`(完全な静的HTML/CSS/JS生成、GitHub Pagesに最適な構成)になっており、この点はすでに軽量化された状態
- Google Fonts(`Outfit`, `Inter`)は `BaseLayout.astro` で外部リンク読み込みしており、デプロイサイズ自体には計上されないが、外部リクエストとしてページ表示速度に影響する。自ホスティング(フォントファイルをリポジトリに含めてセルフホスト)にすると外部リクエストを削減できるが、代わりにリポジトリ・デプロイサイズは増える(トレードオフ)

### 3-4. 軽量化以前に、そもそもデプロイが成功していない可能性(重要)

調査の過程で、GitHub Pagesへのデプロイ自体を妨げている2つの問題を確認した。軽量化を検討する前提として、まずこちらの解消が必要になる。

1. [investigation-report-2026-08-31.md](investigation-report-2026-08-31.md) に記載済みの `npm run build` 失敗(`src/layouts/BaseLayout.astro` の `noise-texture` CSS で `lightningcss` のCSS圧縮がエラーになる)。**未修正のまま**
2. **今回新たに発見**: `.github/workflows/deploy.yml` が `node-version: 20` を指定しているが、`astro` 7.2.9 は `package.json`(`node_modules/astro/package.json`)上で Node `>=22.12.0` を要求している。CI環境のNodeバージョンが要件を満たしておらず、上記1が仮に直っても、このバージョン不一致により `npm run build` が正しく動作しない(あるいは警告付きで不安定に動作する)可能性が高い

---

## 判断待ちの項目まとめ

1. `resume.json` の `keyProjects` / `personalProjects` / `basics.name` 等の未使用フィールド → 削除するか、将来使う予定で残すか
2. `src/content/skills/*.json`(9ファイル) → 削除するか、`/skills` ページを本来これらのファイル単位のコレクションに繋ぎ直すか
3. `src/content/projects/dummy-*.json` と対応する `public/images/projects/*.svg` → 削除するか、実データに差し替えて公開するか
4. `_dummy-memo.mdx` → 下書きとして残すか、削除するか
5. `_boid-simulation.mdx` → 内容は `crowd-simulation-optimization.mdx` に統合済みのため削除候補。参考メモとして残す場合も要否を判断してください
6. `ProjectCard.astro` / `SkillsGrid.astro` / `src/assets/astro.svg` / `background.svg` → 削除して問題ないか
7. `/resume` ページのフィールド名不一致(`experience`/`school.degree`等) → `resume.json` の実データに合わせて修正するか、別のダミーページとしてこのまま残すか
8. `/about` `/skills` `/tech-notes` `/playground` をナビゲーションに追加して正式公開するか、非公開のまま(あるいは削除)にするか
9. `.devcontainer/devcontainer.json` の `nodeGypDependencies: true` → 無効化して問題ないか(ネイティブビルドを要する依存が無いことは確認済み)
10. `.devcontainer/devcontainer.json` の Node機能バージョン指定(`"latest"`)を固定バージョンに変更するか
11. `BaseLayout.astro` 全ページ共通の `katex.min.css` 読み込みを、数式を使うページ限定にスコープし直すか
12. `.github/workflows/deploy.yml` の `node-version: 20` を `astro` の要求する `>=22.12.0`(例: `22`)に修正するか(現状デプロイが失敗する可能性がある根本原因の一つ)
