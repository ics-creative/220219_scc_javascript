// -------------------------------------------
// サーバー側機能。
// ■概要
// db/data.json ファイルを簡易的なデータベースとして使っています。
// API( /read, /add, /update, /delete )の4種類を用意しています。
// -------------------------------------------

// 必要なモジュールを呼び出す
const express = require("express");
const fs = require("fs");
const app = express();

// JSONを有効化
app.use(express.json());
// クロスドメインをスルーするよう対策
app.use(function (req, res, next) {
  // ローカルでの開発時のネットワークトラブルを避けるため
  // クロスドメインを解放しています（本番環境だとオススメしません）。
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  next();
});

// 8080 ポートでサーバーを起動
app.listen(8080, () => {
  console.log("http://localhost:8080/read へアクセスしてみましょう");
});

// -------------------------------------------
// API関連
// -------------------------------------------

// 登録されたレコード結果の一覧を返却します。
// リクエスト引数はありません。
// レスポンス戻り値の型は、{id: number, color:string, seed: number, lines:number, segments: number}[] です。
app.get("/read", (req, res) => {
  res.send(read());
});

// 新しいレコードを追加します
// リクエスト引数として {id: number, color:string, seed: number, lines:number, segments: number} のデータを参照します。
// レスポンス戻り値の型は、"ok" です（参照することを意図していません）。
app.post("/add", (req, res) => {
  add(req.body);
  res.send("ok");
});

// レコードを更新します
// リクエスト引数として {id: number, color:string, seed: number, lines:number, segments: number} のデータを参照します
// レスポンス戻り値の型は、"ok" です（参照することを意図していません）。
app.post("/update", (req, res) => {
  update(req.body);
  res.send("ok");
});

// レコードを削除します
// リクエスト引数として {id: number} のデータを参照します。
// レスポンス戻り値の型は、"ok" です（参照することを意図していません）。
app.post("/remove", (req, res) => {
  remove(req.body.id); // 該当するIDを参照します。
  res.send("ok");
});

// -------------------------------------------
// JSONファイル管理
// -------------------------------------------

/**
 * データ読み出し。JSONファイルからデータを読み込みます。
 * @returns {{id: number, color:string, seed: number, lines:number, segments: number}[]}
 */
function read() {
  const data = fs.readFileSync("db/data.json", "utf8");
  const originData = JSON.parse(data);
  return originData;
}

/**
 * データ保存。JSONファイルへデータを書き込みます。
 * @param {{id: number, color:string, seed: number, lines:number, segments: number}[]} data
 */
function write(data) {
  const json = JSON.stringify(data, null, 2);
  fs.writeFileSync("db/data.json", json, "utf8");
}

// -------------------------------------------
// JSONファイル管理
// -------------------------------------------

/**
 * レコードを追加します。
 * @param record {{id: number, color:string, seed: number, lines:number, segments: number}}
 */
function add(record) {
  const dataCurrent = read(); // 読み込み

  // IDの重複をチェック
  const duplicateRecord = dataCurrent.find((item) => item.id === record.id);
  if (duplicateRecord) {
    console.error("重複するデータがあったので無視します。");
    return;
  }

  // データの末尾に新しいレコードを追加
  const dataNext = [...dataCurrent, record];
  write(dataNext); // 書き込み
}

/**
 * レコードを更新します。
 * @param record {{id: number, color:string, seed: number, lines:number, segments: number}}
 */
function update(record) {
  const dataCurrent = read(); // 読み込み

  // IDの重複をチェック
  const duplicateRecord = dataCurrent.find((item) => item.id === record.id);
  if (duplicateRecord) {
    // 重複する項目の各フィールドをコピー
    Object.assign(duplicateRecord, record);
  }

  write(dataCurrent); // 書き込み
}

/**
 * 該当するレコードを削除します。
 * @param recordId {number}
 */
function remove(recordId) {
  const dataCurrent = read(); // 読み込み
  // 該当する項目を削除（一致するIDはフィルターで省く）
  const dataNext = dataCurrent.filter((item) => item.id !== recordId);
  write(dataNext); // 書き込み
}
