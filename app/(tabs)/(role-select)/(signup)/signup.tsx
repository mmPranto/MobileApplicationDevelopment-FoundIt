import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  ScrollView,
  TouchableOpacity,
  KeyboardAvoidingView,
  Platform,
  Alert,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";

export default function SignUpScreen() {
  const router = useRouter();
  const [role, setRole] = useState<"student" | "teacher">("student");
  const [fullName, setFullName] = useState("");
  const [identifier, setIdentifier] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);

  const studentRegex = /^\d{2}-\d{5}-\d{1}$/;
  const teacherRegex = /^\d{4}-\d{4}-\d{1}$/;

  const isFormatValid =
    role === "teacher"
      ? teacherRegex.test(identifier)
      : studentRegex.test(identifier);

  const handleSignUp = () => {
    // Check if any field is empty
    if (!fullName.trim() || !identifier.trim() || !email.trim() || !password.trim()) {
      Alert.alert("Error", "Please fill in all fields.");
      return;
    }

    // Check if identifier format is correct
    if (!isFormatValid) {
      Alert.alert("Error", "Please enter a valid institutional ID format.");
      return;
    }

    // Check password length (e.g., minimum 8 characters)
    if (password.length < 8) {
      Alert.alert("Error", "Password must be at least 8 characters long.");
      return;
    }

    console.log(`Signing up successfully as ${role}:`, {
      fullName,
      identifier,
      email,
    });

    // Navigate back to the login page after successful sign up
    router.push("/login"); // Alternatively, you can use router.back()
  };

  return (
    <SafeAreaView style={styles.container}>
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={{ flex: 1 }}
      >
        <ScrollView contentContainerStyle={styles.scrollContent}>
          {/* Top Bar with Back Button & Landing-Style Brand Logo */}
          <View style={styles.topBar}>
            <TouchableOpacity
              style={styles.backButton}
              onPress={() => router.back()}
            >
              <Ionicons name="arrow-back" size={24} color="#ffffff" />
            </TouchableOpacity>

            <View style={styles.heroHeader}>
              <View style={styles.logoIcon}>
                <Ionicons name="search" size={20} color="#ffffff" />
              </View>
              <Text style={styles.brandTitle}>FoundIt</Text>
            </View>
          </View>

          <Text style={styles.title}>Create Account</Text>

          {/* Role Selector Toggle */}
          <Text style={styles.label}>Select Role</Text>
          <View style={styles.categoryContainer}>
            {(["student", "teacher"] as const).map((r) => (
              <TouchableOpacity
                key={r}
                style={[
                  styles.categoryButton,
                  role === r && styles.activeButton,
                ]}
                onPress={() => setRole(r)}
              >
                <Text
                  style={[
                    styles.categoryButtonText,
                    role === r && styles.activeText,
                  ]}
                >
                  {r.charAt(0).toUpperCase() + r.slice(1)}
                </Text>
              </TouchableOpacity>
            ))}
          </View>

          <View style={styles.inputGroup}>
            <Text style={styles.label}>Full Name</Text>
            <TextInput
              style={styles.input}
              placeholder="Enter your full name"
              value={fullName}
              onChangeText={setFullName}
            />
          </View>

          <View style={styles.inputGroup}>
            <Text style={styles.label}>
              {role === "teacher" ? "Teacher ID" : "Student ID"}
            </Text>
            <TextInput
              style={styles.input}
              placeholder={
                role === "teacher" ? "e.g., 1001-2002-3" : "e.g., 23-50176-1"
              }
              value={identifier}
              onChangeText={setIdentifier}
              autoCapitalize="none"
            />
            {identifier.length > 0 && !isFormatValid && (
              <Text style={{ color: "#DC2626", fontSize: 12, marginTop: 4 }}>
                Invalid format. Expected:{" "}
                {role === "teacher" ? "0000-0000-0" : "00-00000-0"}
              </Text>
            )}
          </View>

          <View style={styles.inputGroup}>
            <Text style={styles.label}>Email Address</Text>
            <TextInput
              style={styles.input}
              placeholder="Enter your email"
              value={email}
              onChangeText={setEmail}
              keyboardType="email-address"
              autoCapitalize="none"
            />
          </View>

          <View style={styles.inputGroup}>
            <Text style={styles.label}>Password</Text>
            <TextInput
              style={styles.input}
              placeholder="Create a password"
              secureTextEntry={!isPasswordVisible}
              value={password}
              onChangeText={setPassword}
            />
          </View>

          <TouchableOpacity style={styles.submitButton} onPress={handleSignUp}>
            <Text style={styles.submitButtonText}>Sign Up</Text>
          </TouchableOpacity>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#7bef15" },
  scrollContent: { padding: 24 },
  topBar: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 24,
  },
  backButton: {
    width: 44,
    height: 44,
    backgroundColor: "#111112",
    borderRadius: 12,
    justifyContent: "center",
    alignItems: "center",
  },
  heroHeader: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
  logoIcon: {
    width: 36,
    height: 36,
    backgroundColor: "#111112",
    borderRadius: 10,
    alignItems: "center",
    justifyContent: "center",
  },
  brandTitle: {
    fontSize: 24,
    fontWeight: "900",
    color: "#ffffff",
    letterSpacing: -0.5,
  },
  title: {
    fontSize: 32,
    fontWeight: "900",
    marginBottom: 20,
    color: "#111112",
  },
  label: { fontSize: 13, fontWeight: "700", marginBottom: 6, color: "#111112" },
  input: {
    backgroundColor: "#ffffff",
    borderWidth: 1.5,
    borderColor: "#e2e8f0",
    borderRadius: 12,
    padding: 14,
    fontSize: 15,
    marginBottom: 16,
  },
  categoryContainer: { flexDirection: "row", gap: 12, marginBottom: 16 },
  categoryButton: {
    flex: 1,
    paddingVertical: 12,
    borderRadius: 12,
    borderWidth: 1.5,
    borderColor: "#e2e8f0",
    alignItems: "center",
    backgroundColor: "#ffffff",
  },
  activeButton: { backgroundColor: "#111112", borderColor: "#111112" },
  categoryButtonText: { fontSize: 14, fontWeight: "600", color: "#64748B" },
  activeText: { color: "#FFFFFF", fontWeight: "700" },
  submitButton: {
    backgroundColor: "#111112",
    padding: 16,
    borderRadius: 14,
    alignItems: "center",
    marginTop: 10,
  },
  submitButtonText: { color: "#FFFFFF", fontSize: 16, fontWeight: "700" },
  inputGroup: { marginBottom: 4 },
});