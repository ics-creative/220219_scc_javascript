import { Record } from "../types/Record";
import { read } from "./read";
import { write } from "./write";
import { AppErrorObject } from "../types/AppErrorObject";
import { RecordIo } from "../io/RecordIo";
import { isAppErrorObject } from "../io/IsAppErrorObject";

/**
 * レコードを追加します。
 * @param record レコードオブジェクト
 */
export const add = (record: Record): void | AppErrorObject => {
  // 引数のバリデーション
  const isValid = RecordIo.is(record);
  if (!isValid) {
    return { message: "APIのパラメーターの型が誤っています。" };
  }

  const dataCurrent = read(); // 読み込み

  if (isAppErrorObject(dataCurrent)) {
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
