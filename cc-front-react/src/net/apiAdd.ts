import { Record } from "../types/Record";
import { LogicErrorObject } from "../types/LogicErrorObject";

/**
 * 追加用APIへ新規レコードを飛ばします。
 * @param record
 */
export const apiAdd = async (
  record: Record
): Promise<{ ok: true } | { ok: false; data: LogicErrorObject }> => {
  const result = await fetch("/add", {
    headers: {
      "Content-Type": "application/json",
    },
    method: "POST",
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
};
