import { useState } from "react";

const API_URL = import.meta.env.VITE_API_URL;

function App() {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [message, setMessage] = useState("");

    async function signup(e) {
        e.preventDefault();

        const response = await fetch(`${API_URL}/api/auth/signup`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ name, email, password })
        });

        const data = await response.json();

        if (!response.ok) {
            setMessage(data.message);
            return;
        }

        setMessage(`Welcome ${data.name}!`);
    }

    return (
        <div>
            <h1>Sign Up</h1>

            <form onSubmit={signup}>
                <input
                    placeholder="Name"
                    value={name}
                    onChange={e => setName(e.target.value)}
                />

                <input
                    placeholder="Email"
                    type="email"
                    value={email}
                    onChange={e => setEmail(e.target.value)}
                />

                <input
                    placeholder="Password"
                    type="password"
                    value={password}
                    onChange={e => setPassword(e.target.value)}
                />

                <button type="submit">Sign Up</button>
            </form>

            <p>{message}</p>
        </div>
    );
}

export default App;