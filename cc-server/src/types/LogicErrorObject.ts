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
export const isLogicErrorObject = (o: unknown): o is LogicErrorObject => {
  if (o == null) {
    return false;
  }
  if (typeof o !== "object") {
    return false;
  }

  return Object.hasOwn(o, "message");
};
