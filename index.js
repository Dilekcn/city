const express = require("express");
const app = express();
const cors = require("cors");
const port = process.env.PORT || 3005;
const pool = require("./db");
require("dotenv").config();

app.use(cors());
app.use(express.json());

//Routes
//Create City
app.post("/city", async (req, res) => {
  try {
    const { name } = req.body;
    const newCity = await pool.query(
      "INSERT INTO city (name) VALUES($1) RETURNING *",
      [name]
    );
    res.json(newCity.rows[0]);
  } catch (err) {
    console.error(err.message);
  }
});

app.get("/city", async (req, res) => {
  try {
    const selectCity = await pool.query(
      "SELECT *FROM city ORDER BY RANDOM() LIMIT 1"
    );

    res.json(selectCity.rows);
  } catch (err) {
    console.error(err.message);
  }
});

app.get("/", (req, res) => res.send("Hello World!"));
app.listen(port, () => console.log(`Example app listening on port ${port}!`));
