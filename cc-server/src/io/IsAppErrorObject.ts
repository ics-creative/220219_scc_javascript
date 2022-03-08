import { AppErrorObjectIo } from "./AppErrorObjectIo";
import { AppErrorObject } from "../types/AppErrorObject";

/**
 * エラーオブジェクトであるか判定します。
 * @param obj 任意のオブジェクト
 */
export const isAppErrorObject = (obj: unknown): obj is AppErrorObject =>
  AppErrorObjectIo.is(obj);
