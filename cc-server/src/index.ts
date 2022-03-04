import * as express from "express";
import {read} from "./apis/read";
import {add} from "./apis/add";
import {update} from "./apis/update";
import {remove} from "./apis/remove";

// -------------------------------------------
// サーバー側機能。
// ■概要
// db/data.json ファイルを簡易的なデータベースとして使っています。
// API( /read, /add, /update, /delete )の4種類を用意しています。
// -------------------------------------------

const app = express();

// JSONを有効化
app.use(express.json());
// クロスドメインをスルーするよう対策
app.use((req, res, next) => {
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