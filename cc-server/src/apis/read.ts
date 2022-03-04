import fs from "fs";
import { Record } from "../types/Record";

/**
 * データ読み出し。JSONファイルからデータを読み込みます。
 * @returns レコードオブジェクトの配列
 */
export const read = (): Record[] => {
  const data = fs.readFileSync("db/data.json", "utf8");
  const originData = JSON.parse(data) as Record[];
  return originData;
};
