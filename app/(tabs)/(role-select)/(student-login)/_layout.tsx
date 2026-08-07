import { Stack } from "expo-router";

export default function StudentRoleSelectLayout() {
    return (
        <Stack
            screenOptions={{
                headerStyle: { backgroundColor: "#0D1F4E" },
                headerTintColor: "#f80606",
                headerTitleStyle:{fontWeight:"bold"},
            } }
        >
            <Stack.Screen name="index" options={{title:"Student Login"}}/>
        </Stack>
    )
}