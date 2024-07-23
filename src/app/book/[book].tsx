import { View } from "react-native";
import { useLocalSearchParams } from "expo-router";
import FormeBook from "@/components/book/FormBook";

export default function Book() {
  const { book } = useLocalSearchParams();

  const initialBook =
    book && book !== "forme" ? JSON.parse(book as string) : "forme";

  return (
    <View style={{ flex: 1 }}>
      <FormeBook initialBook={initialBook} />
    </View>
  );
}
