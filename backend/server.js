const express = require('express');
const cors = require('cors');

const app = express();

app.use(cors());
app.use(express.json());

let users = [];

// GET users
app.get('/api/users', (req, res) => {
    res.json(users);
});

// ADD user
app.post('/api/users', (req, res) => {
    const newUser = {
        id: Date.now(),
        name: req.body.name,
        email: req.body.email
    };

    users.push(newUser);
    res.json(newUser);
});

// DELETE user
app.delete('/api/users/:id', (req, res) => {
    users = users.filter(u => u.id != req.params.id);
    res.json({ message: "Deleted" });
});

app.listen(5000, () => {
    console.log("Server running on port 5000"); 
});