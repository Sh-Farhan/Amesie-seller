
import { useRouter } from "expo-router";
import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { useAuth } from "../../src/state/AuthProvider"; // Correct path to our AuthProvider

export default function OnboardingScreen1() {
  const router = useRouter();
  const { completeOnboarding } = useAuth();

  // Function to handle skipping the onboarding process
  const handleSkip = () => {
    completeOnboarding();
    // Use replace to prevent the user from going back to onboarding
    router.replace("/(auth)/login");
  };

  return (
    <View style={styles.container}>
      <Image
        // Make sure you have an image at this path
        source={require("../../assets/images/amesie/onboarding1.png")}
        style={styles.image}
        resizeMode="contain"
      />
      <Text style={styles.text}>
        One app for everything-shop, order food, and get essentials delivered instantly.
      </Text>
      
      <TouchableOpacity
        style={styles.button}
        // Navigate to the next screen in the onboarding stack
        onPress={() => router.push("/(onboarding)/screen2")}
      >
        <Text style={styles.buttonText}>Next</Text>
      </TouchableOpacity>
      
      <TouchableOpacity onPress={handleSkip}>
        <Text style={styles.skipText}>Skip</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { 
    flex: 1, 
    justifyContent: "center", 
    alignItems: "center", 
    backgroundColor: '#fff', // Added a background color
    paddingHorizontal: 20,
  },
  image: {
    width: 400, 
    height: 200, 
    marginBottom: 20
  },
  text: {
    textAlign: "center", 
    fontSize: 22, 
    marginBottom: 20, 
    fontFamily: "Sen", 
    marginTop: 70, 
    color: '#333'
  },
  button: {
    marginTop: 100,
    width: '100%', // Use percentage for better responsiveness
    backgroundColor: "#fdc500",
    borderRadius: 8,
    paddingVertical: 16, // Use vertical padding for consistent height
    alignItems: "center",
    marginBottom: 20,
  },
  buttonText: {
    fontSize: 16,
    color: "white",
    fontFamily: "Sen",
    fontWeight: 'bold',
  },
  skipText: {
    color: "black", 
    fontFamily: "Sen",
    fontSize: 16,
  }
});