import PostCard from "@/components/post-card";
import { Post, POSTS } from "@/data/posts";
import { router } from "expo-router";
import { FlatList, ScrollView, StyleSheet, View, TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";

export default function PostList() {
    const handlePress = (post: Post) => {
        router.push({
            pathname: "/(option)/[id]" as any,
            params: { id: post.postId },
        });
    };

    const handleBack = () => {
        router.back();
    };

   const handleLogout = () => {
       router.dismissAll();
       router.replace("/");
};

    return (
        <ScrollView style={styles.screen}>
            
            <View style={styles.topBarContainer}>
                <TouchableOpacity style={styles.iconButton} onPress={handleBack}>
                    <Ionicons name="arrow-back" size={24} color="#ffffff" />
                </TouchableOpacity>

                <TouchableOpacity style={styles.iconButton} onPress={handleLogout}>
                    <Ionicons name="log-out-outline" size={24} color="#ffffff" />
                </TouchableOpacity>
            </View>

            <FlatList
                data={POSTS}
                keyExtractor={(item) => item.postId}
                renderItem={({ item }) => <PostCard post={item} onPress={handlePress} />}
                contentContainerStyle={styles.list}
                scrollEnabled={false}
            />
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    screen: {
        flex: 1,
        backgroundColor: "#F0F4F8",
    },
    topBarContainer: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        paddingHorizontal: 14,
        paddingTop: 16,
    },
    iconButton: {
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
    list: {
        paddingTop: 12,
        paddingBottom: 32,
    },
});