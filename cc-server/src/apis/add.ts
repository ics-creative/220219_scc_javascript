import { Record } from "../types/Record";
import { read } from "./read";
import { write } from "./write";
import {
  isLogicErrorObject,
  LogicErrorObject,
} from "../types/LogicErrorObject";

/**
 * レコードを追加します。
 * @param record レコードオブジェクト
 */
export const add = (record: Record): void | LogicErrorObject => {
  const dataCurrent = read(); // 読み込み

  if (isLogicErrorObject(dataCurrent)) {
    return dataCurrent;
  }

  // IDの重複をチェック
  const duplicateRecord = dataCurrent.find((item) => item.id === record.id);
  if (duplicateRecord) {
    return { message: "重複するデータがあったので無視します。" };
  }

  // データの末尾に新しいレコードを追加
  const dataNext = [...dataCurrent, record];
  write(dataNext); // 書き込み
};
