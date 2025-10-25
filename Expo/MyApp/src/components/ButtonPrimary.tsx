import { TouchableOpacity, Text, StyleSheet, GestureResponderEvent } from "react-native";
import React from "react";

export default function ButtonPrimary({
  label,
  onPress,
}: { label: string; onPress: (e: GestureResponderEvent) => void; }) {
  return (
    <TouchableOpacity style={styles.btn} onPress={onPress}>
      <Text style={styles.text}>{label}</Text>
    </TouchableOpacity>
  );
}
const styles = StyleSheet.create({
  btn: { backgroundColor: "#2563eb", paddingVertical: 12, paddingHorizontal: 18, borderRadius: 10, marginVertical: 6 },
  text: { color: "white", fontWeight: "600", fontSize: 16, textAlign: "center" },
});
