import TableBook from "@/src/components/book/TableBook";
import { StyleSheet, Text, View } from "react-native";
import { constants } from "@/src/constants";

export default function Home() {
  return (
    <View style={styles.container}>
      <TableBook />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    display: "flex",
    justifyContent: "center",
    flex: 1,
    backgroundColor: constants.colors.black,
    paddingVertical: 30,
    paddingHorizontal: 30,
  },
});