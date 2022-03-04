import { Record } from "../types/Record";

/**
 * APIからデータを取得します。
 * @return
 */

export const apiRead = async (): Promise<Record[]> => {
  const data = await fetch("http://localhost:8080/read");
  const records = (await data.json()) as Record[];
  return records;
};
