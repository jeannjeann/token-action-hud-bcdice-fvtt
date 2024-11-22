# Token Action HUD BCDice

[![ko-fi](https://ko-fi.com/img/githubbutton_sm.svg)](https://ko-fi.com/X8X415YUSP)
[![OFUSE](https://img.shields.io/badge/OFUSE-9cf.svg?style=for-the-badge)](https://ofuse.me/o?uid=81619)

[BCDice for Foundry VTT](https://foundryvtt.com/packages/fvtt-bcdice-addon)用の「Token Action HUD」システムモジュール

Token Action HUD for [BCDice for Foundry VTT](https://foundryvtt.com/packages/fvtt-bcdice-addon) module

## 必須モジュール (Required Modules)

**重要** - このモジュールは [Token Action HUD Core](https://foundryvtt.com/packages/token-action-hud-core) と[BCDice for Foundry VTT](https://foundryvtt.com/packages/fvtt-bcdice-addon)がインストールされている必要があります。

**IMPORTANT** - Token Action HUD BCDice requires the [Token Action HUD Core](https://foundryvtt.com/packages/token-action-hud-core) and [BCDice for Foundry VTT](https://foundryvtt.com/packages/fvtt-bcdice-addon) module to be installed.

## 使い方

**注意** - 個別システム用の「Token Action HUD」システムモジュールがある場合、どちらか一方のみ使用してください。併用時の挙動は検証していません。

#### 動作
BCDiceモジュールのマクロボタンが「コマンド一覧」に表示されます。
- ボタン名は書式「Command Comment1 Comment2 ...」の「Comment1」になります（「Comment1」がない場合、「Command」）。
- ツールチップに「Command」が表示されます。
- ボタンクリックで実行し、右クリックでチャット入力欄にコマンドを転記します。
- デフォルトではBCDiceモジュールのカテゴリーに分けて表示しますが、設定でカテゴリーを無視してまとめて表示することも可能です。
BCDiceモジュールの変数は「変数操作」に表示されます。
- ボタン名は変数名になります。
- ツールチップには変数の定義文が表示されます。
- ボタンクリックで変数名までを、右クリックで定義文全文をチャット入力欄に転記します。
BCDiceモジュールにおけるタブは反映されず、すべてのタブを集約してマクロボタン表示する仕様です。

#### 便利に使うには
- [Token Action HUD Core](https://foundryvtt.com/packages/token-action-hud-core)の操作説明を一読しておくことをオススメします。
- コマンド分を工夫して、ボタン名（コメント部分）をわかりやすいものにすると操作性が上がります。
- チャットにそのまま出力するマクロボタンは動作しますが、ボタン名の取得に難がある可能性があります。グループを削除してスッキリさせるか、ボタン名がうまく取得されるようにコマンドを考える必要があります。
- 変数操作のマクロボタンは「変数操作」を利用する方が便利だと思うので、グループを削除しておくとスッキリします。
- TAH操作でグループ分けなどのカスタマイズができるので使いやすくカスタマイズすることが可能です。
- カスタマイズする際、「Group: コマンド」にマクロボタンが、「Group: 変数」に変数操作ボタンが格納されているので、活用してください。
- カスタムした後はTAHの設定からレイアウトの保存をしておくことも可能です。

# サポート (Support)

「Token Action HUD」の使い方　[How to Use Token Action HUD (英語サイト)](https://github.com/Larkinabout/fvtt-token-action-hud-core/wiki/How-to-Use-Token-Action-HUD)

このモジュールは日本語と英語をサポートしています。

プルリクエストは大歓迎です。

For a guide on using Token Action HUD, go to: [How to Use Token Action HUD](https://github.com/Larkinabout/fvtt-token-action-hud-core/wiki/How-to-Use-Token-Action-HUD)

This module supports Japanese, English.

Pull requests are welcome. 

# License

This Foundry VTT module is licensed under a [Creative Commons Attribution 4.0 International License](https://creativecommons.org/licenses/by/4.0/) and this work is licensed under [Foundry Virtual Tabletop EULA - Limited License Agreement for module development](https://foundryvtt.com/article/license/).

# CHANGELOG

## 1.0.0
- first release