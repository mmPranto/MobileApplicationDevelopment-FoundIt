import React, { useState } from "react";
import { StyleSheet, Text, TextInput, ScrollView, TouchableOpacity, Alert,View } from "react-native";
import { POSTS, Post } from "@/data/posts";

export default function PostInputFieldForm() {
    const [postId, setPostId] = useState("");
    const [userId, setUserId] = useState("");
    const [itemTitle, setItemTitle] = useState("");
    const [category, setCategory] = useState<"Lost" | "Found">("Lost");
    const [itemDescription, setItemDescription] = useState("");
    const [date, setDate] = useState("");

    const handleSubmit = () => {
        if (!postId || !userId || !itemTitle || !itemDescription || !date) {
            Alert.alert("Error", "Please fill in all fields.");
            return;
        }

        // const newPost: Post = {
        //     postId,
        //     userId,
        //     itemTitle,
        //     category,
        //     itemDescription,
        //     date,
        // };

        // POSTS.unshift(newPost);
        // Alert.alert("Success", "Post submitted successfully!");
    };

    return (
        <ScrollView style={styles.screen} contentContainerStyle={styles.container}>
            <Text style={styles.label}>Post ID</Text>
            <TextInput
                style={styles.input}
                placeholder="Enter post ID"
                placeholderTextColor="#94A3B8"
                value={postId}
                onChangeText={setPostId}
            />

            <Text style={styles.label}>User ID</Text>
            <TextInput
                style={styles.input}
                placeholder="Enter user ID"
                placeholderTextColor="#94A3B8"
                value={userId}
                onChangeText={setUserId}
            />

            <Text style={styles.label}>Item Title</Text>
            <TextInput
                style={styles.input}
                placeholder="Enter item title"
                placeholderTextColor="#94A3B8"
                value={itemTitle}
                onChangeText={setItemTitle}
            />

            <Text style={styles.label}>Category</Text>
            
            <View style={styles.categoryContainer}>
                {(["Lost", "Found"] as const).map((cat) => (
                    <TouchableOpacity
                        key={cat}
                        style={[styles.categoryButton, category === cat && (cat === "Lost" ? styles.lostActive : styles.foundActive)]}
                        onPress={() => setCategory(cat)}
                    >
                        <Text style={[styles.categoryButtonText, category === cat && styles.activeText]}>{cat}</Text>
                    </TouchableOpacity>
                ))}
            </View>

            <Text style={styles.label}>Item Description</Text>
            <TextInput
                style={[styles.input, styles.textArea]}
                placeholder="Enter item description"
                placeholderTextColor="#94A3B8"
                multiline
                numberOfLines={4}
                textAlignVertical="top"
                value={itemDescription}
                onChangeText={setItemDescription}
            />

            <Text style={styles.label}>Date</Text>
            <TextInput
                style={styles.input}
                placeholder="Enter date"
                placeholderTextColor="#94A3B8"
                value={date}
                onChangeText={setDate}
            />

            {/* Submit Button Added Here */}
            <TouchableOpacity style={styles.submitButton} onPress={handleSubmit}>
                <Text style={styles.submitButtonText}>Submit Post</Text>
            </TouchableOpacity>
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    screen: {
        flex: 1,
        backgroundColor: "#FFFFFF",
    },
    container: {
        padding: 20,
        paddingBottom: 48,
    },
    label: {
        fontSize: 14,
        fontWeight: "700",
        color: "#1E293B",
        marginBottom: 6,
    },
    input: {
        backgroundColor: "#F8FAFC",
        borderWidth: 1,
        borderColor: "#E2E8F0",
        borderRadius: 12,
        paddingHorizontal: 16,
        paddingVertical: 12,
        fontSize: 15,
        color: "#0F172A",
        marginBottom: 16,
    },
    textArea: {
        height: 100,
        paddingTop: 12,
    },
    categoryContainer: {
        flexDirection: "row",
        gap: 12,
        marginBottom: 16,
    },
    categoryButton: {
        flex: 1,
        paddingVertical: 12,
        borderRadius: 12,
        borderWidth: 1,
        borderColor: "#E2E8F0",
        alignItems: "center",
        backgroundColor: "#F8FAFC",
    },
    lostActive: {
        backgroundColor: "#FEF2F2",
        borderColor: "#DC2626",
    },
    foundActive: {
        backgroundColor: "#F0FDF4",
        borderColor: "#16A34A",
    },
    categoryButtonText: {
        fontSize: 14,
        fontWeight: "600",
        color: "#64748B",
    },
    activeText: {
        color: "#0F172A",
        fontWeight: "700",
    },
    submitButton: {
        backgroundColor: "#0D9488",
        borderRadius: 14,
        paddingVertical: 16,
        alignItems: "center",
        marginTop: 10,
        shadowColor: "#0D9488",
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.2,
        shadowRadius: 8,
        elevation: 3,
    },
    submitButtonText: {
        color: "#FFFFFF",
        fontSize: 16,
        fontWeight: "700",
    },
});