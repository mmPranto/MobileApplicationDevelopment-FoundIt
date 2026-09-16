import { Stack } from "expo-router";
import React from "react";

export default function OptionLayout() {
    return (
        <Stack
            screenOptions={{
                // headerStyle: { backgroundColor: "#ff0000" },
                // headerTintColor: "#FFFFFF",
                // headerTitleStyle:{fontWeight:"bold"},
                headerShown:false
            }}
        >
            <Stack.Screen name="index" options={{ title: "Messages" }} />
            <Stack.Screen name="chat-room" options={ {title:"Chat Room"}} />
        </Stack>
    );
}