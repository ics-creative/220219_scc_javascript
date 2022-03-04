import { Record } from "../types/Record";

/**
 * 追加用APIへ新規レコードを飛ばします。
 * @param record
 */
export const apiAdd = async (record: Record): Promise<void> => {
  await fetch("http://localhost:8080/add", {
    headers: {
      "Content-Type": "application/json",
    },
    method: "POST",
    body: JSON.stringify(record), // Object はJSON文字列化して指定
  });
};
