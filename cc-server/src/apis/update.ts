import { Record } from "../types/Record";
import { read } from "./read";
import { write } from "./write";

/**
 * レコードを更新します。
 * @param record レコードオブジェクト
 */
export const update = (record: Record): void => {
  const dataCurrent = read(); // 読み込み

  // IDの重複をチェック
  const duplicateRecord = dataCurrent.find((item) => item.id === record.id);
  if (duplicateRecord) {
    // 重複する項目の各フィールドをコピー
    Object.assign(duplicateRecord, record);
  }

  write(dataCurrent); // 書き込み
};
