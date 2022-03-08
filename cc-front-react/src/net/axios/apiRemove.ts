import { Record } from "../../types/Record";
import { AppErrorObject } from "../../types/AppErrorObject";
import axios from "axios";
import { axiosErrorHandler } from "./axiosErrorHandler";

/**
 * 【fetch版】
 * 削除APIへ削除したいレコードを飛ばします。
 * @param record
 * @return 成功時と失敗時のオブジェクトが返却されます。
 */
export async function apiRemove(
  record: Record
): Promise<{ ok: true } | { ok: false; data: AppErrorObject }> {
  try {
    await axios.post("/remove", record);

    // 通信の成功時
    return { ok: true };
  } catch (error) {
    return axiosErrorHandler(error);
  }
}
