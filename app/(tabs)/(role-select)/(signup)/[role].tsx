import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";
import { useRouter, useLocalSearchParams } from "expo-router";

export default function DynamicSignUpScreen() {
  const router = useRouter();
  
  
  const { role } = useLocalSearchParams();
  const isTeacher = role === "teacher";

  const [fullName, setFullName] = useState("");
  const [identifier, setIdentifier] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);

  const handleSignUp = () => {
    console.log(`Signing up ${role} with:`, { fullName, identifier, email, password });
  };

  const handleBack = () => {
    router.back();
  };

  const handleLoginRedirect = () => {
    router.back(); 
  };

  return (
    <SafeAreaView style={styles.container}>
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={styles.innerContainer}
      >
        <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
          
          
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
                {isTeacher ? "Teacher Sign Up" : "Student Sign Up"}
              </Text>
              <Text style={styles.subtitle}>
                Create an account to get started
              </Text>
            </View>

          
            <View style={styles.inputGroup}>
              <Text style={styles.label}>Full Name</Text>
              <TextInput
                style={styles.input}
                placeholder="Enter your full name"
                placeholderTextColor="#64748b"
                value={fullName}
                onChangeText={setFullName}
              />
            </View>

          
            <View style={styles.inputGroup}>
              <Text style={styles.label}>
                {isTeacher ? "Teacher ID" : "Student ID"}
              </Text>
              <TextInput
                style={styles.input}
                placeholder={isTeacher ? "Enter Teacher ID" : "e.g., 23-50176-1"}
                placeholderTextColor="#64748b"
                value={identifier}
                onChangeText={setIdentifier}
                autoCapitalize="none"
              />
            </View>

          
            <View style={styles.inputGroup}>
              <Text style={styles.label}>Email Address</Text>
              <TextInput
                style={styles.input}
                placeholder="Enter your email"
                placeholderTextColor="#64748b"
                keyboardType="email-address"
                value={email}
                onChangeText={setEmail}
                autoCapitalize="none"
              />
            </View>

          
            <View style={styles.inputGroup}>
              <Text style={styles.label}>Password</Text>
              <View style={styles.passwordInputWrapper}>
                <TextInput
                  style={styles.passwordInput}
                  placeholder="Create a password"
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
            </View>

          
            <TouchableOpacity style={styles.loginButton} onPress={handleSignUp}>
              <Text style={styles.loginButtonText}>Sign Up</Text>
              <Ionicons
                name="arrow-forward"
                size={18}
                color="#ffffff"
                style={{ marginLeft: 8 }}
              />
            </TouchableOpacity>
          </View>

          
          <View style={styles.footerContainer}>
            <View style={styles.signUpRow}>
              <Text style={styles.footerText}>Already have an account? </Text>
              <TouchableOpacity onPress={handleLoginRedirect}>
                <Text style={styles.signUpText}>Login</Text>
              </TouchableOpacity>
            </View>
            <Text style={styles.copyrightText}>© 2026 FoundIt App</Text>
          </View>

        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#7cfc00",
  },
  innerContainer: {
    flex: 1,
  },
  scrollContent: {
    flexGrow: 1,
    justifyContent: "space-between",
    paddingHorizontal: 24,
    paddingVertical: 16,
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
    marginVertical: 20,
  },
  titleContainer: {
    marginBottom: 20,
  },
  title: {
    fontSize: 32,
    fontWeight: "900",
    color: "#000000",
    letterSpacing: -0.5,
  },
  subtitle: {
    fontSize: 14,
    color: "#1e293b",
    marginTop: 4,
    fontWeight: "500",
  },
  inputGroup: {
    marginBottom: 14,
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
    flexDirection: 'row',
    width: '100%',
    backgroundColor: '#ffffff',
    borderWidth: 1.5,
    borderColor: '#e2e8f0',
    borderRadius: 12,
    alignItems: 'center',
    shadowColor: '#000',
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
    color: '#1e293b',
    borderWidth: 0,
  },
  visibilityIcon: {
    paddingHorizontal: 14,
    justifyContent: 'center',
    alignItems: 'center',
  },
  loginButton: {
    width: '100%',
    backgroundColor: '#121212',
    paddingVertical: 16,
    borderRadius: 14,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 3,
  },
  loginButtonText: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  footerContainer: {
    width: '100%',
    alignItems: 'center',
    paddingBottom: 10,
    marginTop: 10,
  },
  signUpRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  footerText: {
    fontSize: 14,
    color: '#1e293b',
    fontWeight: '500',
  },
  signUpText: {
    fontSize: 14,
    fontWeight: '700',
    color: '#121212',
    textDecorationLine: 'underline',
  },
  copyrightText: {
    fontSize: 12,
    color: '#1e293b',
    fontWeight: '500',
  },
});