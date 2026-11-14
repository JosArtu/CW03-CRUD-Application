import { useLocalSearchParams } from "expo-router";
import { Text } from "expo-router/build/react-navigation";
import { SafeAreaView } from "react-native-safe-area-context";

export default function Details() {
  const { id } = useLocalSearchParams();

  return (
    <SafeAreaView>
      <Text> { id } </Text>
    </SafeAreaView>
  );
}
