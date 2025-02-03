import { Link } from "expo-router";
import { Text, View } from "react-native";

export default function Page() {
  return (
    <View className="flex-1 items-center justify-center bg-black ">
      <Text className="color-slate-50 text-3xl font-pblack">Hello</Text>
      <Link href="home" style={{ color: "blue" }}>
        Home
      </Link>
    </View>
  );
}
