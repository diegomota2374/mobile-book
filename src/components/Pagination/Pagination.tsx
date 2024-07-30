import { constants } from "@/constants";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  setCurrentPage: React.Dispatch<React.SetStateAction<number>>;
}
const Pagination = ({
  currentPage,
  totalPages,
  setCurrentPage,
}: PaginationProps) => {
  return (
    <View style={styles.pagination}>
      <TouchableOpacity
        style={[styles.pageButton, currentPage === 1 && styles.disabledButton]}
        onPress={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
        disabled={currentPage === 1}
      >
        <Text style={styles.pageButtonText}>{"<"}</Text>
      </TouchableOpacity>
      <Text style={styles.pageInfo}>{`${currentPage} / ${totalPages}`}</Text>
      <TouchableOpacity
        style={[
          styles.pageButton,
          currentPage === totalPages && styles.disabledButton,
        ]}
        onPress={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
        disabled={currentPage === totalPages}
      >
        <Text style={styles.pageButtonText}>{">"}</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  pagination: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    marginTop: 10,
  },
  pageButton: {
    paddingHorizontal: 10,
    paddingVertical: 5,
    marginHorizontal: 5,
    backgroundColor: "#6AB7E2",
    borderRadius: 5,
  },
  pageButtonText: {
    color: "#fff",
  },
  pageInfo: {
    color: constants.colors.white,
    marginHorizontal: 10,
  },
  disabledButton: {
    backgroundColor: "gray",
  },
});

export default Pagination;
