import { Record } from "../../types/Record";
import { AppErrorObject } from "../../types/AppErrorObject";
import axios from "axios";
import { axiosErrorHandler } from "./axiosErrorHandler";

/**
 * 【fetch版】
 * APIからデータを取得します。
 * @return 成功時と失敗時のオブジェクトが返却されます。
 */
export const apiRead = async (): Promise<
  { ok: true; data: Record[] } | { ok: false; data: AppErrorObject }
> => {
  try {
    const result = await axios.get<Record[]>("/api/read");

    // 通信の成功時
    return { ok: true, data: result.data };
  } catch (error) {
    return axiosErrorHandler(error);
  }
};
