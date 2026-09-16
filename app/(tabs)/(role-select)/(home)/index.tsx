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
  Image,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";

export default function ProfileScreen() {
  const router = useRouter();

 
  const [fullName, setFullName] = useState("John Doe");
  const [email, setEmail] = useState("john.doe@university.edu");
  const [identifier, setIdentifier] = useState("23-50176-1"); // Student or Teacher ID
  const [role, setRole] = useState<"student" | "teacher">("student");

 
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [isPasswordSectionOpen, setIsPasswordSectionOpen] = useState(false);

 
  const [profileImage, setProfileImage] = useState<string | null>(null);

 
  const handleUpdateProfile = () => {
    if (!fullName.trim() || !email.trim()) {
      Alert.alert("Error", "Name and email cannot be empty.");
      return;
    }
    Alert.alert("Success", "Profile updated successfully!");
 
  };

 
  const handleChangePassword = () => {
    if (!currentPassword || !newPassword || !confirmPassword) {
      Alert.alert("Error", "Please fill in all password fields.");
      return;
    }
    if (newPassword !== confirmPassword) {
      Alert.alert("Error", "New passwords do not match.");
      return;
    }
    if (newPassword.length < 8) {
      Alert.alert("Error", "New password must be at least 8 characters long.");
      return;
    }

    Alert.alert("Success", "Password changed successfully!");
    setCurrentPassword("");
    setNewPassword("");
    setConfirmPassword("");
    setIsPasswordSectionOpen(false);
 
  };

 
  const handleChangeImage = () => {
    Alert.alert(
      "Profile Image",
      "Choose an option to change your profile picture.",
      [
        { text: "Cancel", style: "cancel" },
        {
          text: "Take Photo",
          onPress: () => console.log("Open Camera"),
        },
        {
          text: "Choose from Gallery",
          onPress: () => console.log("Open Gallery"),
        },
      ],
    );
 
  };

 
  const handleDeleteAccount = () => {
    Alert.alert(
      "Delete Account",
      "Are you sure you want to delete your account? This action cannot be undone.",
      [
        { text: "Cancel", style: "cancel" },
        {
          text: "Delete",
          style: "destructive",
          onPress: () => {
            console.log("Account deleted");
 
            router.replace("/login");
          },
        },
      ],
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={{ flex: 1 }}
      >
        <ScrollView contentContainerStyle={styles.scrollContent}>
 
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

          <Text style={styles.title}>Profile Settings</Text>

 
          <View style={styles.avatarContainer}>
            <TouchableOpacity
              onPress={handleChangeImage}
              style={styles.avatarWrapper}
            >
              {profileImage ? (
                <Image
                  source={{ uri: profileImage }}
                  style={styles.avatarImage}
                />
              ) : (
                <View style={styles.avatarPlaceholder}>
                  <Ionicons name="person" size={40} color="#ffffff" />
                </View>
              )}
              <View style={styles.cameraBadge}>
                <Ionicons name="camera" size={14} color="#ffffff" />
              </View>
            </TouchableOpacity>
            <Text style={styles.roleBadgeText}>
              {role.toUpperCase()} • ID: {identifier}
            </Text>
          </View>

 
          <View style={styles.sectionCard}>
            <Text style={styles.sectionTitle}>Personal Information</Text>

            <View style={styles.inputGroup}>
              <Text style={styles.label}>Full Name</Text>
              <TextInput
                style={styles.input}
                value={fullName}
                onChangeText={setFullName}
                placeholder="Enter your full name"
              />
            </View>

            <View style={styles.inputGroup}>
              <Text style={styles.label}>Email Address</Text>
              <TextInput
                style={styles.input}
                value={email}
                onChangeText={setEmail}
                placeholder="Enter your email"
                keyboardType="email-address"
                autoCapitalize="none"
              />
            </View>

            <TouchableOpacity
              style={styles.primaryButton}
              onPress={handleUpdateProfile}
            >
              <Text style={styles.primaryButtonText}>Save Changes</Text>
            </TouchableOpacity>
          </View>

 
          <View style={styles.sectionCard}>
            <TouchableOpacity
              style={styles.accordionHeader}
              onPress={() => setIsPasswordSectionOpen(!isPasswordSectionOpen)}
            >
              <Text style={styles.sectionTitle}>Change Password</Text>
              <Ionicons
                name={isPasswordSectionOpen ? "chevron-up" : "chevron-down"}
                size={20}
                color="#111112"
              />
            </TouchableOpacity>

            {isPasswordSectionOpen && (
              <View style={{ marginTop: 10 }}>
                <View style={styles.inputGroup}>
                  <Text style={styles.label}>Current Password</Text>
                  <TextInput
                    style={styles.input}
                    placeholder="Enter current password"
                    secureTextEntry
                    value={currentPassword}
                    onChangeText={setCurrentPassword}
                  />
                </View>

                <View style={styles.inputGroup}>
                  <Text style={styles.label}>New Password</Text>
                  <TextInput
                    style={styles.input}
                    placeholder="Enter new password"
                    secureTextEntry
                    value={newPassword}
                    onChangeText={setNewPassword}
                  />
                </View>

                <View style={styles.inputGroup}>
                  <Text style={styles.label}>Confirm New Password</Text>
                  <TextInput
                    style={styles.input}
                    placeholder="Re-enter new password"
                    secureTextEntry
                    value={confirmPassword}
                    onChangeText={setConfirmPassword}
                  />
                </View>

                <TouchableOpacity
                  style={styles.primaryButton}
                  onPress={handleChangePassword}
                >
                  <Text style={styles.primaryButtonText}>Update Password</Text>
                </TouchableOpacity>
              </View>
            )}
          </View>

 
          <View style={styles.dangerCard}>
            <Text style={styles.dangerTitle}>Danger Zone</Text>
            <Text style={styles.dangerDescription}>
              Once you delete your account, there is no going back. Please be
              certain.
            </Text>
            <TouchableOpacity
              style={styles.deleteButton}
              onPress={handleDeleteAccount}
            >
              <Text style={styles.deleteButtonText}>Delete Account</Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#FFFFFF" },
  scrollContent: { padding: 24, paddingBottom: 40 },
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
    color: "#000000",
    letterSpacing: -0.5,
  },
  title: {
    fontSize: 32,
    fontWeight: "900",
    marginBottom: 20,
      color: "#111112",
      textAlign:"center"
  },
  avatarContainer: {
    alignItems: "center",
    marginBottom: 24,
  },
  avatarWrapper: {
    position: "relative",
    marginBottom: 8,
  },
  avatarPlaceholder: {
    width: 90,
    height: 90,
    borderRadius: 45,
    backgroundColor: "#111112",
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 3,
    borderColor: "#ffffff",
  },
  avatarImage: {
    width: 90,
    height: 90,
    borderRadius: 45,
    borderWidth: 3,
    borderColor: "#ffffff",
  },
  cameraBadge: {
    position: "absolute",
    bottom: 0,
    right: 0,
    backgroundColor: "#111112",
    padding: 6,
    borderRadius: 12,
    borderWidth: 2,
    borderColor: "#ffffff",
  },
  roleBadgeText: {
    fontSize: 13,
    fontWeight: "700",
    color: "#111112",
  },
  sectionCard: {
    backgroundColor: "#ffffff",
    borderRadius: 16,
    padding: 16,
    marginBottom: 16,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: "800",
    color: "#111112",
  },
  accordionHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  inputGroup: { marginTop: 12 },
  label: { fontSize: 12, fontWeight: "700", color: "#111112", marginBottom: 4 },
  input: {
    backgroundColor: "#f8fafc",
    borderWidth: 1.5,
    borderColor: "#e2e8f0",
    borderRadius: 10,
    padding: 12,
    fontSize: 14,
  },
  primaryButton: {
    backgroundColor: "#111112",
    padding: 14,
    borderRadius: 12,
    alignItems: "center",
    marginTop: 16,
  },
  primaryButtonText: { color: "#ffffff", fontSize: 15, fontWeight: "bold" },
  dangerCard: {
    backgroundColor: "#fef2f2",
    borderWidth: 1.5,
    borderColor: "#fecaca",
    borderRadius: 16,
    padding: 16,
    marginBottom: 20,
  },
  dangerTitle: {
    fontSize: 16,
    fontWeight: "800",
    color: "#dc2626",
    marginBottom: 4,
  },
  dangerDescription: {
    fontSize: 13,
    color: "#7f1d1d",
    marginBottom: 12,
  },
  deleteButton: {
    backgroundColor: "#dc2626",
    padding: 14,
    borderRadius: 12,
    alignItems: "center",
  },
  deleteButtonText: { color: "#ffffff", fontSize: 15, fontWeight: "bold" },
});
