import * as fs from "fs";
import {Record} from "../types/Record";
import {LogicErrorObject} from "../types/LogicErrorObject";

/**
 * データ読み出し。JSONファイルからデータを読み込みます。
 * @returns レコードオブジェクトの配列
 */
export const read = (): Record[] | LogicErrorObject => {

  let data: string;
  let originData: Record[];
  try {
    data = fs.readFileSync("db/data.json", "utf8");
  } catch (error) {
    console.error(error)
    return {
      message: "データベースであるJSONファイルを開けませんでした。",
    };
  }
  try {
    originData = JSON.parse(data) as Record[];
  } catch (error) {
    console.error(error)
    return {
      message: "データベースであるJSONをパースできませんでした。",
    };
  }

  if (!Array.isArray(originData)) {
    return {
      message: "データベースであるJSONオブジェクトが形式的に壊れています。",
    };
  }

  return originData;
};
