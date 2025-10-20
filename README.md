# yukassa.github.io

Dummy Portfolio site based Astro。Home ページの MVP 実装 (ヒーロー、最新プロジェクト、スキル、コンタクト CTA) を含みます。

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

- `src/layouts/BaseLayout.astro` — サイト全体のシェル、ヘッダー/フッター
- `src/pages/index.astro` — Home ページ実装
- `src/components/` — Hero、ProjectCard、SkillsGrid、ContactBanner などの UI コンポーネント
- `src/data/` — ダミーのプロジェクト・スキルデータ
- `docs/` — ワイヤーフレーム、タスクリストなどの補助ドキュメント

## 次のステップ

優先度の高いタスクは `docs/tasks.md` にまとめています。Should/Could 項目を進める際は、ダミーデータの追加や Astor Islands を用いたインタラクションを検討してください。
