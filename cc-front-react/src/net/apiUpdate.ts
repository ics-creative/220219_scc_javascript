import { Record } from "../types/Record";

/**
 * 更新用APIへ更新したいレコードを飛ばします。
 * @param record
 * @return
 */
export const apiUpdate = async (record: Record): Promise<void> => {
  await fetch("http://localhost:8080/update", {
    headers: {
      "Content-Type": "application/json",
    },
    method: "POST",
    body: JSON.stringify(record), // Object はJSON文字列化して指定
  });
};
