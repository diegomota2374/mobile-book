import { Stack } from "expo-router";
import { constants } from "../constants";

export default function Layout() {
  return (
    <Stack
      screenOptions={{
        headerStyle: {
          backgroundColor: constants.colors.black,
        },
        headerTintColor: constants.colors.white,
      }}
    >
      <Stack.Screen name="index" options={{ title: "Home" }} />
      <Stack.Screen name="books" options={{ title: "Books" }} />
    </Stack>
  );
}
