import { View } from "react-native";
import { CustomText } from "../components/CustomText";
import { WindExample } from "../components/WindExample";

export function HomeScreen() {
  return (
    <View
      style={{
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <CustomText>Home Screen</CustomText>
      <WindExample />
    </View>
  );
}

