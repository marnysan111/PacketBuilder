# PacketBuilder

## パケットジェネレーター

パケットの送信をブラウザ上から実行したかったので作りました。

|言語|目的|
|--|--|
|Go|バックエンド|
|React|フロントエンド|

## Usage

```bash
$ git clone https://github.com/marnysan111/PacketBuilder.git
$ cd PacketBuilder
$ cd react/app
$ yarn install
$ yarn start
--別タブ--
$ cd PacketBuilder
$ cd go
$ ./packet
```
go側のCORSの設定してないから追加しないといけん

マシンのIPをreact/app/.envに書く必要がある
