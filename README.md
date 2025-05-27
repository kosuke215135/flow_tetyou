# FlowTetyou
## 背景
情報は「フロー型」と「ストック型」に大別されます。NotionやObsidianのような優れたストック型メモアプリは多数存在しますが、有効期限が短く、後で見返すことが少ないフロー情報に特化したツールは少ないと感じていました。
多くの人がSNSやチャットツールを代用していますが、これらはコミュニケーションが前提であり、ノイズが多く、純粋な思考の壁打ちには不向きです。
そこで、「もっと殴り書きできる、思考のための一時的な置き場」を目指し、FlowTetyouの開発を始めました。

参考: [チームの情報共有で大切なのは？〜フロー情報とストック情報の概念とツールの使い分け〜](https://biz-notion.northsand.co.jp/blog-8), [ストック情報とフロー情報とは？違いや具体例を分かりやすく解説](https://www.stock-app.info/media/information-sharing-flow-stock/)

## 概要
FlowTetyouは、日々頭に浮かぶアイデア、タスク、感情などの「フロー情報」を、素早く、気軽に書き留めるためのWebアプリケーションです。XやSlackのようなSNSではなく、純粋に自分の思考を整理し、一時的に置いておく場所を提供します。

![FlowTetyou Demo](https://github.com/user-attachments/assets/26f38ea4-c0d3-4d38-ac9e-dc4ac0f817aa)

## 機能一覧
- 実装済みの機能
    - markdown風のリッチエディタで記入可能
    - テキストの保存
    - googleアカウントでのソーシャルログイン
- 実装予定の機能
    - テンプレート機能
    - OGPの表示
    - 画像の添付・保存
    - スレッド機能
    - 文字列検索
    - 日付検索
    - jsonやmarkdownでの出力

## 使用技術
- フロントエンド
    - TypeScript, React, Vite, TipTap(リッチエディタ)
- バックエンド
    - TypeScript, Express
- その他
    - MySQL, Docker, Nginx

