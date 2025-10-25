import { useEffect, useState } from "react";
import { View, Text, FlatList, Switch, Pressable, Alert } from "react-native";
import { Link, useFocusEffect } from "expo-router";
import { CartItemView } from "../src/models/types";
import { clearCart, getCartSummary } from "../src/db/cart.repo";
// (Bonus) import { reduceStock } from "../src/db/product.repo";

export default function InvoiceScreen() {
  const [items, setItems] = useState<CartItemView[]>([]);
  const [subtotal, setSubtotal] = useState(0);
  const [vatEnabled, setVatEnabled] = useState(true); // tuỳ chọn
  const VAT = 0.10;

  async function reload() {
    const s = await getCartSummary();
    setItems(s.items);
    setSubtotal(s.subtotal);
  }

  useFocusEffect(() => {
    reload();
    return () => {};
  });

  const vat = vatEnabled ? subtotal * VAT : 0;
  const total = subtotal + vat;
  const nowStr = new Date().toLocaleString("vi-VN");

  async function onCheckout() {
    if (items.length === 0) {
      Alert.alert("Giỏ trống", "Không có gì để thanh toán.");
      return;
    }
    try {
      // (Bonus) cập nhật tồn kho theo từng dòng:
      // for (const it of items) {
      //   await reduceStock(it.product_id, it.qty);
      // }
      await clearCart();
      Alert.alert("Thanh toán", "Đã xử lý đơn hàng (demo). Giỏ đã được xóa.");
      await reload();
    } catch (e: any) {
      Alert.alert("Lỗi thanh toán", e?.message ?? "Không rõ nguyên nhân");
    }
  }

  return (
    <View style={{ flex: 1, padding: 12, gap: 12 }}>
      <View style={{ flexDirection: "row", justifyContent: "space-between", marginBottom: 8 }}>
        <Link href="/cart" style={{ color: "#2563eb" }}>← Về giỏ hàng</Link>
      </View>

      <Text style={{ fontSize: 18, fontWeight: "700" }}>Hoá đơn</Text>
      <Text>Thời điểm: {nowStr}</Text>

      <FlatList
        data={items}
        keyExtractor={(it) => String(it.id)}
        ItemSeparatorComponent={() => <View style={{ height: 8 }} />}
        ListEmptyComponent={<Text>Không có dòng hàng.</Text>}
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
            <Text style={{ fontWeight: "600" }}>{item.name}</Text>
            <Text>
              SL: {item.qty} × {Intl.NumberFormat("vi-VN").format(item.price)} đ
            </Text>
            <Text style={{ fontWeight: "600" }}>
              Thành tiền: {Intl.NumberFormat("vi-VN").format(item.lineTotal)} đ
            </Text>
          </View>
        )}
      />

      <View style={{ padding: 12, borderTopWidth: 1, borderColor: "#e5e7eb", gap: 8 }}>
        <View style={{ flexDirection: "row", alignItems: "center", gap: 8 }}>
          <Switch value={vatEnabled} onValueChange={setVatEnabled} />
          <Text>Bật VAT 10%</Text>
        </View>
        <Text>Tạm tính: {Intl.NumberFormat("vi-VN").format(subtotal)} đ</Text>
        <Text>VAT: {Intl.NumberFormat("vi-VN").format(vat)} đ</Text>
        <Text style={{ fontSize: 16, fontWeight: "700" }}>
          Tổng cộng: {Intl.NumberFormat("vi-VN").format(total)} đ
        </Text>

        <Pressable
          onPress={onCheckout}
          style={{
            marginTop: 8,
            paddingVertical: 12,
            borderRadius: 10,
            alignItems: "center",
            backgroundColor: "#2563eb",
          }}
        >
          <Text style={{ color: "white", fontWeight: "700" }}>Thanh toán (demo)</Text>
        </Pressable>
      </View>
    </View>
  );
}
