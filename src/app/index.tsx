import TableBook from "@/src/components/book/TableBook";
import { StyleSheet, View } from "react-native";

export default function Home() {
  return (
    <View style={styles.container}>
      <TableBook />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
