import {
  Alert,
  FlatList,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { constants } from "@/src/constants";
import { useEffect, useState } from "react";
import axios from "redaxios";
import { AntDesign } from "@expo/vector-icons";
import { router } from "expo-router";

const http = axios.create({
  baseURL: "http://api.mobilebook",
});

const data = [
  {
    id: 1,
    title: "percy jackson",
    author: "rick riordan",
    category: "aventura",
  },
  {
    id: 2,
    title: "percy jackson",
    author: "rick riordan",
    category: "aventura",
  },
  {
    id: 3,
    title: "percy jackson",
    author: "rick riordan",
    category: "aventura",
  },
  {
    id: 4,
    title: "percy jackson",
    author: "rick riordan",
    category: "aventura",
  },
];

export default function TableBook() {
  const [tasks, setTasks] = useState("");

  useEffect(() => {
    http.get("/api/tasks").then((res) => setTasks(res.data.tasks));
  }, []);

  const onButtonPress = () => {
    Alert.alert("Floating Button Pressed");
  };

  function handleNavigate() {
    router.navigate("/books");
  }

  return (
    <View>
      <View style={styles.headerTopBar}>
        <Text style={styles.headerTopBarText}>Lista de Livros</Text>
      </View>
      <View style={styles.header}>
        <Text style={styles.heading}>Titulo</Text>
        <Text style={styles.heading}>Autor</Text>
        <Text style={styles.heading}>Categoria</Text>
        <Text style={styles.heading}></Text>
      </View>
      <FlatList
        data={data}
        keyExtractor={({ id }) => id.toString()}
        renderItem={({ item }) => (
          <View style={styles.row}>
            <Text style={styles.cell}>{item.title}</Text>
            <Text style={styles.cell}>{item.author}</Text>
            <Text style={styles.cell}>{item.category}</Text>
            <TouchableOpacity style={styles.adit} onPress={onButtonPress}>
              <AntDesign name="edit" size={18} color="#fff" />
            </TouchableOpacity>
            <TouchableOpacity style={styles.delete} onPress={onButtonPress}>
              <AntDesign name="delete" size={18} color="#fff" />
            </TouchableOpacity>
          </View>
        )}
      />
      <TouchableOpacity style={styles.floatingButton}>
        <AntDesign
          name="pluscircle"
          size={40}
          color="#6AB7E2"
          onPress={handleNavigate}
        />
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  headerTopBar: {
    backgroundColor: "#6AB7E2",
    paddingHorizontal: 12,
    paddingVertical: 10,
    borderRadius: 5,
    elevation: 2,
  },
  headerTopBarText: {
    color: constants.colors.black,
    fontSize: 16,
  },
  heading: {
    flex: 1,
    color: constants.colors.white,
    textAlign: "left",
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    padding: 10,
  },
  adit: {
    paddingHorizontal: 5,
    paddingVertical: 3,
    color: constants.colors.white,
    borderRadius: 4,
    marginRight: 5,
    backgroundColor: "rgb(6, 238, 86)",
  },
  delete: {
    paddingHorizontal: 5,
    paddingVertical: 3,
    color: constants.colors.white,
    borderRadius: 4,
    backgroundColor: "rgba(238, 6, 6, 0.68)",
  },
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginVertical: 8,
    marginHorizontal: 2,
    elevation: 1,
    borderRadius: 3,
    backgroundColor: "#132026",
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
    right: 2,
    bottom: -130,
  },
});