import {
  Modal,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  ViewStyle,
  TextStyle,
  Button,
} from "react-native";

interface ConfirmationModalProps {
  visible: boolean;
  onConfirm: () => void;
  onCancel: () => void;
  message: string;
  containerStyle?: ViewStyle;
  textStyle?: TextStyle;
}

const ConfirmationModal = ({
  visible,
  onConfirm,
  onCancel,
  message,
  containerStyle,
  textStyle,
}: ConfirmationModalProps) => {
  return (
    <Modal transparent visible={visible} animationType="slide">
      <View style={[styles.modalContainer, containerStyle]}>
        <View style={styles.modalContent}>
          <Text style={[styles.modalText, textStyle]}>{message}</Text>
          <View style={styles.buttonContainer}>
            <Button title="Cancelar" color="gray" onPress={onCancel} />
            <Button title="Confirmar" color="#6AB7E2" onPress={onConfirm} />
          </View>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  modalContent: {
    width: 300,
    padding: 20,
    backgroundColor: "#fff",
    borderRadius: 10,
    alignItems: "center",
  },
  modalText: {
    fontSize: 16,
    marginBottom: 20,
    textAlign: "center",
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "100%",
  },
  button: {
    flex: 1,
    padding: 10,
    alignItems: "center",
    borderRadius: 5,
    marginHorizontal: 5,
  },
  buttonText: {
    color: "black",
    fontSize: 16,
  },
});

export default ConfirmationModal;
