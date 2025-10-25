import * as ImagePicker from "expo-image-picker";
import { Alert } from "react-native";

export async function pickImage(): Promise<string | null> {
  try {
    // xin quyền thư viện
    const perm = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (!perm.granted) {
      Alert.alert("Thiếu quyền", "Ứng dụng cần quyền truy cập thư viện ảnh.");
      return null;
    }

    // mở thư viện chọn ảnh
    const res = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      quality: 1,
      allowsEditing: false,
    });

    if (!res.canceled && res.assets && res.assets[0]?.uri) {
      return res.assets[0].uri; // URI của ảnh được chọn
    }

    return null;
  } catch (err) {
    Alert.alert("Lỗi", "Không thể mở thư viện ảnh");
    return null;
  }
}
