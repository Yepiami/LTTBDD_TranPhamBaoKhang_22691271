import React from "react";
import { Modal, View, Image, StyleSheet, TouchableOpacity, Text } from "react-native";

export default function ImagePreviewModal({
  visible, uri, onClose,
}: { visible: boolean; uri: string | null; onClose: () => void; }) {
  if (!uri) return null;
  return (
    <Modal visible={visible} transparent animationType="fade">
      <View style={styles.overlay}>
        <View style={styles.box}>
          <Image source={{ uri }} style={styles.img} resizeMode="contain" />
          <TouchableOpacity onPress={onClose} style={styles.btn}>
            <Text style={styles.btnText}>Đóng</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
}
const styles = StyleSheet.create({
  overlay: { flex: 1, backgroundColor: "rgba(0,0,0,0.85)", justifyContent: "center", alignItems: "center" },
  box: { width: "90%", height: "80%", justifyContent: "center", alignItems: "center" },
  img: { width: "100%", height: "85%", borderRadius: 10 },
  btn: { marginTop: 15, backgroundColor: "#2563eb", paddingVertical: 10, paddingHorizontal: 20, borderRadius: 8 },
  btnText: { color: "#fff", fontWeight: "600" },
});
