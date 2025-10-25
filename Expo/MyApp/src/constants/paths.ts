import * as FileSystem from "expo-file-system";

export const EDITED_DIR =
  ((FileSystem as any).documentDirectory as string) + "edited/";

export const STORAGE_KEY = "@edited_images_list";
