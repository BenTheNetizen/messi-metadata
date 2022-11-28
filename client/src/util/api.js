import axios from "axios";

// replace with env variable eventually
const API_BASE = "http://localhost:4000";

export const searchPlayers = async ({
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
}) => {
  const response = await axios.post(`${API_BASE}/search`, {
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
  });
  return response.data;
};
