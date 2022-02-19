/**
 * APIからデータを取得します。
 * @return {Promise<{id: number, color:string, seed: number, lines:number, segments: number}[]>}
 */
export const apiRead = async () => {
  const data = await fetch("http://localhost:8080/read");
  const records = await data.json();
  return records;
};
