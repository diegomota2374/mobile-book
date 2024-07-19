import { StyleSheet, Text, View } from "react-native";
import { constants } from "../constants";

export default function Books() {
  return (
    <View style={styles.container}>
      <Text>Books</Text>
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
