import { Record } from "../types/Record";
import { read } from "./read";
import { write } from "./write";
import {
  isLogicErrorObject,
  LogicErrorObject,
} from "../types/LogicErrorObject";
import { RecordIo } from "../io/RecordIo";

/**
 * レコードを更新します。
 * @param record レコードオブジェクト
 */
export const update = (record: Record): void | LogicErrorObject => {
  if (!RecordIo.is(record)) {
    return { message: "APIの引数の型が誤っています。" };
  }

  const dataCurrent = read(); // 読み込み

  if (isLogicErrorObject(dataCurrent)) {
    return dataCurrent;
  }

  // IDの重複をチェック
  const duplicateRecord = dataCurrent.find((item) => item.id === record.id);
  if (duplicateRecord) {
    // 重複する項目の各フィールドをコピー
    Object.assign(duplicateRecord, record);
  }

  const result = write(dataCurrent); // 書き込み
  if (isLogicErrorObject(result)) {
    return result;
  }
};
