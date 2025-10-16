// FILE: app/(onboarding)/screen3.tsx
// The third screen in the onboarding flow.

import { useRouter } from "expo-router";
import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { useAuth } from "../../src/state/AuthProvider";

export default function OnboardingScreen3() {
  const router = useRouter();
  const { completeOnboarding } = useAuth();

  return (
    <View style={styles.container}>
      <Image
        source={require("../../assets/images/amesie/onboarding3.png")}
        style={styles.image}
        resizeMode="contain"
      />
      <Text style={styles.title}>Get Essentials in Minutes</Text>
      <Text style={styles.text}>Instant delivery for groceries, medicines, and more from nearby stores.</Text>
      
      <TouchableOpacity
        style={styles.button}
        onPress={() => router.push("/(onboarding)/screen4")}
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
