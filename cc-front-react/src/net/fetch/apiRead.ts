import { Record } from "../../types/Record";
import { AppErrorObject } from "../../types/AppErrorObject";

/**
 * 【fetch版】
 * APIからデータを取得します。
 * @return 成功時と失敗時のオブジェクトが返却されます。
 */
export const apiRead = async (): Promise<
  { ok: true; data: Record[] } | { ok: false; data: AppErrorObject }
> => {
  const result = await fetch("/read").catch((reason) => {
    // ネットワークエラーのハンドリング
    console.error(reason);
    return undefined;
  });

  if (result) {
    if (result.ok) {
      // 通信の成功時
      const records = (await result.json()) as Record[];
      return { ok: true, data: records };
    } else {
      // 通信の失敗時
      const logicErrorObject = (await result.json()) as AppErrorObject;
      return { ok: false, data: logicErrorObject };
    }
  } else {
    // ネットワークエラー
    return { ok: false, data: { message: "ネットワークエラーが起きました。" } };
  }
};
