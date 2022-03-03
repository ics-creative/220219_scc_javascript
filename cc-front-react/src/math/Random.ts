/**
 * 再現可能な乱数を生成するクラスです。
 * XofShift という手法を使っています。
 * （このクラスは本題ではないので、スルーください）
 */
export class Random {
  private x:number
  private y:number
  private z:number
  private w:number

  constructor(seed = 88675123) {
    this.x = 123456789;
    this.y = 362436069;
    this.z = 521288629;
    this.w = seed;
  }

  /**
   * 乱数を取得します。
   * @return {number}
   */
  next() {
    const t = this.x ^ (this.x << 11);
    this.x = this.y;
    this.y = this.z;
    this.z = this.w;
    return (this.w = this.w ^ (this.w >>> 19) ^ (t ^ (t >>> 8)));
  }
}
