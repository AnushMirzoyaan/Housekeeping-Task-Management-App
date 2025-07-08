import { router } from "expo-router";
import { Image, Text, TouchableOpacity, View } from "react-native";

import styles from "../assets/styles/home.styles";

export default function Index() {
  return (
    <View style={styles.container}>
      <View style={styles.topIllustration}>
        <Image
          source={require("../assets/images/welocme-illustration.png")}
          style={styles.illustrationImage}
          resizeMode="contain"
        />
      </View>

      <TouchableOpacity
        style={styles.button}
        onPress={() => router.push("/(dashboard)/")}
      >
        <Text style={styles.buttonText}>Go to Dashboard</Text>
      </TouchableOpacity>
    </View>
  );
}
