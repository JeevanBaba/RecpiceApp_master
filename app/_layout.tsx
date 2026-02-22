import { Stack } from "expo-router";
import { StatusBar } from "react-native";

export default function RootLayout() {
  return (
    <>
      <StatusBar barStyle="light-content"  />
      <Stack>
        <Stack.Screen 
          name="index" 
          options={{ headerShown: false }} 
        />
        <Stack.Screen 
          name="Home" 
          options={{ headerShown: false }} 
        />
        <Stack.Screen 
          name="RecipeDetails" 
          options={{ headerShown: false }} 
        />
      </Stack>
    </>
  );
}
