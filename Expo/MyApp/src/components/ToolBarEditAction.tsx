import { View, StyleSheet } from "react-native";
import React from "react";
import ButtonPrimary from "./ButtonPrimary";

export default function ToolbarEditActions({
  onRotateLeft, onRotateRight, onFlipH, onFlipV,
}: {
  onRotateLeft: () => void;
  onRotateRight: () => void;
  onFlipH: () => void;
  onFlipV: () => void;
}) {
  return (
    <View style={styles.container}>
      <ButtonPrimary label="⟲ Xoay trái" onPress={onRotateLeft} />
      <ButtonPrimary label="⟳ Xoay phải" onPress={onRotateRight} />
      <ButtonPrimary label="↔ Lật ngang" onPress={onFlipH} />
      <ButtonPrimary label="↕ Lật dọc" onPress={onFlipV} />
    </View>
  );
}
const styles = StyleSheet.create({ container: { gap: 8, marginVertical: 10 } });
