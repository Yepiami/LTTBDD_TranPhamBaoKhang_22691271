import React, { useEffect, useState, useCallback } from "react";
import {
  View, Text, StyleSheet, ScrollView, Image, ActivityIndicator,
  FlatList, TouchableOpacity, Alert, Dimensions,
} from "react-native";
import ButtonPrimary from "./src/components/ButtonPrimary";
import ToolbarEditActions from "./src/components/ToolBarEditAction";
import ImagePreviewModal from "./src/components/ImagePreviewModal";
import { pickImage } from "./src/services/imagePicker.service";
import { rotate, flipH, flipV } from "./src/services/imageEdit.service";
import { ensureEditedDir, saveFile, deleteFileSafe } from "./src/services/fileStorage.service";
import { loadSavedList, saveSavedList } from "./src/services/storage.service";
import { SavedImage } from "./src/types/saved-image.type";

const W = Dimensions.get("window").width;

export default function App() {
  const [originalUri, setOriginalUri] = useState<string | null>(null);
  const [workingUri, setWorkingUri] = useState<string | null>(null);
  const [list, setList] = useState<SavedImage[]>([]);
  const [loading, setLoading] = useState(false);
  const [previewOpen, setPreviewOpen] = useState(false);
  const [previewUri, setPreviewUri] = useState<string | null>(null);

  useEffect(() => {
    (async () => {
      await ensureEditedDir();
      const saved = await loadSavedList();
      setList(saved);
    })();
  }, []);

  const onPickImage = useCallback(async () => {
    const uri = await pickImage();
    if (uri) {
      setOriginalUri(uri);
      setWorkingUri(uri);
    }
  }, []);

  // thao tác chỉnh
  const onRotateLeft  = () => workingUri && rotate(workingUri, -90).then(r => setWorkingUri(r.uri));
  const onRotateRight = () => workingUri && rotate(workingUri,  90).then(r => setWorkingUri(r.uri));
  const onFlipH_      = () => workingUri && flipH(workingUri).then(r => setWorkingUri(r.uri));
  const onFlipV_      = () => workingUri && flipV(workingUri).then(r => setWorkingUri(r.uri));

  // lưu cả 2: original + edited
  const onSaveBoth = useCallback(async () => {
    if (!originalUri || !workingUri) return;
    setLoading(true);
    try {
      const savedOriginal = await saveFile(originalUri, "original");
      const savedEdited   = await saveFile(workingUri, "edited");

      const now = Date.now();
      const entries: SavedImage[] = [
        { uri: savedOriginal, time: now, kind: "original", from: null },
        { uri: savedEdited,   time: now, kind: "edited",   from: savedOriginal },
      ];
      const newList = [...entries, ...list];
      setList(newList);
      await saveSavedList(newList);

      Alert.alert("Đã lưu", "Đã lưu ảnh gốc và ảnh đã chỉnh vào ứng dụng.");
    } catch {
      Alert.alert("Lỗi", "Không thể lưu ảnh.");
    } finally {
      setLoading(false);
    }
  }, [originalUri, workingUri, list]);

  const onDeleteItem = useCallback(async (item: SavedImage) => {
    await deleteFileSafe(item.uri);
    const newList = list.filter(x => x.uri !== item.uri);
    setList(newList);
    await saveSavedList(newList);
  }, [list]);

  const openPreview = (uri: string) => { setPreviewUri(uri); setPreviewOpen(true); };

  const renderItem = ({ item }: { item: SavedImage }) => (
    <View style={styles.card}>
      <TouchableOpacity onPress={() => openPreview(item.uri)}>
        <Image source={{ uri: item.uri }} style={styles.cardImage} />
      </TouchableOpacity>
      <View style={{ flex: 1 }}>
        <Text style={styles.cardText}>
          {item.kind === "edited" ? "Ảnh đã chỉnh" : "Ảnh gốc"} • {new Date(item.time).toLocaleString()}
        </Text>
        {item.kind === "edited" && !!item.from && (
          <Text style={[styles.cardText, { opacity: 0.7 }]}>Từ: (bản gốc) {item.from}</Text>
        )}
        <View style={{ flexDirection: "row", gap: 8, marginTop: 6 }}>
          <TouchableOpacity style={styles.smallBtn} onPress={() => openPreview(item.uri)}>
            <Text style={styles.smallBtnText}>Xem</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.smallBtnDanger} onPress={() => onDeleteItem(item)}>
            <Text style={styles.smallBtnText}>Xoá</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );

  return (
    <ScrollView style={styles.container} contentContainerStyle={{ paddingBottom: 36 }}>
      <Text style={styles.title}>Image Editor (Expo • Dark)</Text>

      {/* 1) Chọn ảnh */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>1) Mở ảnh từ thư viện</Text>
        {!originalUri ? (
          <>
            <Text style={styles.dim}>Chưa có ảnh nào. Nhấn nút dưới để chọn ảnh từ điện thoại.</Text>
            <ButtonPrimary label="Chọn ảnh" onPress={onPickImage} />
          </>
        ) : (
          <ButtonPrimary label="Chọn ảnh khác" onPress={onPickImage} />
        )}
      </View>

      {/* 2) Chỉnh sửa ảnh */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>2) Chỉnh sửa ảnh</Text>

        {originalUri ? (
          <>
            <Text style={styles.note}>Ảnh gốc:</Text>
            <Image source={{ uri: originalUri }} style={styles.image} />

            {workingUri && (
              <>
                <Text style={styles.note}>Ảnh đang chỉnh:</Text>
                <Image source={{ uri: workingUri }} style={styles.image} />
                {loading && <ActivityIndicator style={{ marginTop: 8 }} />}

                <View style={{ marginTop: 12 }}>
                  <ToolbarEditActions
                    onRotateLeft={onRotateLeft}
                    onRotateRight={onRotateRight}
                    onFlipH={onFlipH_}
                    onFlipV={onFlipV_}
                  />
                </View>

                <View style={{ flexDirection: "row", gap: 12, marginTop: 12 }}>
                  <ButtonPrimary label="Lưu (gốc + đã chỉnh)" onPress={onSaveBoth} />
                </View>
              </>
            )}
          </>
        ) : (
          <Text style={styles.dim}>Chưa chọn ảnh.</Text>
        )}
      </View>

      {/* 3) Danh sách ảnh đã lưu */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>3) Danh sách ảnh đã lưu</Text>
        {list.length === 0 ? (
          <Text style={styles.dim}>Chưa có ảnh nào được lưu.</Text>
        ) : (
          <FlatList
            data={list}
            keyExtractor={(item) => item.uri}
            renderItem={renderItem}
            scrollEnabled={false}
            ItemSeparatorComponent={() => <View style={{ height: 10 }} />}
          />
        )}
      </View>

      {/* Modal xem ảnh */}
      <ImagePreviewModal visible={previewOpen} uri={previewUri} onClose={() => setPreviewOpen(false)} />
    </ScrollView>
  );
}

