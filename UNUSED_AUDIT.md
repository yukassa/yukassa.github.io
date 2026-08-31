# 未使用ファイル・未使用プロパティ 調査レポート (2026-08-31)

Content Layer API への正式移行に合わせて実施した、未使用ファイル・`resume.json` 内未使用プロパティの洗い出し結果。**削除するか、今後使う予定として残すかは未判断。** このリストをもとに判断してください。

関連: [investigation-report-2026-08-31.md](investigation-report-2026-08-31.md)(コンテンツが表示されなくなった原因調査)

---

## 1. resume.json 内の未使用プロパティ

`src/content/resume/resume.json` のトップレベルフィールドごとの利用状況。

| フィールド         | 状態          | 詳細                                                                                                                                                              |
| ------------------ | ------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `keyProjects`      | ❌ 未使用     | トップページの「Selected Works」は `resume.json` ではなく別コレクション `src/content/projects/*.mdx` から取得しており、このフィールドはどこからも読まれていない   |
| `personalProjects` | ❌ 未使用     | Playgroundページも同様に `src/content/projects/*.mdx`(`projectType: 'personal'`)から取得しており、このフィールドは読まれていない                                  |
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
| `src/content/projects/_dummy-memo.mdx`<br>`_boid-simulation.mdx`                                                                                           | ⚠️ 意図的に除外 | ファイル名がアンダースコア始まりのため、Astroの規約により下書き扱いで一覧・ビルド対象から除外される。事故ではなく意図的な下書きと思われる                                          |
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
- `/playground` — トップページからリンクあり(index.astro)。ただしヘッダーナビゲーションの項目はコメントアウトされたまま

---

## 判断待ちの項目まとめ

1. `resume.json` の `keyProjects` / `personalProjects` / `basics.name` 等の未使用フィールド → 削除するか、将来使う予定で残すか
2. `src/content/skills/*.json`(9ファイル) → 削除するか、`/skills` ページを本来これらのファイル単位のコレクションに繋ぎ直すか
3. `src/content/projects/dummy-*.json` と対応する `public/images/projects/*.svg` → 削除するか、実データに差し替えて公開するか
4. `_dummy-memo.mdx` / `_boid-simulation.mdx` → 下書きとして残すか、削除するか
5. `ProjectCard.astro` / `SkillsGrid.astro` / `src/assets/astro.svg` / `background.svg` → 削除して問題ないか
6. `/resume` ページのフィールド名不一致(`experience`/`school.degree`等) → `resume.json` の実データに合わせて修正するか、別のダミーページとしてこのまま残すか
7. `/about` `/skills` `/tech-notes` をナビゲーションに追加して正式公開するか、非公開のまま(あるいは削除)にするか
