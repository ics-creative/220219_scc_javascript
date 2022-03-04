export interface Record {
  id: number;
  color: string;
  seed: number;
  lines: number;
  segments: number;
}

export const isRecordList = (object: unknown): object is Record[] => {
  return Array.isArray(object);
};