/* ---------- Styles (Dark) ---------- */
const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#0b0e13", paddingHorizontal: 16 },
  title: { color: "white", fontSize: 22, fontWeight: "700", marginTop: 16, marginBottom: 8, textAlign: "center" },
  section: {
    backgroundColor: "#121722", borderRadius: 16, padding: 16, marginTop: 16, borderWidth: 1, borderColor: "#1f2a3a",
  },
  sectionTitle: { color: "white", fontSize: 18, fontWeight: "700", marginBottom: 10 },
  note: { color: "#a6b3c4", marginTop: 10, marginBottom: 6 },
  dim: { color: "#7b8794" },
  image: { width: W - 64, height: (W - 64) * 0.75, borderRadius: 12, alignSelf: "center", backgroundColor: "#0e131b" },
  card: { flexDirection: "row", gap: 12, backgroundColor: "#0e131b", padding: 10, borderRadius: 12, borderWidth: 1, borderColor: "#1f2a3a" },
  cardImage: { width: 80, height: 80, borderRadius: 10, backgroundColor: "#111827" },
  cardText: { color: "#cbd5e1" },
  smallBtn: { backgroundColor: "#1f2937", paddingVertical: 8, paddingHorizontal: 10, borderRadius: 10 },
  smallBtnDanger: { backgroundColor: "#7f1d1d", paddingVertical: 8, paddingHorizontal: 10, borderRadius: 10 },
  smallBtnText: { color: "white", fontWeight: "600", fontSize: 13 },
});
