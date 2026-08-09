import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";
import { useRouter, useLocalSearchParams } from "expo-router";

export default function DynamicLoginScreen() {
  const router = useRouter();

  const { role } = useLocalSearchParams();
  const isTeacher = role === "teacher";

  const [identifier, setIdentifier] = useState("");
  const [password, setPassword] = useState("");
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);

  const isIdentifierFilled = identifier.trim().length > 0;
  const isPasswordValid = password.length >= 8;

  const studentRegex = /^\d{2}-\d{5}-\d{1}$/;
  const teacherRegex = /^\d{4}-\d{4}-\d{1}$/;

  const isFormatValid = isTeacher
    ? teacherRegex.test(identifier)
    : studentRegex.test(identifier);

  const isFormValid = isIdentifierFilled && isPasswordValid && isFormatValid;

  const handleLogin = () => {
    router.push("/(tabs)/(role-select)/(home)");
  };

  const handleBack = () => {
    router.back();
  };

  const handleSignUp = () => {
    router.push(`/(tabs)/(role-select)/(signup)/${role}`);
  };

  const handleForgotPassword = () => {
    console.log(`Navigate to ${role} Forgot Password`);
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity style={styles.backButton} onPress={handleBack}>
          <Ionicons name="arrow-back" size={24} color="#ffffff" />
        </TouchableOpacity>

        <View style={styles.brandContainer}>
          <View style={styles.logoBadge}>
            <Ionicons name="search" size={14} color="#ffffff" />
          </View>
          <Text style={styles.appName}>FoundIt</Text>
        </View>
      </View>

      <View style={styles.contentContainer}>
        <View style={styles.titleContainer}>
          <Text style={styles.title}>
            {isTeacher ? "Teacher Login" : "Student Login"}
          </Text>
        </View>

        <View style={styles.inputGroup}>
          <Text style={styles.label}>
            {isTeacher ? "Teacher ID" : "Student ID"}
          </Text>
          <TextInput
            style={styles.input}
            placeholder={isTeacher ? "e.g., 1001-2002-3" : "e.g., 23-50176-1"}
            placeholderTextColor="#64748b"
            value={identifier}
            onChangeText={setIdentifier}
            autoCapitalize="none"
          />
        </View>

        <View style={styles.inputGroup}>
          <Text style={styles.label}>Password</Text>
          <View style={styles.passwordInputWrapper}>
            <TextInput
              style={styles.passwordInput}
              placeholder="Password (min 8 chars)"
              placeholderTextColor="#64748b"
              secureTextEntry={!isPasswordVisible}
              value={password}
              onChangeText={setPassword}
            />
            <TouchableOpacity
              style={styles.visibilityIcon}
              onPress={() => setIsPasswordVisible(!isPasswordVisible)}
            >
              <Ionicons
                name={isPasswordVisible ? "eye-off" : "eye"}
                size={20}
                color="#64748b"
              />
            </TouchableOpacity>
          </View>

          <TouchableOpacity
            onPress={handleForgotPassword}
            style={styles.forgotContainer}
          >
            <Text style={styles.forgotText}>Forgot Password?</Text>
          </TouchableOpacity>
        </View>

        <TouchableOpacity
          style={[
            styles.loginButton,
            !isFormValid && styles.loginButtonDisabled,
          ]}
          onPress={handleLogin}
          disabled={!isFormValid}
        >
          <Text
            style={[
              styles.loginButtonText,
              !isFormValid && styles.loginButtonTextDisabled,
            ]}
          >
            Login
          </Text>
          <Ionicons
            name="arrow-forward"
            size={18}
            color={isFormValid ? "#ffffff" : "#94a3b8"}
            style={{ marginLeft: 8 }}
          />
        </TouchableOpacity>
      </View>

      <View style={styles.footerContainer}>
        <View style={styles.signUpRow}>
          <Text style={styles.footerText}>Don&apos;t have an account? </Text>
          <TouchableOpacity onPress={handleSignUp}>
            <Text style={styles.signUpText}>Sign Up</Text>
          </TouchableOpacity>
        </View>
        <Text style={styles.copyrightText}>© 2026 FoundIt App</Text>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#7cfc00",
  },
  header: {
    width: "100%",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: 10,
  },
  backButton: {
    width: 48,
    height: 48,
    backgroundColor: "#121212",
    borderRadius: 14,
    justifyContent: "center",
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 3,
    elevation: 4,
  },
  brandContainer: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 6,
    paddingHorizontal: 10,
    borderRadius: 10,
  },
  logoBadge: {
    width: 22,
    height: 22,
    backgroundColor: "#000000",
    borderRadius: 6,
    justifyContent: "center",
    alignItems: "center",
    marginRight: 6,
  },
  appName: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#ffffff",
  },
  contentContainer: {
    width: "100%",
    marginVertical: "auto",
  },
  titleContainer: {
    marginBottom: 24,
  },
  title: {
    fontSize: 32,
    fontWeight: "900",
    color: "#000000",
    letterSpacing: -0.5,
  },
  inputGroup: {
    marginBottom: 16,
  },
  label: {
    fontSize: 13,
    fontWeight: "700",
    color: "#121212",
    marginBottom: 6,
  },
  input: {
    width: "100%",
    backgroundColor: "#ffffff",
    borderWidth: 1.5,
    borderColor: "#e2e8f0",
    borderRadius: 12,
    paddingHorizontal: 16,
    paddingVertical: 14,
    fontSize: 15,
    color: "#1e293b",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 1,
  },
  passwordInputWrapper: {
    flexDirection: "row",
    width: "100%",
    backgroundColor: "#ffffff",
    borderWidth: 1.5,
    borderColor: "#e2e8f0",
    borderRadius: 12,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 1,
  },
  passwordInput: {
    flex: 1,
    paddingHorizontal: 16,
    paddingVertical: 14,
    fontSize: 15,
    color: "#1e293b",
  },
  visibilityIcon: {
    padding: 12,
    justifyContent: "center",
    alignItems: "center",
  },
  forgotContainer: {
    alignSelf: "flex-end",
    marginTop: 6,
  },
  forgotText: {
    fontSize: 13,
    fontWeight: "600",
    color: "#121212",
    textDecorationLine: "underline",
  },
  loginButton: {
    width: "100%",
    backgroundColor: "#121212",
    paddingVertical: 16,
    borderRadius: 14,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    marginTop: 12,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 3,
  },
  loginButtonDisabled: {
    backgroundColor: "#e2e8f0",
    shadowOpacity: 0,
    elevation: 0,
  },
  loginButtonText: {
    color: "#ffffff",
    fontSize: 16,
    fontWeight: "bold",
  },
  loginButtonTextDisabled: {
    color: "#94a3b8",
  },
  footerContainer: {
    width: "100%",
    alignItems: "center",
    paddingBottom: 10,
  },
  signUpRow: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 8,
  },
  footerText: {
    fontSize: 14,
    color: "#1e293b",
    fontWeight: "500",
  },
  signUpText: {
    fontSize: 14,
    fontWeight: "700",
    color: "#121212",
    textDecorationLine: "underline",
  },
  copyrightText: {
    fontSize: 12,
    color: "#1e293b",
    fontWeight: "500",
  },
});
