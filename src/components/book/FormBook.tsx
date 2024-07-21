import { constants } from "@/src/constants";
import { StyleSheet, Text, View } from "react-native";

export default function FormBook() {
  return (
    <View>
      <View>
        <Text style={styles.title}>FormBook</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  title: {
    color: constants.colors.black,
    fontSize: 16,
  },
});
