import { LogicErrorObjectIo } from "../io/LogicErrorObjectIo";

/**
 * エラーとして扱うオブジェクトです。
 */
export interface LogicErrorObject {
  message: string;
}

/**
 * エラーオブジェクトであるか判定します。
 * @param o
 */
export const isLogicErrorObject = (o: unknown): o is LogicErrorObject =>
  LogicErrorObjectIo.is(o);
