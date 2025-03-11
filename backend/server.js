const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
require("dotenv").config();
const db = require("./src/config/config.js");

const app = express();
const PORT = process.env.PORT || 8000;

app.use(cors());
app.use(bodyParser.json());

app.get("/", (req, res) => {
    res.send("Server is running.");
});

app.get("/search", (req, res) => {
    const query = req.query.query;
    
    if (!query) {
        return res.json([]);
    }

    const sql = `SELECT roll_no, student_name, student_image FROM student_info WHERE roll_no LIKE ?`;

    db.query(sql, [`%${query}%`], (err, results) => {
        if (err) {
            console.error("Database query error:", err);
            res.status(500).json({ error: "Database query failed" });
        } else {
            res.json(results);
        }
    });
});

app.get("/student/:roll_no", (req, res) => {
    const rollNo = req.params.roll_no;
    const query = "SELECT * FROM student_info WHERE roll_no = ?";

    db.query(query, [rollNo], (err, result) => {
        if (err) {
            console.error("Database error:", err);
            return res.status(500).json({ error: "Database error", details: err.message });
        }
        if (result.length === 0) {
            return res.status(404).json({ error: "Student not found" });
        }
        res.json(result[0]);
    });
});

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});