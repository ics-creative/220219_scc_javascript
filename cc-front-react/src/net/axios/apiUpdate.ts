import { Record } from "../../types/Record";
import { AppErrorObject } from "../../types/AppErrorObject";
import axios from "axios";
import { axiosErrorHandler } from "./axiosErrorHandler";

/**
 * 【fetch版】
 * 更新用APIへ更新したいレコードを飛ばします。
 * @param record
 * @return 成功時と失敗時のオブジェクトが返却されます。
 */
export const apiUpdate = async (
  record: Record
): Promise<{ ok: true } | { ok: false; data: AppErrorObject }> => {
  try {
    await axios.post("/update", record);

    // 通信の成功時
    return { ok: true };
  } catch (error) {
    return axiosErrorHandler(error);
  }
};
