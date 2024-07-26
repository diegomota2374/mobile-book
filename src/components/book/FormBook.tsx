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
import { useForm, Controller } from "react-hook-form";
import { Picker } from "@react-native-picker/picker";

interface Book {
  id?: number;
  title: string;
  author: string;
  category: string;
}
interface FormBookProps {
  initialBook: Book | String;
}

const categories = [
  "Aventura",
  "Ação",
  "Romance",
  "Suspense",
  "Comédia",
  "Terror",
];

export default function FormeBook({ initialBook }: FormBookProps) {
  const {
    control,
    handleSubmit,
    setValue,
    getValues,
    formState: { errors },
  } = useForm<Book>({
    defaultValues: {
      title: "",
      author: "",
      category: "",
    },
  });

  useEffect(() => {
    if (typeof initialBook === "string" && initialBook !== "forme") {
      try {
        const book = JSON.parse(initialBook) as Book;
        setValue("id", book.id);
        setValue("title", book.title);
        setValue("author", book.author);
        setValue("category", book.category);
      } catch (error) {
        console.error("Failed to parse initialBook:", error);
      }
    } else if (typeof initialBook === "object" && initialBook !== null) {
      const book = initialBook as Book;
      setValue("id", book.id);
      setValue("title", book.title);
      setValue("author", book.author);
      setValue("category", book.category);
    }
  }, [initialBook, setValue]);

  const onSubmit = async (data: Book) => {
    try {
      if (data.id) {
        await axios.put(`http://192.168.1.103:3000/books/${data.id}`, data);
        Alert.alert("Livro atualizado com sucesso!");
      } else {
        await axios.post("http://192.168.1.103:3000/books", data);
        Alert.alert("Livro adicionado com sucesso!");
      }
      router.back();
    } catch (error) {
      console.error("Error saving book:", error);
      Alert.alert("Erro ao salvar livro. Verifique sua conexão de rede.");
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.label}>Title:</Text>
      <Controller
        control={control}
        name="title"
        rules={{ required: "O Título é obrigatório" }}
        render={({ field: { onChange, onBlur, value } }) => (
          <TextInput
            style={styles.input}
            onBlur={onBlur}
            onChangeText={onChange}
            value={value}
          />
        )}
      />
      {errors.title && (
        <Text style={styles.errorText}>{errors.title.message}</Text>
      )}

      <Text style={styles.label}>Author:</Text>
      <Controller
        control={control}
        name="author"
        rules={{ required: "O Autor é obrigatório" }}
        render={({ field: { onChange, onBlur, value } }) => (
          <TextInput
            style={styles.input}
            onBlur={onBlur}
            onChangeText={onChange}
            value={value}
          />
        )}
      />
      {errors.author && (
        <Text style={styles.errorText}>{errors.author.message}</Text>
      )}

      <Text style={styles.label}>Categoria:</Text>
      <Controller
        control={control}
        name="category"
        rules={{ required: "A Categoria é obrigatória" }}
        render={({ field: { onChange, onBlur, value } }) => (
          <Picker
            selectedValue={value}
            style={styles.picker}
            onValueChange={(itemValue) => onChange(itemValue)}
            onBlur={onBlur}
          >
            <Picker.Item label="Selecione uma categoria" value="" />
            {categories.map((category) => (
              <Picker.Item key={category} label={category} value={category} />
            ))}
          </Picker>
        )}
      />
      {errors.category && (
        <Text style={styles.errorText}>{errors.category.message}</Text>
      )}

      <TouchableOpacity style={styles.button} onPress={handleSubmit(onSubmit)}>
        <Text style={styles.buttonText}>
          {typeof initialBook !== "string" ? "Editar Livro" : "Adicionar Livro"}
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
  picker: {
    height: 50,
    width: "100%",
    backgroundColor: "#fff",
    marginBottom: 10,
    borderRadius: 5,
  },
  errorText: {
    color: "red",
    marginBottom: 10,
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
