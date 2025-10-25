// app/index.tsx
import { useEffect, useState } from "react";
import { View, Text, FlatList, Pressable, Alert, ActivityIndicator } from "react-native";
import { Link } from "expo-router";
import { Product } from "../src/models/types";
import { getAllProducts } from "../src/db/product.repo";
import { addToCart } from "../src/db/cart.repo";
import { initDb } from "../src/db/db";

export default function ProductScreen() {
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState<Product[]>([]);

  async function reload() {
    const rs = await getAllProducts();
    setData(rs);
  }

  useEffect(() => {
    (async () => {
      await initDb();       // ⬅️ đảm bảo DB tạo & seed xong
      await reload();       // ⬅️ rồi mới query
      setLoading(false);
    })();
  }, []);

  async function onAdd(product_id: string) {
    try {
      await addToCart(product_id);
      Alert.alert("Thành công", "Đã thêm vào giỏ");
    } catch (e: any) {
      Alert.alert("Không thể thêm", e?.message ?? "Lỗi không rõ");
    }
  }

  if (loading) return <ActivityIndicator style={{ marginTop: 24 }} />;

  return (
    <View style={{ flex: 1, padding: 12, gap: 12 }}>
      <View style={{ flexDirection: "row", justifyContent: "space-between", marginBottom: 8 }}>
        <Text style={{ fontSize: 18, fontWeight: "600" }}>Danh sách sản phẩm</Text>
        <Link href="/cart" style={{ color: "#2563eb", fontWeight: "600" }}>
          Xem giỏ →
        </Link>
      </View>

      <FlatList
        data={data}
        keyExtractor={(it) => it.product_id}
        ItemSeparatorComponent={() => <View style={{ height: 8 }} />}
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
            <Text style={{ marginTop: 4 }}>{Intl.NumberFormat("vi-VN").format(item.price)} đ</Text>
            <Text style={{ marginTop: 2, color: "#6b7280" }}>Tồn: {item.stock}</Text>

            <Pressable
              onPress={() => onAdd(item.product_id)}
              style={{
                marginTop: 8,
                paddingVertical: 10,
                borderRadius: 10,
                alignItems: "center",
                backgroundColor: "#16a34a",
              }}
            >
              <Text style={{ color: "white", fontWeight: "700" }}>Thêm vào giỏ</Text>
            </Pressable>
          </View>
        )}
      />
    </View>
  );
}
