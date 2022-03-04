import { Record } from "../types/Record";
import fs from "fs";

/**
 * データ保存。JSONファイルへデータを書き込みます。
 * @param data レコードオブジェクトの配列
 */
export const write = (data: Record[]): void => {
  const json = JSON.stringify(data, null, 2);
  fs.writeFileSync("db/data.json", json, "utf8");
};
