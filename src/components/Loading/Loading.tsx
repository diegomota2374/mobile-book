import { View, ActivityIndicator, StyleSheet, Text } from "react-native";

export default function Loading() {
  return (
    <View style={styles.container}>
      <ActivityIndicator
        testID="activity-indicator"
        size="large"
        color="#6AB7E2"
      />
      <Text style={styles.loadingText}>Carregando...</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#132026",
  },
  loadingText: {
    marginTop: 10,
    fontSize: 16,
    color: "#fff",
  },
});
