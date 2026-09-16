import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  FlatList,
  KeyboardAvoidingView,
  Platform,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";
import { useLocalSearchParams, useRouter } from "expo-router";

interface Message {
  id: string;
  text: string;
  sender: "me" | "other";
  timestamp: string;
}

export default function ChatRoomScreen() {
  const router = useRouter();
  const { recipientName } = useLocalSearchParams();
  
  const [messages, setMessages] = useState<Message[]>([
    { id: "1", text: "Hello! Is this item still available?", sender: "me", timestamp: "10:30 AM" },
    { id: "2", text: "Yes it is! You can pick it up at the faculty office.", sender: "other", timestamp: "10:32 AM" },
  ]);
  const [inputText, setInputText] = useState("");

  const handleSendMessage = () => {
    if (!inputText.trim()) return;

    const newMessage: Message = {
      id: Date.now().toString(),
      text: inputText,
      sender: "me",
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    };

    setMessages((prev) => [...prev, newMessage]);
    setInputText("");
  };

  return (
    <SafeAreaView style={styles.container} edges={["top", "left", "right"]}>
      {/* Top Bar */}
      <View style={styles.topBar}>
        <TouchableOpacity style={styles.backButton} onPress={() => router.back()}>
          <Ionicons name="arrow-back" size={24} color="#ffffff" />
        </TouchableOpacity>
        <Text style={styles.recipientTitle}>{recipientName || "Chat"}</Text>
        <View style={{ width: 44 }} /> {/* Spacer to center title */}
      </View>

      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={{ flex: 1 }}
        keyboardVerticalOffset={Platform.OS === "ios" ? 10 : 0}
      >
        {/* Messages List */}
        <FlatList
          data={messages}
          keyExtractor={(item) => item.id}
          contentContainerStyle={styles.messageList}
          renderItem={({ item }) => {
            const isMe = item.sender === "me";
            return (
              <View style={[styles.messageBubble, isMe ? styles.myBubble : styles.otherBubble]}>
                <Text style={[styles.messageText, isMe ? styles.myText : styles.otherText]}>
                  {item.text}
                </Text>
                <Text style={[styles.timestampText, isMe ? styles.myTime : styles.otherTime]}>
                  {item.timestamp}
                </Text>
              </View>
            );
          }}
        />

        {/* Input Bar */}
        <View style={styles.inputContainer}>
          <TextInput
            style={styles.input}
            placeholder="Type a message..."
            placeholderTextColor="#64748b"
            value={inputText}
            onChangeText={setInputText}
            multiline
          />
          <TouchableOpacity style={styles.sendButton} onPress={handleSendMessage}>
            <Ionicons name="send" size={18} color="#ffffff" />
          </TouchableOpacity>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#f8fafc" },
  topBar: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: "#FFFFFF",
    paddingHorizontal: 16,
    paddingVertical: 12,
  },
  backButton: {
    width: 44,
    height: 44,
    backgroundColor: "#111112",
    borderRadius: 12,
    justifyContent: "center",
    alignItems: "center",
  },
  recipientTitle: { fontSize: 18, fontWeight: "800", color: "#111112" },
  messageList: { padding: 16, gap: 12 },
  messageBubble: {
    maxWidth: "75%",
    padding: 12,
    borderRadius: 16,
  },
  myBubble: {
    backgroundColor: "#111112",
    alignSelf: "flex-end",
    borderBottomRightRadius: 4,
  },
  otherBubble: {
    backgroundColor: "#ffffff",
    alignSelf: "flex-start",
    borderBottomLeftRadius: 4,
    borderWidth: 1,
    borderColor: "#e2e8f0",
  },
  messageText: { fontSize: 15 },
  myText: { color: "#ffffff" },
  otherText: { color: "#111112" },
  timestampText: { fontSize: 10, marginTop: 4, alignSelf: "flex-end" },
  myTime: { color: "#94a3b8" },
  otherTime: { color: "#64748b" },
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    padding: 12,
    backgroundColor: "#ffffff",
    borderTopWidth: 1,
    borderTopColor: "#e2e8f0",
  },
  input: {
    flex: 1,
    backgroundColor: "#f1f5f9",
    borderRadius: 20,
    paddingHorizontal: 16,
    paddingVertical: 10,
    fontSize: 15,
    maxHeight: 100,
    color: "#111112",
  },
  sendButton: {
    width: 40,
    height: 40,
    backgroundColor: "#111112",
    borderRadius: 20,
    justifyContent: "center",
    alignItems: "center",
    marginLeft: 8,
  },
});