import { Record } from "../../types/Record";
import { AppErrorObject } from "../../types/AppErrorObject";

/**
 * 【fetch版】
 * 削除APIへ削除したいレコードを飛ばします。
 * @param record
 * @return 成功時と失敗時のオブジェクトが返却されます。
 */
export async function apiRemove(
  record: Record
): Promise<{ ok: true } | { ok: false; data: AppErrorObject }> {
  const result = await fetch("/remove", {
    headers: {
      "Content-Type": "application/json",
    },
    method: "POST",
    body: JSON.stringify(record), // Object はJSON文字列化して指定
  }).catch((reason) => {
    // ネットワークエラーのハンドリング
    console.error(reason);
    return undefined;
  });

  if (result) {
    if (result.ok) {
      // 通信の成功時
      return { ok: true };
    } else {
      // 通信の失敗時
      const logicErrorObject = (await result.json()) as AppErrorObject;
      return { ok: false, data: logicErrorObject };
    }
  } else {
    // ネットワークエラー
    return { ok: false, data: { message: "ネットワークエラーが起きました。" } };
  }
}
