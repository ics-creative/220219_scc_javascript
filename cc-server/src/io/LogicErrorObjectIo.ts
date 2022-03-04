import * as t from "io-ts";

/**
 * エラーメッセージのバリデーション機能を提供します。
 * io-ts モジュールの機能でバリデーションを行います。
 */
export const LogicErrorObjectIo = t.type({
  message: t.string,
});
