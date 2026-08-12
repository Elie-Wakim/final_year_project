import { useState } from "react";
import {
    Alert,
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    View
} from "react-native";

const API_URL = process.env.EXPO_PUBLIC_API_URL;

export default function App() {
    const [isLogin, setIsLogin] = useState(true);
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    async function submit() {
        const endpoint = isLogin ? "login" : "signup";

        try {
            const response = await fetch(`${API_URL}/api/auth/${endpoint}`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    ...(isLogin ? {} : { name }),
                    email,
                    password
                })
            });

            const data = await response.json();

            if (!response.ok) {
                Alert.alert("Error", data.message);
                return;
            }

            if (isLogin) {
                Alert.alert("Success", `Welcome ${data.user.name}!`);
            } else {
                Alert.alert("Success", `Welcome ${data.name}!`);
                setIsLogin(true);
            }
        } catch (error) {
            Alert.alert("Error", "Could not connect to the server");
            console.error(error);
        }
    }

    return (
        <View style={styles.container}>
            <Text style={styles.title}>
                {isLogin ? "Login" : "Sign Up"}
            </Text>

            {!isLogin && (
                <TextInput
                    style={styles.input}
                    placeholder="Name"
                    value={name}
                    onChangeText={setName}
                />
            )}

            <TextInput
                style={styles.input}
                placeholder="Email"
                keyboardType="email-address"
                autoCapitalize="none"
                value={email}
                onChangeText={setEmail}
            />

            <TextInput
                style={styles.input}
                placeholder="Password"
                secureTextEntry
                value={password}
                onChangeText={setPassword}
            />

            <TouchableOpacity style={styles.button} onPress={submit}>
                <Text style={styles.buttonText}>
                    {isLogin ? "Login" : "Sign Up"}
                </Text>
            </TouchableOpacity>

            <TouchableOpacity onPress={() => setIsLogin(!isLogin)}>
                <Text style={styles.switchText}>
                    {isLogin
                        ? "Don't have an account? Sign Up"
                        : "Already have an account? Login"}
                </Text>
            </TouchableOpacity>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
        padding: 30
    },
    title: {
        fontSize: 32,
        fontWeight: "bold",
        marginBottom: 30,
        textAlign: "center"
    },
    input: {
        borderWidth: 1,
        borderColor: "#ccc",
        borderRadius: 8,
        padding: 14,
        marginBottom: 15,
        fontSize: 16
    },
    button: {
        backgroundColor: "#007AFF",
        padding: 15,
        borderRadius: 8,
        alignItems: "center",
        marginTop: 10
    },
    buttonText: {
        color: "white",
        fontSize: 18,
        fontWeight: "bold"
    },
    switchText: {
        textAlign: "center",
        marginTop: 20,
        color: "#007AFF"
    }
});