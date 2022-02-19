/**
 * 追加用APIへ新規レコードを飛ばします。
 * @param record {{id: number, color:string, seed: number, lines:number, segments: number}}
 * @return {Promise<void>}
 */
export const apiAdd = async (record) => {
  await fetch("http://localhost:8080/add", {
    headers: {
      "Content-Type": "application/json",
    },
    method: "POST",
    body: JSON.stringify(record), // Object はJSON文字列化して指定
  });
};
