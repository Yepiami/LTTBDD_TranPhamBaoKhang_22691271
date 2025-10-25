import { useEffect, useState } from "react";
import { View, Text, FlatList, Pressable, Alert } from "react-native";
import { Link, useFocusEffect } from "expo-router";
import { CartItemView } from "../src/models/types";
import { getCartSummary, removeCartItem, updateCartQtyById } from "../src/db/cart.repo";

type Summary = { items: CartItemView[]; subtotal: number };

export default function CartScreen() {
  const [summary, setSummary] = useState<Summary>({ items: [], subtotal: 0 });

  async function reload() {
    const s = await getCartSummary();
    setSummary(s);
  }

  useFocusEffect(() => {
    reload();
    return () => {};
  });

  async function changeQty(id: number, delta: number) {
    const item = summary.items.find((x) => x.id === id);
    if (!item) return;
    try {
      const next = item.qty + delta;
      await updateCartQtyById(id, next);
      await reload();
    } catch (e: any) {
      Alert.alert("Không thể cập nhật", e?.message ?? "Lỗi không rõ");
    }
  }

  async function removeLine(id: number) {
    await removeCartItem(id);
    await reload();
  }

  return (
    <View style={{ flex: 1, padding: 12, gap: 12 }}>
      <View style={{ flexDirection: "row", justifyContent: "space-between", marginBottom: 8 }}>
        <Link href="/" style={{ color: "#2563eb" }}>← Tiếp tục mua</Link>
        <Link href="/invoice" style={{ color: "#2563eb", fontWeight: "600" }}>
          Xem hoá đơn →
        </Link>
      </View>

      <FlatList
        data={summary.items}
        keyExtractor={(it) => String(it.id)}
        ItemSeparatorComponent={() => <View style={{ height: 8 }} />}
        ListEmptyComponent={<Text>Giỏ hàng trống.</Text>}
        renderItem={({ item }) => (
          <View
            style={{
              padding: 12,
              borderWidth: 1,
              borderColor: "#e5e7eb",
              borderRadius: 12,
              backgroundColor: "white",
            }}
          >
            <Text style={{ fontSize: 16, fontWeight: "600" }}>{item.name}</Text>
            <Text style={{ marginTop: 4 }}>
              Giá: {Intl.NumberFormat("vi-VN").format(item.price)} đ · Tồn: {item.stock}
            </Text>

            <View style={{ flexDirection: "row", alignItems: "center", marginTop: 8, gap: 8 }}>
              <Pressable
                onPress={() => changeQty(item.id, -1)}
                style={{ paddingHorizontal: 12, paddingVertical: 6, borderWidth: 1, borderRadius: 8 }}
              >
                <Text>-</Text>
              </Pressable>
              <Text style={{ minWidth: 24, textAlign: "center" }}>{item.qty}</Text>
              <Pressable
                onPress={() => changeQty(item.id, +1)}
                style={{ paddingHorizontal: 12, paddingVertical: 6, borderWidth: 1, borderRadius: 8 }}
              >
                <Text>+</Text>
              </Pressable>

              <View style={{ flex: 1 }} />
              <Pressable
                onPress={() => removeLine(item.id)}
                style={{ paddingHorizontal: 12, paddingVertical: 6, borderWidth: 1, borderRadius: 8 }}
              >
                <Text>Xóa</Text>
              </Pressable>
            </View>

            <Text style={{ marginTop: 6, fontWeight: "600" }}>
              Thành tiền: {Intl.NumberFormat("vi-VN").format(item.lineTotal)} đ
            </Text>
          </View>
        )}
      />

      <View style={{ marginTop: 8, padding: 12, borderTopWidth: 1, borderColor: "#e5e7eb" }}>
        <Text style={{ fontSize: 16, fontWeight: "700" }}>
          Tạm tính: {Intl.NumberFormat("vi-VN").format(summary.subtotal)} đ
        </Text>
      </View>
    </View>
  );
}
