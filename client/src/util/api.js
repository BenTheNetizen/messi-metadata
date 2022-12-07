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

export const searchClubs = async ({
  games,
  gamesCompare,
  totalMarketValue,
  totalMarketValueCompare,
  averageAge,
  averageAgeCompare,
  goals,
  goalsCompare,
  yellowCards,
  yellowCardsCompare,
  teamSize,
  teamSizeCompare,
  assists,
  assistsCompare,
  redCards,
  redCardsCompare,
  foreignersPercentage,
  foreignersPercentageCompare,
  nameQuery,
  page,
}) => {
  const response = await axios.post(`${API_BASE}/searchClubs`, {
    games,
    gamesCompare,
    totalMarketValue,
    totalMarketValueCompare,
    averageAge,
    averageAgeCompare,
    goals,
    goalsCompare,
    yellowCards,
    yellowCardsCompare,
    teamSize,
    teamSizeCompare,
    assists,
    assistsCompare,
    redCards,
    redCardsCompare,
    foreignersPercentage,
    foreignersPercentageCompare,
    nameQuery,
    page,
  });
  return response.data;
};
