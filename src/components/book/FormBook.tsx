import { useState, useEffect } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Alert,
} from "react-native";
import axios from "axios";
import { router } from "expo-router";

interface Book {
  id?: number;
  title: string;
  author: string;
  category: string;
}
interface FormBookProps {
  initialBook?: Book | String;
}

export default function FormeBook(book: FormBookProps) {
  const [books, setBooks] = useState<Book>({
    title: "",
    author: "",
    category: "",
  });

  useEffect(() => {
    if (book && book.initialBook !== "forme") {
      const { id, title, author, category } = book.initialBook as Book;
      setBooks({ id, title, author, category });
    }
  }, []);

  const handleSubmit = async () => {
    try {
      if (books.id) {
        await axios.put(`http://192.168.1.103:3000/books/${books.id}`, books);
        Alert.alert("Livro atualizado com sucesso!");
      } else {
        await axios.post("http://192.168.1.103:3000/books", books);
        Alert.alert("Livro adicionado com sucesso!");
      }
      router.replace("/");
    } catch (error) {
      console.error("Error saving book:", error);
      Alert.alert("Erro ao salvar livro. Verifique sua conexão de rede.");
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.label}>Título:</Text>
      <TextInput
        style={styles.input}
        value={books.title}
        onChangeText={(text) => setBooks({ ...books, title: text })}
      />

      <Text style={styles.label}>Autor:</Text>
      <TextInput
        style={styles.input}
        value={books.author}
        onChangeText={(text) => setBooks({ ...books, author: text })}
      />

      <Text style={styles.label}>Categoria:</Text>
      <TextInput
        style={styles.input}
        value={books.category}
        onChangeText={(text) => setBooks({ ...books, category: text })}
      />

      <TouchableOpacity style={styles.button} onPress={handleSubmit}>
        <Text style={styles.buttonText}>
          {books.id ? "Atualizar Livro" : "Adicionar Livro"}
        </Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#132026",
    padding: 20,
  },
  label: {
    fontSize: 16,
    color: "#fff",
    marginBottom: 5,
  },
  input: {
    backgroundColor: "#fff",
    borderRadius: 5,
    marginBottom: 10,
    padding: 10,
  },
  button: {
    backgroundColor: "#6AB7E2",
    padding: 15,
    borderRadius: 5,
    alignItems: "center",
    marginTop: 20,
  },
  buttonText: {
    color: "#fff",
    fontSize: 16,
  },
});
