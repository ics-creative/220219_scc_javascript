import { read } from "./read";
import { write } from "./write";

/**
 * 該当するレコードを削除します。
 * @param recordId レコードID
 */
export const remove = (recordId: number): void => {
  const dataCurrent = read(); // 読み込み
  // 該当する項目を削除（一致するIDはフィルターで省く）
  const dataNext = dataCurrent.filter((item) => item.id !== recordId);
  write(dataNext); // 書き込み
};
