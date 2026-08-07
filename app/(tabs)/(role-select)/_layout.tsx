import { Stack } from "expo-router";

export default function RoleSelectLayout() {
    return (
        <Stack
            screenOptions={{
                headerShown: false,
            } }
        >
            <Stack.Screen name="index"/>
        </Stack>
    )
}