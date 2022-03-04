import * as t from "io-ts";

/**
 * レコードのバリデーション機能を提供します。
 * io-ts モジュールの機能でバリデーションを行います。
 */
export const RecordIo = t.type({
  id: t.number,
  color: t.string,
  seed: t.number,
  lines: t.number,
  segments: t.number,
});
