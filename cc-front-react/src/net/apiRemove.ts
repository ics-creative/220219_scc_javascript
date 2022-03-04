import { Record } from "../types/Record";

/**
 * 削除APIへ削除したいレコードを飛ばします。
 * @param record
 * @return
 */
export async function apiRemove(record: Record): Promise<void> {
  await fetch("http://localhost:8080/remove", {
    headers: {
      "Content-Type": "application/json",
    },
    method: "POST",
    body: JSON.stringify(record), // Object はJSON文字列化して指定
  });
}
