# async-example-201601

[Developers in KOBE #3](http://devkobe.connpass.com/event/24384/)で発表した「JS非同期処理のいま」のサンプルコードです。

## サンプルの概要

MongoDBに接続してドキュメントをひとつ取得する。というnode.jsの非同期処理をコールバック、Promise, generator, async/await で書いています。
MongoDB操作には[mongoose](http://mongoosejs.com/)、generatorの非同期処理サポートとして[co](https://github.com/tj/co)、async/await実行のため[babel](https://babeljs.io/)を使用しています。
