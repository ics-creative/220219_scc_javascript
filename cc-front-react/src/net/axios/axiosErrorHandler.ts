import axios from "axios";
import { AppErrorObject } from "../../types/AppErrorObject";

export const axiosErrorHandler = (
  error: unknown
): { ok: false; data: AppErrorObject } => {
  // Axiosのエラーであるか判定
  if (axios.isAxiosError(error)) {
    console.error(error.toJSON());
    if (error.response) {
      // ステータスコードを判定する
      switch (error.response.status) {
        case 400:
          // 通信の失敗時
          const appErrorObject = error.response.data as AppErrorObject;
          return { ok: false, data: appErrorObject };
        default:
          // インフラ系のエラー
          return { ok: false, data: { message: error.message } };
      }
    } else {
      // ネットワークエラー
      // タイムアウトを設定していた場合、ここに分岐が入る
      return { ok: false, data: { message: error.message } };
    }
  } else {
    // 予期しないエラー（axiosとは違う次元で起きたエラーなど）
    return { ok: false, data: { message: "予期しないエラーが起きました。" } };
  }
};
