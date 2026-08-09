import React from "react";
import { StyleSheet, TouchableOpacity, View, Text } from "react-native";
import { Post } from "@/data/posts"; // Adjust the import path to where your posts data file is located

interface PostCardProps {
  post: Post;
  onPress: (post: Post) => void;
}


const CATEGORY_COLOURS: Record<string, { bg: string; text: string }> = {
  Lost: { bg: "#FEF2F2", text: "#DC2626" },   
  Found: { bg: "#F0FDF4", text: "#16A34A" },  
};

const DEFAULT_COLOUR = { bg: "#F1F5F9", text: "#475569" };

export default function PostCard({ post, onPress }: PostCardProps) {
  const colour = CATEGORY_COLOURS[post.category] ?? DEFAULT_COLOUR;

  return (
    <TouchableOpacity
      style={styles.card}
      onPress={() => onPress(post)}
      activeOpacity={0.7}
    >
      
      <View style={styles.meta}>
        <View style={[styles.badge, { backgroundColor: colour.bg }]}>
          <Text style={[styles.badgeText, { color: colour.text }]}>
            {post.category}
          </Text>
        </View>
        <Text style={styles.date}>{post.date}</Text>
      </View>

      
      <Text style={styles.title} numberOfLines={2}>
        {post.itemTitle}
      </Text>

      
      <Text style={styles.summary} numberOfLines={2}>
        {post.itemDescription}
      </Text>

      
      <View style={styles.footer}>
        <Text style={styles.author}>User: {post.userId}</Text>
        <Text style={styles.viewDetails}>View Details</Text>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: "#FFFFFF",
    borderRadius: 12,
    padding: 16,
    marginHorizontal: 14,
    marginBottom: 12,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.06,
    shadowRadius: 4,
    elevation: 2,
  },
  meta: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 8,
  },
  badge: {
    paddingHorizontal: 10,
    paddingVertical: 3,
    borderRadius: 20,
  },
  badgeText: {
    fontSize: 11,
    fontWeight: "600",
  },
  date: {
    fontSize: 11,
    color: "#94A3B8",
  },
  title: {
    fontSize: 15,
    fontWeight: "700",
    color: "#0D1F4E",
    lineHeight: 22,
    marginBottom: 6,
  },
  summary: {
    fontSize: 13,
    color: "#64748B",
    lineHeight: 19,
    marginBottom: 12,
  },
  footer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  author: {
    fontSize: 12,
    color: "#94A3B8",
    fontStyle: "italic",
  },
  viewDetails: {
    fontSize: 12,
    color: "#0D9488",
    fontWeight: "600",
  },
});