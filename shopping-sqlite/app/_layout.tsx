import { Stack } from "expo-router";
import { useEffect } from "react";
import { initDb } from "../src/db/db";

// app/_layout.tsx (RootLayout)


export default function RootLayout() {
  return (
    <Stack screenOptions={{ headerTitleAlign: "center" }}>
      <Stack.Screen name="index" options={{ title: "Sản phẩm" }} />
      <Stack.Screen name="cart" options={{ title: "Giỏ hàng" }} />
      <Stack.Screen name="invoice" options={{ title: "Hoá đơn" }} />
    </Stack>
  );
}

