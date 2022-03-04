import { read } from "./read";
import { write } from "./write";
import {
  isLogicErrorObject,
  LogicErrorObject,
} from "../types/LogicErrorObject";

/**
 * 該当するレコードを削除します。
 * @param recordId レコードID
 */
export const remove = (recordId: number): void | LogicErrorObject => {
  const dataCurrent = read(); // 読み込み

  if (isLogicErrorObject(dataCurrent)) {
    return dataCurrent;
  }

  // 該当する項目を削除（一致するIDはフィルターで省く）
  const dataNext = dataCurrent.filter((item) => item.id !== recordId);
  write(dataNext); // 書き込み
};
