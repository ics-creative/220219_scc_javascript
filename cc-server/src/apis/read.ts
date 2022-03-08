import * as fs from "fs";
import { Record } from "../types/Record";
import { AppErrorObject } from "../types/AppErrorObject";
import { RecordListIo } from "../io/RecordListIo";

/**
 * データ読み出し。JSONファイルからデータを読み込みます。
 * @returns レコードオブジェクトの配列
 */
export const read = (): Record[] | AppErrorObject => {
  let data: string;
  let originData: Record[];
  try {
    data = fs.readFileSync("db/data.json", "utf8");
  } catch (error) {
    console.error(error);
    return {
      message: "データベースであるJSONファイルを開けませんでした。",
    };
  }
  try {
    originData = JSON.parse(data) as Record[];
  } catch (error) {
    console.error(error);
    return {
      message: "データベースであるJSONをパースできませんでした。",
    };
  }

  if (!RecordListIo.is(originData)) {
    return {
      message: "データベースであるJSONオブジェクトが形式的に壊れています。",
    };
  }

  return originData;
};
