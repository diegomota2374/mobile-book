import { TouchableOpacity, StyleSheet } from "react-native";
import { AntDesign } from "@expo/vector-icons";

interface FloatingButtonProps {
  onPress: () => void;
}

export default function FloatingButton({ onPress }: FloatingButtonProps) {
  return (
    <TouchableOpacity
      style={styles.floatingButton}
      onPress={onPress}
      testID="floating-button"
    >
      <AntDesign name="pluscircle" size={40} color="#6AB7E2" />
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  floatingButton: {
    position: "absolute",
    bottom: 20,
    right: 20,
    backgroundColor: "#132026",
    borderRadius: 50,
    padding: 10,
  },
});
