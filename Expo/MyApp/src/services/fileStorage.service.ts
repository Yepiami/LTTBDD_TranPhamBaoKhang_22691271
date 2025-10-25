import * as FileSystem from "expo-file-system/legacy";
import { EDITED_DIR } from "../constants/paths";

export async function ensureEditedDir() {
  const info = await FileSystem.getInfoAsync(EDITED_DIR);
  if (!info.exists) {
    await FileSystem.makeDirectoryAsync(EDITED_DIR, { intermediates: true });
  }
}

export async function saveFile(tempUri: string, prefix: string): Promise<string> {
  await ensureEditedDir();
  const fileName = `${prefix}_${Date.now()}.jpg`;
  const dest = EDITED_DIR + fileName;
  await FileSystem.copyAsync({ from: tempUri, to: dest });
  return dest; // uri mới
}

export async function deleteFileSafe(uri: string) {
  try {
    await FileSystem.deleteAsync(uri, { idempotent: true });
  } catch { /* ignore */ }
}
