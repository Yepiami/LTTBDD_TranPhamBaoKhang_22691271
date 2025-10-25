export type SavedKind = "original" | "edited";

export interface SavedImage {
  uri: string;        // đường dẫn file trong app
  time: number;       // timestamp lưu
  kind: SavedKind;    // original | edited
  from?: string|null; // nếu là edited: lưu uri gốc để biết nguồn
}
