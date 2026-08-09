import { Stack } from "expo-router";

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
            <Stack.Screen name="index" options={{title:"Option Page"}}/>
        </Stack>
    );
}