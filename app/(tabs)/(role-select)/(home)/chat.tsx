import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  ScrollView,
  TouchableOpacity,
  Image,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";


const ALL_USERS = [
  { id: "1", name: "Prof. Alan Turing", role: "Teacher", avatar: null },
  { id: "2", name: "Jane Doe", role: "Student", avatar: null },
  { id: "3", name: "Dr. Marie Curie", role: "Teacher", avatar: null },
];

export default function MessagesScreen() {
  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState("");

  const filteredUsers =
    searchQuery.trim() === ""
      ? []
      : ALL_USERS.filter((user) =>
          user.name.toLowerCase().includes(searchQuery.toLowerCase()),
        );

  const handleSelectUser = (userId: string, userName: string) => {
    router.push({
      pathname: "/(home)/chat-room",
      params: { recipientId: userId, recipientName: userName },
    });
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Messages</Text>
      </View>

      {/* Top Search Bar */}
      <View style={styles.searchContainer}>
        <Ionicons
          name="search"
          size={20}
          color="#64748b"
          style={styles.searchIcon}
        />
        <TextInput
          style={styles.searchInput}
          placeholder="Search user by name..."
          placeholderTextColor="#64748b"
          value={searchQuery}
          onChangeText={setSearchQuery}
        />
        {searchQuery.length > 0 && (
          <TouchableOpacity onPress={() => setSearchQuery("")}>
            <Ionicons name="close-circle" size={18} color="#64748b" />
          </TouchableOpacity>
        )}
      </View>

      <ScrollView contentContainerStyle={styles.contentContainer}>
        {searchQuery.trim().length > 0 ? (
          <View>
            <Text style={styles.sectionLabel}>Search Results</Text>
            {filteredUsers.length > 0 ? (
              filteredUsers.map((user) => (
                <TouchableOpacity
                  key={user.id}
                  style={styles.userCard}
                  onPress={() => handleSelectUser(user.id, user.name)}
                >
                  <View style={styles.avatarPlaceholder}>
                    <Ionicons name="person" size={20} color="#ffffff" />
                  </View>
                  <View>
                    <Text style={styles.userName}>{user.name}</Text>
                    <Text style={styles.userRole}>{user.role}</Text>
                  </View>
                </TouchableOpacity>
              ))
            ) : (
              <Text style={styles.noResultsText}>No users found.</Text>
            )}
          </View>
        ) : (
          
          <View>
            <Text style={styles.sectionLabel}>Recent Chats</Text>
            
            <TouchableOpacity
              style={styles.userCard}
              onPress={() => handleSelectUser("1", "Prof. Alan Turing")}
            >
              <View style={styles.avatarPlaceholder}>
                <Ionicons name="person" size={20} color="#ffffff" />
              </View>
              <View style={{ flex: 1 }}>
                <View style={styles.chatHeaderRow}>
                  <Text style={styles.userName}>Prof. Alan Turing</Text>
                  <Text style={styles.timestamp}>10:45 AM</Text>
                </View>
                <Text style={styles.lastMessage} numberOfLines={1}>
                  Make sure to check the assignment details...
                </Text>
              </View>
            </TouchableOpacity>
          </View>
        )}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "rgb(255, 255, 255)" },
  header: { paddingHorizontal: 24, paddingVertical: 16 },
  headerTitle: { fontSize: 28, fontWeight: "900", color: "#111112" },
  searchContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#ffffff",
    marginHorizontal: 24,
    borderRadius: 12,
    paddingHorizontal: 12,
    paddingVertical: 10,
    borderWidth: 1.5,
    borderColor: "#e2e8f0",
    marginBottom: 16,
  },
  searchIcon: { marginRight: 8 },
  searchInput: { flex: 1, fontSize: 15, color: "#111112" },
  contentContainer: { paddingHorizontal: 24, paddingBottom: 24 },
  sectionLabel: {
    fontSize: 13,
    fontWeight: "700",
    color: "#111112",
    marginBottom: 12,
  },
  userCard: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#ffffff",
    padding: 12,
    borderRadius: 12,
    marginBottom: 8,
    gap: 12,
  },
  avatarPlaceholder: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: "#111112",
    justifyContent: "center",
    alignItems: "center",
  },
  userName: { fontSize: 15, fontWeight: "700", color: "#111112" },
  userRole: { fontSize: 12, color: "#64748b" },
  chatHeaderRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 2,
  },
  timestamp: { fontSize: 11, color: "#64748b" },
  lastMessage: { fontSize: 13, color: "#475569" },
  noResultsText: {
    textAlign: "center",
    color: "#111112",
    marginTop: 20,
    fontStyle: "italic",
  },
});
