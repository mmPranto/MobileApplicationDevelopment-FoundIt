import { POSTS } from "@/data/posts";
import { useLocalSearchParams, useNavigation, router } from "expo-router";
import { useEffect } from "react";
import { ScrollView, Text, StyleSheet, View, TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";

type PostParams = { id: string };

const CATEGORY_COLOURS: Record<string, { bg: string; text: string }> = {
  Lost: { bg: "#FEF2F2", text: "#DC2626" },   
  Found: { bg: "#F0FDF4", text: "#16A34A" },  
};
const DEFAULT_COLOUR = { bg: "#F1F5F9", text: "#475569" };

export default function PostDetail() {
  const { id } = useLocalSearchParams<PostParams>();
  const navigation = useNavigation();

  const post = POSTS.find((p) => p.postId === id);

  useEffect(() => {
    if (post) {
      navigation.setOptions({ title: post.itemTitle });
    }
  }, [post]);

  const handleBack = () => {
    router.back();
  };

  if (!post) {
    return (
      <View style={styles.screen}>
        <TouchableOpacity style={styles.backButton} onPress={handleBack}>
          <Ionicons name="arrow-back" size={24} color="#ffffff" />
        </TouchableOpacity>
        <Text style={styles.notFound}>Post Not Found</Text>
      </View>
    );
  }

  const colour = CATEGORY_COLOURS[post.category] ?? DEFAULT_COLOUR;

  return (
    <ScrollView style={styles.screen}>
      <ScrollView style={styles.content}>
        
        {/* Top Back Button */}
        <TouchableOpacity style={styles.backButton} onPress={handleBack}>
          <Ionicons name="arrow-back" size={24} color="#ffffff" />
        </TouchableOpacity>

        {/* Category Badge */}
        <View style={[styles.badge, { backgroundColor: colour.bg }]}>
          <Text style={[styles.badgeText, { color: colour.text }]}>
            {post.category}
          </Text>
        </View>

        {/* Title */}
        <Text style={styles.title}>{post.itemTitle}</Text>

        {/* Meta */}
        <View style={styles.meta}>
          <Text style={styles.author}>Posted by: {post.userId}</Text>
          <Text style={styles.date}>{post.date}</Text>
        </View>

        <View style={styles.divider} />

        {/* Description Body */}
        {post.itemDescription.split("\n\n").map((para, i) => (
          <Text key={i} style={styles.body}>
            {para}
          </Text>
        ))}
      </ScrollView>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: "#FFFFFF",
  },
  content: {
    padding: 20,
    paddingBottom: 48,
  },
  backButton: {
    width: 48,
    height: 48,
    backgroundColor: "#121212",
    borderRadius: 14,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 16,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 3,
    elevation: 4,
  },
  badge: {
    alignSelf: "flex-start",
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderRadius: 20,
    marginBottom: 14,
  },
  badgeText: {
    fontSize: 12,
    fontWeight: "800",
  },
  title: {
    fontSize: 22,
    fontWeight: "800",
    color: "#0D1F4E",
    lineHeight: 30,
    marginBottom: 12,
  },
  meta: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 16,
  },
  author: {
    fontSize: 13,
    color: "#64748B",
    fontStyle: "italic",
  },
  date: {
    fontSize: 13,
    color: "#94A3B8",
  },
  divider: {
    height: 1,
    backgroundColor: "#F1F5F9",
    marginBottom: 20,
  },
  body: {
    fontSize: 15,
    color: "#334155",
    lineHeight: 24,
    marginBottom: 16,
  },
  notFound: {
    padding: 40,
    textAlign: "center",
    color: "#94A3B8",
  },
});