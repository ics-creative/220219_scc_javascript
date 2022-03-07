import { Record } from "../types/Record";
import { LogicErrorObject } from "../types/LogicErrorObject";

/**
 * APIからデータを取得します。
 * @return
 */
export const apiRead = async (): Promise<
  { ok: true; data: Record[] } | { ok: false; data: LogicErrorObject }
> => {
  const result = await fetch("/read");

  if (result.ok) {
    // 通信の成功時
    const records = (await result.json()) as Record[];
    return { ok: true, data: records };
  } else {
    // 通信の失敗時
    const logicErrorObject = (await result.json()) as LogicErrorObject;
    return { ok: false, data: logicErrorObject };
  }
};
