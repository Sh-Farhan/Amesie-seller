// FILE: app/(onboarding)/screen4.tsx
// This is the final onboarding screen.

import { useRouter } from "expo-router";
import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { useAuth } from "../../src/state/AuthProvider";

export default function OnboardingScreen4() {
  const router = useRouter();
  const { completeOnboarding } = useAuth();

  const finishOnboarding = () => {
    completeOnboarding();
    router.replace("/(auth)/login");
  };

  return (
    <View style={styles.container}>
      <Image
        source={require("../../assets/images/amesie/onboarding4.png")}
        style={styles.image}
        resizeMode="contain"
      />
      <Text style={styles.title}>Order Delicious Food</Text>
      <Text style={styles.text}>Your favorite restaurants, delivered fast.</Text>
      
      <TouchableOpacity
        style={styles.button}
        onPress={finishOnboarding}
      >
        <Text style={styles.buttonText}>GET STARTED</Text>
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
});
