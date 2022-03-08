import { read } from "./read";
import { write } from "./write";
import { AppErrorObject } from "../types/AppErrorObject";
import { isAppErrorObject } from "../io/IsAppErrorObject";

/**
 * 該当するレコードを削除します。
 * @param recordId レコードID
 */
export const remove = (recordId: number): void | AppErrorObject => {
  if (typeof recordId !== "number") {
    return { message: "APIの引数の型が誤っています。" };
  }

  const dataCurrent = read(); // 読み込み

  if (isAppErrorObject(dataCurrent)) {
    return dataCurrent;
  }
  // 該当する項目が存在するか調べる
  const hasItem = dataCurrent.find((item) => item.id === recordId);
  if (!hasItem) {
    return { message: "該当項目はJSONデータベースに存在しませんでした。" };
  }

  // 該当する項目を削除（一致するIDはフィルターで省く）
  const dataNext = dataCurrent.filter((item) => item.id !== recordId);
  const result = write(dataNext); // 書き込み

  if (isAppErrorObject(result)) {
    return result;
  }
};
