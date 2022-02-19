/**
 * 削除APIへ削除したいレコードを飛ばします。
 * @param record {{id: number, color:string, seed: number, lines:number, segments: number}}
 * @return {Promise<void>}
 */
export async function apiRemove(record) {
  await fetch("http://localhost:8080/remove", {
    headers: {
      "Content-Type": "application/json",
    },
    method: "POST",
    body: JSON.stringify(record), // Object はJSON文字列化して指定
  });
}
