import { View } from "react-native";
import { useLocalSearchParams } from "expo-router";
import FormBook from "@/src/components/book/FormBook";

export default function Book() {
  const { book } = useLocalSearchParams();

  const initialBook =
    book && book !== "forme" ? JSON.parse(book as string) : "forme";

  return (
    <View style={{ flex: 1 }}>
      <FormBook initialBook={initialBook} />
    </View>
  );
}
