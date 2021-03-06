[![Build Status](https://semaphoreci.com/api/v1/naoki-tomita/videostream/branches/master/badge.svg)](https://semaphoreci.com/naoki-tomita/videostream)

# videostream
* 動画のプログレッシブダウンロードを行うことができるサーバープログラムとおまけです。

# プログレッシブダウンロード？
* 要はyoutubeです。
* ブラウザーがいい感じにダウンロードしてくれる仕組みはすでにあるので、サーバー側はそれ用の実装を行えばよいです。

# ブラウザーが行うこと
* `<video>`タグの`src`で指定されたURLに対し、Rangeリクエストを送ります。
    * Rangeリクエストとは、ファイルの分割ダウンロードを要求する方法です。
    * リクエストヘッダに`Range: bytes=<start>-<end>`という形式でパラメータを付与します。
        * start, endは欲しいバイト位置をさします。
        * endは空文字の場合があります。

# サーバーでやること
* ステータスコード`206 Partial Content`を返す
    * レスポンスデータは全体のうちの一部ですよということを示す。
* Rangeリクエストをパースしてそれに応じたレスポンスを返す
    * レスポンスヘッダ
        * `Accept-Ranges: bytes`を付与する
        * `Content-Range: bytes <start>-<end>/<total>`を付与する
            * start: データが始まる位置。0byteから数える。ブラウザーが指定してきた`Range`ヘッダのstartと同じにする。
            * end: データが終わる位置。0byteから数える。ブラウザーが指定しなかった場合は、totalから1引いた(0byteから数えるので、endはtotal-1となる)値を入れる。
            * total: データの全体のサイズ
        * `Content-Length: <bodySize>`を付与する。
            * 送信するデータのサイズ。0byteから始めるため、サイズを間違えないようにする。`start - end + 1`と計算するとよいでしょう。
        * `Content-Type`をいい感じに設定する
    * ボディ
        * データをレスポンスとして返す。
