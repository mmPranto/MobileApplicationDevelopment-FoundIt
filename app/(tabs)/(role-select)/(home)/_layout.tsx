import { Stack } from "expo-router";

export default function HomeLayout() {
    return (
        <Stack
            screenOptions={{
                headerStyle: { backgroundColor: "#ff0000" },
                headerTintColor: "#FFFFFF",
                headerTitleStyle:{fontWeight:"bold"},
            }}
        >
            <Stack.Screen name="index" options={{title:"Home Page"}}/>
        </Stack>
    );
}