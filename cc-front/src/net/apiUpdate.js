/**
 * 更新用APIへ更新したいレコードを飛ばします。
 * @param record {{id: number, color:string, seed: number, lines:number, segments: number}}
 * @return {Promise<void>}
 */
export const apiUpdate = async (record) => {
  await fetch("http://localhost:8080/update", {
    headers: {
      "Content-Type": "application/json",
    },
    method: "POST",
    body: JSON.stringify(record), // Object はJSON文字列化して指定
  });
};
