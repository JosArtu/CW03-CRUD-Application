import { useTodos } from "@/hooks/useTodos";
import { useRouter } from "expo-router";
import { useContext, useState } from "react";
import {
  FlatList,
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { TodoItem } from "../../components/TodoItem";
import { ThemeContext } from "../../context/ThemeContext";

export default function Index() {
  const [text, setText] = useState("");
  const router = useRouter();
  const { todos, addTodo, toggleTodo, removeTodo } = useTodos();
  const { colorScheme, setColorScheme, theme } = useContext(ThemeContext);

  const handlePress = (id) => {
    router.push('/details/${id}');
  };

  const handleAddTodo = () => {
    if (addTodo(text)) {
      setText("");
    }
  };

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: theme.background }]}>
      <View style={styles.inputContainer}>
        <TextInput
          style={[
            styles.input,
            { borderColor: theme.text, color: theme.text },
          ]}
          placeholder="Input Text Here"
          placeholderTextColor="gray"
          value={text}
          onChangeText={setText}
        />
        <Pressable style={styles.button} onPress={handleAddTodo}>
          <Text style={styles.buttonText}> Add </Text>
        </Pressable>
        <Pressable
          accessibilityRole="button"
          accessibilityLabel={`Switch to ${colorScheme === "dark" ? "light" : "dark"} theme`}
          style={[styles.button, styles.themeButton]}
          onPress={() =>
            setColorScheme(colorScheme === "dark" ? "light" : "dark")
          }
        >
          <Text style={styles.buttonText}>
            {colorScheme === "dark" ? "Light" : "Dark"}
          </Text>
        </Pressable>
      </View>
      <FlatList
        data={todos}
        renderItem={({ item }) => (
          <TodoItem
            item={item}
            onToggle={toggleTodo}
            onRemove={removeTodo}
            onDetails={handlePress}
            theme={theme}
          />
        )}
        keyExtractor={(todo) => todo.id.toString()}
        contentContainerStyle={{ flexGrow: 1 }}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "black",
  },
  inputContainer: {
    flexDirection: "row",
    marginBottom: 10,
    padding: 10,
    width: "100%",
    maxWidth: 1024,
    marginHorizontal: "auto",
    pointerEvents: "auto",
  },
  input: {
    flex: 1,
    borderWidth: 1,
    borderRadius: 5,
    padding: 10,
    marginRight: 10,
    fontSize: 18,
    minWidth: 0,
    borderColor: "white",
    color: "white",
  },
  button: {
    backgroundColor: "blue",
    borderRadius: 5,
    padding: 10,
    justifyContent: "center",
  },
  themeButton: {
    marginLeft: 8,
  },
  buttonText: {
    color: "white",
    fontSize: 18,
  },
});
