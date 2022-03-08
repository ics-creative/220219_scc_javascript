import { Record } from "../../types/Record";
import { AppErrorObject } from "../../types/AppErrorObject";
import axios from "axios";
import { axiosErrorHandler } from "./axiosErrorHandler";

/**
 * 【fetch版】
 * 追加用APIへ新規レコードを飛ばします。
 * @param record
 * @return 成功時と失敗時のオブジェクトが返却されます。
 */
export const apiAdd = async (
  record: Record
): Promise<{ ok: true } | { ok: false; data: AppErrorObject }> => {
  try {
    await axios.post("/api/add", record);

    // 通信の成功時
    return { ok: true };
  } catch (error) {
    return axiosErrorHandler(error);
  }
};
