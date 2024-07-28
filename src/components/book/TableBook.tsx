import {
  Alert,
  FlatList,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { useCallback, useState } from "react";
import { AntDesign } from "@expo/vector-icons";
import { router, useFocusEffect } from "expo-router";
import axios from "axios";
import Loading from "../Loading/Loading";
import { constants } from "@/constants";
import ConfirmationModal from "../ConfirmationModal/ConfirmationModal";

interface Books {
  id: number;
  title: string;
  author: string;
  category: string;
}

export default function TableBook() {
  const [books, setBooks] = useState<Books[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [isModalVisible, setIsModalVisible] = useState<boolean>(false);
  const [bookToDelete, setBookToDelete] = useState<Books | null>(null);

  const fetchBooks = useCallback(async () => {
    setLoading(true);
    try {
      const response = await axios.get("http://192.168.1.103:3000/books");
      setBooks(response.data);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching books:", error);
      const errorMessage =
        "Erro ao buscar livros. Verifique sua conexão de rede.";
      setError(errorMessage);
      Alert.alert("Erro", errorMessage);
      setLoading(false);
    }
  }, []);

  useFocusEffect(
    useCallback(() => {
      fetchBooks();
    }, [fetchBooks])
  );

  const handleEditBook = (book: Books) => {
    const jsonBook = JSON.stringify(book);
    router.navigate(`/book/${jsonBook}`);
  };

  const handleDeleteBook = async (id: number) => {
    setLoading(true);
    try {
      await axios.delete(`http://192.168.1.103:3000/books/${id}`);
      setBooks((prevBooks) => prevBooks.filter((book) => book.id !== id));
    } catch (error) {
      console.error("Error deleting book:", error);
      setError("Error deleting book.");
    } finally {
      setLoading(false);
    }
    setIsModalVisible(false);
    setBookToDelete(null);
  };

  function handleNavigate() {
    router.navigate("/book/forme");
  }

  function handleTooButtons(item: Books) {
    return (
      <>
        <TouchableOpacity
          style={styles.adit}
          onPress={() => handleEditBook(item)}
        >
          <AntDesign
            name="edit"
            testID={`edit-${item.id}`}
            size={18}
            color="#fff"
          />
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.delete}
          onPress={() => {
            setBookToDelete(item);
            setIsModalVisible(true);
          }}
        >
          <AntDesign
            name="delete"
            testID={`delete-${item.id}`}
            size={18}
            color="#fff"
          />
        </TouchableOpacity>
      </>
    );
  }

  function handleItemTable(item: Books) {
    return (
      <View style={styles.row}>
        <Text style={styles.cell}>{item.title}</Text>
        <Text style={styles.cell}>{item.author}</Text>
        <Text style={styles.cell}>{item.category}</Text>
        {handleTooButtons(item)}
      </View>
    );
  }

  return (
    <View testID="book-list" style={styles.container}>
      {loading ? (
        <Loading />
      ) : error ? (
        <View>
          <Text style={{ color: "red" }}>{error}</Text>
        </View>
      ) : (
        <>
          <View data-cy="book-list" style={styles.headerTopBar}>
            <Text style={styles.headerTopBarText}>Lista de Livros</Text>
          </View>
          <View style={styles.header}>
            <Text style={styles.heading}>Titulo</Text>
            <Text style={styles.heading}>Autor</Text>
            <Text style={styles.heading}>Categoria</Text>
            <Text style={styles.heading}></Text>
          </View>
          <FlatList
            data={books}
            keyExtractor={({ id }) => id.toString()}
            renderItem={({ item }) => handleItemTable(item)}
            testID="book-item"
          />
          <TouchableOpacity
            style={styles.floatingButton}
            onPress={handleNavigate}
          >
            <AntDesign
              testID="floatingButton"
              name="pluscircle"
              size={40}
              color="#6AB7E2"
            />
          </TouchableOpacity>
          <ConfirmationModal
            visible={isModalVisible}
            onConfirm={() => {
              if (bookToDelete) handleDeleteBook(bookToDelete.id);
            }}
            onCancel={() => {
              setIsModalVisible(false);
              setBookToDelete(null);
            }}
            message="Tem certeza de que deseja excluir este livro?"
          />
        </>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: "#132026",
  },
  headerTopBar: {
    backgroundColor: "#6AB7E2",
    paddingHorizontal: 12,
    paddingVertical: 10,
    borderRadius: 5,
    elevation: 2,
  },
  headerTopBarText: {
    color: constants.colors.black,
    fontSize: 18,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    padding: 10,
  },
  heading: {
    flex: 1,
    color: constants.colors.white,
    textAlign: "left",
  },
  adit: {
    paddingHorizontal: 5,
    paddingVertical: 3,
    color: constants.colors.white,
    borderRadius: 4,
    marginRight: 5,
    backgroundColor: "#6AB7E2",
  },
  delete: {
    paddingHorizontal: 5,
    paddingVertical: 3,
    color: constants.colors.white,
    borderRadius: 4,
    backgroundColor: "gray",
  },
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginVertical: 8,
    marginHorizontal: 2,
    elevation: 1,
    borderRadius: 3,
    backgroundColor: "#2f2f2f",
    padding: 5,
  },
  cell: {
    color: constants.colors.white,
    textAlign: "left",
    flex: 0.3,
  },
  floatingButton: {
    position: "absolute",
    width: 60,
    height: 60,
    alignItems: "center",
    justifyContent: "center",
    right: 10,
    bottom: 10,
  },
});
