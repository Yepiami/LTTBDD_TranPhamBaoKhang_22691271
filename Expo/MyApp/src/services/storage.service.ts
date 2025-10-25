import AsyncStorage from "@react-native-async-storage/async-storage";
import { STORAGE_KEY } from "../constants/paths";
import { SavedImage } from "../types/saved-image.type";

export async function loadSavedList(): Promise<SavedImage[]> {
  const raw = await AsyncStorage.getItem(STORAGE_KEY);
  return raw ? JSON.parse(raw) : [];
}

export async function saveSavedList(list: SavedImage[]) {
  await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(list));
}
