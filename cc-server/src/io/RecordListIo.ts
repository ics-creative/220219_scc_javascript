import * as t from "io-ts";
import { RecordIo } from "./RecordIo";

/**
 * レコード配列のバリデーション機能を提供します。
 * io-ts モジュールの機能でバリデーションを行います。
 */
export const RecordListIo = t.array(RecordIo);
