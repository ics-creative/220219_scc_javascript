import { Record } from "../types/Record";
import { LogicErrorObject } from "../types/LogicErrorObject";

/**
 * 削除APIへ削除したいレコードを飛ばします。
 * @param record
 * @return
 */
export async function apiRemove(
  record: Record
): Promise<{ ok: true } | { ok: false; data: LogicErrorObject }> {
  const result = await fetch("/remove", {
    headers: {
      "Content-Type": "application/json",
    },
    method: "DELETE",
    body: JSON.stringify(record), // Object はJSON文字列化して指定
  });

  if (result.ok) {
    // 通信の成功時
    return { ok: true };
  } else {
    // 通信の失敗時
    const logicErrorObject = (await result.json()) as LogicErrorObject;
    return { ok: false, data: logicErrorObject };
  }
}
