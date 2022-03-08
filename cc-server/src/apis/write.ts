import * as fs from "fs";
import { AppErrorObject } from "../types/AppErrorObject";
import { Record } from "../types/Record";
import { RecordListIo } from "../io/RecordListIo";

/**
 * データ保存。JSONファイルへデータを書き込みます。
 * @param data レコードオブジェクトの配列
 */
export const write = (data: Record[]): void | AppErrorObject => {
  const isValid = RecordListIo.is(data);
  if (!isValid) {
    return { message: "APIのパラメーターの型が誤っています。" };
  }

  const json = JSON.stringify(data, null, 2);

  try {
    fs.writeFileSync("db/data.json", json, "utf8");
  } catch (error) {
    return { message: "ファイルの書き込みに失敗しました" };
  }
};
