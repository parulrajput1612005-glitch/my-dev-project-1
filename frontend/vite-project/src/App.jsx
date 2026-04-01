import React, { useState, useEffect } from "react";
import "./App.css";

function App() {
  const [users, setUsers] = useState([]);
  const [name, setName] = useState("");

  const getUsers = async () => {
    const res = await fetch("http://localhost:5000/api/users");
    const data = await res.json();
    setUsers(data);
  };

  const addUser = async () => {
    if (!name) return;
    await fetch("http://localhost:5000/api/users", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ name }),
    });

    setName("");
    getUsers();
  };

  const deleteUser = async (id) => {
    await fetch(`http://localhost:5000/api/users/${id}`, {
      method: "DELETE",
    });
    getUsers();
  };

  useEffect(() => {
    getUsers();
  }, []);

  return (
    <div className="container">
      <h1>User Manager</h1>

      <div className="input-box">
        <input
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Enter name"
        />
        <button onClick={addUser}>Add</button>
      </div>

      <ul>
        {users.map((user) => (
          <li key={user.id}>
            {user.name}
            <button onClick={() => deleteUser(user.id)}>❌</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;
