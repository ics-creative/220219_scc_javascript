/**
 * プログラミングアートの1項目の情報オブジェクトです。
 */
export interface Record {
  /** ユニークID。数字で管理します。 */
  id: number;
  /** 曲線の色。#FFFFFF のように16進数表記とします。 */
  color: string;
  /** 曲線の種。適当な数値（小数点含む）を入れると、曲線の形状が変わります。 */
  seed: number;
  /** 曲線の数。取り得る値は自然数です。 */
  lines: number;
  /** 曲線の水平方向の分割数。取り得る値は自然数です。 */
  segments: number;
}
