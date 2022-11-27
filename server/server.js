const express = require("express");
const cors = require("cors");
const app = express();
const port = 4000;
const sqlite3 = require("sqlite3").verbose();

// open the database
let db = new sqlite3.Database(
  "../data/football.db",
  sqlite3.OPEN_READONLY,
  (err) => {
    if (err) {
      console.error(err.message);
    }
    console.log("Connected to the football database.");
  }
);

app.use(express.json());
app.use(cors());

app.get("/", (req, res) => {
  // return first 10 rows
  db.all("SELECT * FROM player_cleaned LIMIT 10", (err, rows) => {
    if (err) {
      throw err;
    }
    res.json(rows);
  });
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
