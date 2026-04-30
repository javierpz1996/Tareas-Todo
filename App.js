import { StatusBar } from "expo-status-bar";
import { SafeAreaView } from "react-native";
import "./global.css";
import { HomeScreen } from "./src/screens/HomeScreen";

export default function App() {
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <HomeScreen />
      <StatusBar style="auto" />
    </SafeAreaView>
  );
}
