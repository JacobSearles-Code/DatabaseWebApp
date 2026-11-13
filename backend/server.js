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

app.get("/data", async (request, response) => {
    try {
        const [rows] = await connection.query('SELECT g.title, t.type_name, g.about FROM games g JOIN game_types t ON t.type_id = g.type_id; ');
        const page = Number(request.query.page) || 1;
        const pageSize = Number(request.query.pageSize) || 5;
        const totalItems = rows.length;
        const totalPages = Math.ceil(totalItems / pageSize);
        const startIndex = (page - 1) * pageSize;
        const endIndex = startIndex + pageSize;
        const paginatedInventory = rows.slice(
            startIndex,
            endIndex
        );
        response.json({
            rows: paginatedInventory,
            pagination: {
                page,
                pageSize,
                totalItems,
                totalPages
            }
        });
    } catch (error) {
        response.status(500).send(error);
    }
})

app.get("/favouritegames", async (request, response) => {
    try {
    const [rows] = await connection.query('SELECT p.full_name, g.title, f.hours_played FROM favourite_games f JOIN players p ON p.player_id = f.player_id JOIN games g ON g.game_id = f.game_id;');
    const page = Number(request.query.page) || 1
    const pageSize = Number(request.query.pageSize) || 15
    const totalItems = rows.length
    const totalPages = Math.ceil(totalItems / pageSize)
    // Convert page number into an array index
    const startIndex = (page - 1) * pageSize
    const endIndex = startIndex + pageSize
    // Only return the requested page
    const paginatedInventory = rows.slice(
        startIndex,
        endIndex
    )
    response.json({
        rows: paginatedInventory,
        pagination: {
            page,
            pageSize,
            totalItems,
            totalPages
        }
    })
    } catch (error) {
        response.status(500).send(error);
    }
});

app.get("/data/:newQuery", async (request, response) => {
    const { newQuery } = request.params;
    const page = Number(request.query.page) || 1
    const pageSize = Number(request.query.pageSize) || 15
    try {
        const [rows] = await connection.query(newQuery);
        const page = Number(request.query.page) || 1;
        const pageSize = Number(request.query.pageSize) || 5;
        const totalItems = rows.length;
        const totalPages = Math.ceil(totalItems / pageSize);
        const startIndex = (page - 1) * pageSize;
        const endIndex = startIndex + pageSize;
        const paginatedInventory = rows.slice(
            startIndex,
            endIndex
        );
        response.json({
            rows: paginatedInventory,
            pagination: {
                page,
                pageSize,
                totalItems,
                totalPages
            }
        });
    } catch (error) {
        console.log(error);
        response.status(501).send({message: error.sqlMessage});
    }
})