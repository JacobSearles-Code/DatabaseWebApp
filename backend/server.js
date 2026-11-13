import express from "express";
import mysql2 from "mysql2/promise";
import cors from "cors";
import axios from "axios";
import "dotenv/config";

const { SQL_USER } = process.env;
const { SQL_PASSWORD } = process.env;

const connection = await mysql2.createConnection({
    host: "cpagames.mysql.database.azure.com",
    user: SQL_USER,
    password: SQL_PASSWORD,
    database: "game_lab",
    port: 3306,
    ssl: {
        rejectUnauthorized: true,
    }
})

connection.connect((error) => {
    if (error) {
        console.log(error);
        return;
    }
    console.log("Connected successfully.");
});


const app = express();
app.use(cors());
app.use(express.json());
const port = 3000;

app.listen(port, () => {
    console.log("Server started on port " + port);
})

app.get("/", (req, res) => {
    res.send("Server is Live!");
})

app.get("/data", async (req, res) => {
    const [rows] = await connection.query('SELECT * FROM games');
    res.json(rows);
})