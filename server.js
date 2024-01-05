const express = require("express");
const mysql = require("mysql");
const bodyParser = require("body-parser");
const app = express();
const port = 3001;
const cors = require("cors");

const connectionParams = {
  host: process.env.DB_HOST || "localhost",
  user: process.env.DB_USER || "root",
  password: process.env.DB_PASSWORD || "none",
  database: process.env.DB_NAME || "recipe_schema",
};

const connection = mysql.createConnection(connectionParams);

connection.connect((err) => {
  if (err) {
    console.error("Error connecting to MySQL database:", err);
  } else {
    console.log("Connected to MySQL database");
  }
});

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.get("/", (req, res) => {
  res.send("Express server.");
});

app.get("/recipes", (req, res) => {
  connection.query("SELECT * FROM recipes", (err, results) => {
    if (err) {
      console.error("Error fetching recipes from database:", err);
      res.status(500).send("Internal Server Error");
    } else {
      res.json(results);
    }
  });
});

app.post("/recipes", (req, res) => {
  const formData = req.body;

  const sql =
    "INSERT INTO recipes (category, title, description, ingredients, instructions, prep_time, cook_time, servings, date_created) VALUES (?, ?, ?, ?, ?, ?, ?, ?, NOW())";

  const values = [
    formData.category,
    formData.title,
    formData.description,
    formData.ingredients,
    formData.instructions,
    formData["prep-time"],
    formData["cook-time"],
    formData.servings,
  ];

  connection.query(sql, values, (err, results) => {
    if (err) {
      console.error("Error adding recipe into the database:", err);
      res.status(500).send("Internal Server Error");
    } else {
      console.log("Recipe added successfully.");
      res.sendStatus(200);
    }
  });
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
