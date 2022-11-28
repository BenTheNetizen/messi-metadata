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

app.post("/search", (req, res) => {
  // return first 10 rows
  const {
    games,
    gamesCompare,
    goals,
    goalsCompare,
    assists,
    assistsCompare,
    minutes,
    minutesCompare,
    yellowCards,
    yellowCardsCompare,
    redCards,
    redCardsCompare,
    olympicMedals,
    nameQuery,
    page,
  } = req.body;
  const query = `
    SELECT pretty_name, club_pretty_name, date_of_birth, country_of_citizenship, position, SUM(games_played) as games_played, SUM(goals) as goals, SUM(assists) as assists, AVG(minutes_played) as minutes_played, SUM(yellow_cards) as yellow_cards, SUM(red_cards) as red_cards, olympic
    FROM player_cleaned INNER JOIN player_stats
    ON player_cleaned.player_id = player_stats.player_id
    WHERE 1=1
      ${
        olympicMedals
          ? olympicMedals.map((medal) => `AND olympic like "%${medal}%"`)
          : ""
      }
      ${nameQuery ? `AND pretty_name like "%${nameQuery}%"` : ""}
    GROUP BY player_cleaned.player_id
    HAVING
      ${`SUM(games_played) ${gamesCompare} ${games || 0}`}
      AND ${`SUM(goals) ${goalsCompare} ${goals || 0}`}
      AND ${`SUM(assists) ${assistsCompare} ${assists || 0}`}
      AND ${`AVG(minutes_played) ${minutesCompare} ${minutes || 0}`}
      AND ${`SUM(yellow_cards) ${yellowCardsCompare} ${yellowCards || 0}`}
      AND ${`SUM(red_cards) ${redCardsCompare} ${redCards || 0}`}
    ORDER BY pretty_name ASC
    LIMIT 10 OFFSET ${(page - 1) * 10}`;
  db.all(query, (err, rows) => {
    if (err) {
      throw err;
    }
    res.json(rows);
  });
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
