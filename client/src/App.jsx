import { useEffect, useState } from "react";

function App() {
    const [users, setUsers] = useState([]);

    useEffect(() => {
        fetch("http://localhost:3000/api/users")
            .then(res => res.json())
            .then(data => setUsers(data));
    }, []);

    return (
        <div>
            <h1>Users</h1>

            {users.map(user => (
                <div key={user.id}>
                    <h2>{user.name}</h2>
                    <p>{user.email}</p>
                </div>
            ))}
        </div>
    );
}

export default App;