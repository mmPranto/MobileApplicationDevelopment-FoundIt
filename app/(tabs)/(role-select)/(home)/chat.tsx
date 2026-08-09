import React from "react";
import { StyleSheet, Text, View} from "react-native";
import { Ionicons } from "@expo/vector-icons";

export default function Chat() {    
    return (
        <View style={styles.container}>
            <Ionicons name="construct-outline" size={64} color="#94A3B8" />
            <Text style={styles.title}>&quot;Chat&quot; Not Implemented</Text>
            <Text style={styles.subtitle}>This feature is coming soon.</Text>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#FFFFFF",
        justifyContent: "center",
        alignItems: "center",
        padding: 20,
    },
    title: {
        fontSize: 22,
        fontWeight: "800",
        color: "#0D1F4E",
        marginTop: 16,
        marginBottom: 4,
    },
    subtitle: {
        fontSize: 14,
        color: "#64748B",
        marginBottom: 24,
    },
});