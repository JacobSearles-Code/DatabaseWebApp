import express from "express";
import mysql2 from "mysql2/promise";
import cors from "cors";
import axios from "axios";
import "dotenv/config";

const { SQL_USER } = process.env;
const { SQL_PASSWORD } = process.env;

const connection = await mysql2.createConnection({
    host: "localhost",
    user: SQL_USER,
    password: SQL_PASSWORD,
    database: "GameTest",
    port: 3306,
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

app.get("/data", async (request, response) => {
    const [rows] = await connection.query('SELECT g.game_name, t.game_type, g.game_info FROM Games g JOIN Game_Types t ON t.type_id = g.type_id; ');
    response.json(rows);
})

app.get("/favouritegames", async (request, response) => {
    const [rows] = await connection.query('SELECT p.full_name, g.game_name, f.hours_played FROM Favourite_Game f JOIN Players p ON p.player_id = f.player_id JOIN Games g ON g.game_id = f.game_id;');
    response.json(rows);
})

app.get("/data/:query", async (request, response) => {
    const { query } = request.params;
    try {
        const [rows] = await connection.query(query);
        response.json(rows);
    } catch (error) {
        console.log(error);
        response.status(501).send(error);
    }
})