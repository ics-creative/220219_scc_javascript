import { Record } from "../types/Record";
import { read } from "./read";
import { write } from "./write";

/**
 * レコードを追加します。
 * @param record レコードオブジェクト
 */
export const add = (record: Record): void => {
  const dataCurrent = read(); // 読み込み

  // IDの重複をチェック
  const duplicateRecord = dataCurrent.find((item) => item.id === record.id);
  if (duplicateRecord) {
    console.error("重複するデータがあったので無視します。");
    return;
  }

  // データの末尾に新しいレコードを追加
  const dataNext = [...dataCurrent, record];
  write(dataNext); // 書き込み
};
