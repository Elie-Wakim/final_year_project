const express = require("express");
const cors = require("cors");
const pool = require("./db");
const authRoutes = require("./routes/auth");

const app = express();

app.use(cors());
app.use(express.json());

app.use("/api/auth", authRoutes);

app.get("/", (req, res) => {
    res.json({ message: "API is working!" });
});

app.listen(3000, () => {
    console.log("Server running on http://localhost:3000");
});