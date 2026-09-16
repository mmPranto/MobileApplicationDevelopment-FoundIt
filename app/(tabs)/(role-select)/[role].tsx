import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  KeyboardAvoidingView,
  Platform,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";

export default function LoginScreen() {
  const router = useRouter();
  const [identifier, setIdentifier] = useState("");
  const [password, setPassword] = useState("");
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);

  
  const studentRegex = /^\d{2}-\d{5}-\d{1}$/;
  const teacherRegex = /^\d{4}-\d{4}-\d{1}$/;

  const isStudent = studentRegex.test(identifier);
  const isTeacher = teacherRegex.test(identifier);
  const detectedRole = isStudent ? "student" : isTeacher ? "teacher" : null;

  const isFormValid =
    identifier.trim().length > 0 &&
    password.length >= 8 &&
    detectedRole !== null;

  const handleLogin = () => {
    console.log(`Logging in as ${detectedRole}`);
    router.push("/(home)");
  };

  return (
    <SafeAreaView style={styles.container}>
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={styles.innerContainer}
      >
        
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

        
        <View style={styles.contentContainer}>
          <Text style={styles.title}>Welcome Back</Text>
          <Text style={styles.subtitle}>
            Enter your institutional ID to login
          </Text>

          <View style={styles.inputGroup}>
            <Text style={styles.label}>Institutional ID</Text>
            <TextInput
              style={styles.input}
              placeholder="Student or Teacher ID"
              placeholderTextColor="#64748b"
              value={identifier}
              onChangeText={setIdentifier}
              autoCapitalize="none"
            />
            {detectedRole && (
              <Text style={styles.roleIndicator}>
                Detected Role:{" "}
                <Text
                  style={{ fontWeight: "bold", textTransform: "capitalize" }}
                >
                  {detectedRole}
                </Text>
              </Text>
            )}
          </View>

          <View style={styles.inputGroup}>
            <Text style={styles.label}>Password</Text>
            <View style={styles.passwordInputWrapper}>
              <TextInput
                style={styles.passwordInput}
                placeholder="Password"
                placeholderTextColor="#64748b"
                secureTextEntry={!isPasswordVisible}
                value={password}
                onChangeText={setPassword}
              />
              <TouchableOpacity
                onPress={() => setIsPasswordVisible(!isPasswordVisible)}
                style={styles.visibilityIcon}
              >
                <Ionicons
                  name={isPasswordVisible ? "eye-off" : "eye"}
                  size={20}
                  color="#64748b"
                />
              </TouchableOpacity>
            </View>
          </View>

          <TouchableOpacity
            style={[
              styles.loginButton,
              !isFormValid && styles.loginButtonDisabled,
            ]}
            onPress={handleLogin}
            disabled={!isFormValid}
          >
            <Text style={styles.loginButtonText}>Login</Text>
          </TouchableOpacity>
        </View>

        
        <View style={styles.footerContainer}>
          <TouchableOpacity
            onPress={() =>
              router.push("/(tabs)/(role-select)/(signup)/signup" as any)
            }
          >
            <Text style={styles.footerText}>
              Don&apos;t have an account?{" "}
              <Text style={styles.linkText}>Sign Up</Text>
            </Text>
          </TouchableOpacity>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#7bef15" },
  innerContainer: { flex: 1, justifyContent: "space-between", padding: 24 },
  topBar: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
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
  contentContainer: {
    marginVertical: "auto",
  },
  title: { fontSize: 32, fontWeight: "900", color: "#111112", marginBottom: 4 },
  subtitle: { fontSize: 14, color: "#1f2125", marginBottom: 24 },
  inputGroup: { marginBottom: 16 },
  label: { fontSize: 13, fontWeight: "700", color: "#111112", marginBottom: 6 },
  input: {
    backgroundColor: "#ffffff",
    borderWidth: 1.5,
    borderColor: "#e2e8f0",
    borderRadius: 12,
    padding: 14,
    fontSize: 15,
  },
  passwordInputWrapper: {
    flexDirection: "row",
    backgroundColor: "#ffffff",
    borderWidth: 1.5,
    borderColor: "#e2e8f0",
    borderRadius: 12,
    alignItems: "center",
  },
  passwordInput: { flex: 1, padding: 14, fontSize: 15 },
  visibilityIcon: { padding: 12 },
  roleIndicator: {
    fontSize: 12,
    color: "#111112",
    marginTop: 4,
    fontStyle: "italic",
  },
  loginButton: {
    backgroundColor: "#111112",
    padding: 16,
    borderRadius: 14,
    alignItems: "center",
    marginTop: 12,
  },
  loginButtonDisabled: { backgroundColor: "#cbd5e1" },
  loginButtonText: { color: "#ffffff", fontSize: 16, fontWeight: "bold" },
  footerContainer: { alignItems: "center", paddingBottom: 10 },
  footerText: { fontSize: 14, color: "#1f2125" },
  linkText: {
    fontWeight: "700",
    color: "#111112",
    textDecorationLine: "underline",
  },
});
