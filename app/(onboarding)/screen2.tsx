// FILE: app/(onboarding)/screen2.tsx
// The second screen in the onboarding flow.

import { useRouter } from "expo-router";
import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { useAuth } from "../../src/state/AuthProvider";

export default function OnboardingScreen2() {
  const router = useRouter();
  const { completeOnboarding } = useAuth();

  return (
    <View style={styles.container}>
      <Image
        source={require("../../assets/images/amesie/onboarding2.png")}
        style={styles.image}
        resizeMode="contain"
      />
      <Text style={styles.title}>Shop Anything, Anytime</Text>
      <Text style={styles.text}>Browse thousands of products and get them delivered to your doorstep.</Text>
      
      <TouchableOpacity
        style={styles.button}
        onPress={() => router.push("/(onboarding)/screen3")}
      >
        <Text style={styles.buttonText}>Next</Text>
      </TouchableOpacity>
      
      <TouchableOpacity onPress={() => {
        completeOnboarding();
        router.replace("/(auth)/login");
      }}>
        <Text style={styles.skipText}>Skip</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: "center", alignItems: "center", backgroundColor: '#fff', paddingHorizontal: 20 },
  image: { width: 500, height: 300, marginBottom: 20 },
  title: { fontWeight: "bold", fontSize: 30, fontFamily: "Sen", marginBottom: 20, textAlign: 'center' },
  button: {
    marginTop: 100,
    width: '100%',
    backgroundColor: "#fdc500",
    borderRadius: 8,
    padding: 16,
    alignItems: "center",
    marginBottom: 20,
  },
  buttonText: {
    fontSize: 16,
    color: "white",
    fontFamily: "Sen",
    fontWeight: 'bold',
  },
  text: {
    textAlign: "center",
    fontSize: 22,
    fontFamily: "Sen",
    color: '#666',
  },
  skipText: {
    color: "black",
    fontFamily: "Sen",
    fontSize: 16,
  }
});
