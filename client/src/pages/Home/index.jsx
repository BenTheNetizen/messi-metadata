import React, { useCallback, useEffect, useMemo, useState } from "react";
import dayjs from "dayjs";
import _ from "lodash-es";
import Select from "react-select";
import { Input, Text } from "../../ui";
import { API } from "../../util";

import * as Styles from "./styles";

const compareOptions = [
  { value: ">=", label: "≥" },
  { value: "<=", label: "≤" },
  { value: ">", label: ">" },
  { value: "<", label: "<" },
  { value: "=", label: "=" },
];

const olympicOptions = [
  { value: "gold", label: "Gold" },
  { value: "silver", label: "Silver" },
  { value: "bronze", label: "Bronze" },
];

const MODES = {
  PLAYER: "player",
  CLUB: "club",
};

export const Home = () => {
  const [games, setGames] = useState(0);
  const [gamesCompare, setGamesCompare] = useState(compareOptions[0]);
  const [goals, setGoals] = useState(0);
  const [goalsCompare, setGoalsCompare] = useState(compareOptions[0]);
  const [assists, setAssists] = useState(0);
  const [assistsCompare, setAssistsCompare] = useState(compareOptions[0]);
  const [minutes, setMinutes] = useState(0);
  const [minutesCompare, setMinutesCompare] = useState(compareOptions[0]);
  const [yellowCards, setYellowCards] = useState(0);
  const [yellowCardsCompare, setYellowCardsCompare] = useState(
    compareOptions[0]
  );
  const [redCards, setRedCards] = useState(0);
  const [redCardsCompare, setRedCardsCompare] = useState(compareOptions[0]);
  const [olympicMedals, setOlympicMedals] = useState(null);
  const [nameQuery, setNameQuery] = useState("");
  const [players, setPlayers] = useState([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [minYear, setMinYear] = useState(null);
  const [maxYear, setMaxYear] = useState(null);
  const [fromYear, setFromYear] = useState(null);
  const [toYear, setToYear] = useState(null);

  const yearOptions = useMemo(() => {
    if (!minYear || !maxYear) return [];
    const years = [];
    for (let i = minYear; i <= maxYear; i++) {
      years.push({ value: i, label: i });
    }
    return years;
  }, [minYear, maxYear]);

  const [isClubMode, setIsClubMode] = useState(false);
  const [clubs, setClubs] = useState([]);
  const [totalMarketValue, setTotalMarketValue] = useState(0);
  const [totalMarketValueCompare, setTotalMarketValueCompare] = useState(
    compareOptions[0]
  );
  const [averageAge, setAverageAge] = useState(0);
  const [averageAgeCompare, setAverageAgeCompare] = useState(compareOptions[0]);
  const [foreignersPercentage, setForeignersPercentage] = useState(0);
  const [foreignersPercentageCompare, setForeignersPercentageCompare] =
    useState(compareOptions[0]);
  const [teamSize, setTeamSize] = useState(0);
  const [teamSizeCompare, setTeamSizeCompare] = useState(compareOptions[0]);

  const search = async (params) => {
    setLoading(true);
    const res = await API.searchPlayers(params);
    setLoading(false);
    setPlayers(res || []);
  };

  const searchDebounced = useCallback(
    _.debounce(search, 500, {
      leading: true,
      trailing: true,
    }),
    []
  );

  const searchClubs = async (params) => {
    setLoading(true);
    const res = await API.searchClubs(params);
    setLoading(false);
    setClubs(res || []);
  };

  const searchClubsDebounced = useCallback(
    _.debounce(searchClubs, 500, {
      leading: true,
      trailing: true,
    }),
    []
  );

  useEffect(() => {
    API.getMinMaxYears().then((res) => {
      setMinYear(res?.minYear);
      setMaxYear(res?.maxYear);
      setFromYear(res?.minYear);
      setToYear(res?.maxYear);
    });
  }, []);

  useEffect(() => {
    if (!fromYear || (!toYear && !isClubMode)) return;
    if (isClubMode) {
      searchClubsDebounced({
        games,
        gamesCompare: gamesCompare.value,
        totalMarketValue,
        totalMarketValueCompare: totalMarketValueCompare.value,
        averageAge,
        averageAgeCompare: averageAgeCompare.value,
        goals,
        goalsCompare: goalsCompare.value,
        yellowCards,
        yellowCardsCompare: yellowCardsCompare.value,
        teamSize,
        teamSizeCompare: teamSizeCompare.value,
        assists,
        assistsCompare: assistsCompare.value,
        redCards,
        redCardsCompare: redCardsCompare.value,
        foreignersPercentage,
        foreignersPercentageCompare: foreignersPercentageCompare.value,
        nameQuery,
        page,
      });
    } else {
      searchDebounced({
        games,
        gamesCompare: gamesCompare.value,
        goals,
        goalsCompare: goalsCompare.value,
        assists,
        assistsCompare: assistsCompare.value,
        minutes,
        minutesCompare: minutesCompare.value,
        yellowCards,
        yellowCardsCompare: yellowCardsCompare.value,
        redCards,
        redCardsCompare: redCardsCompare.value,
        olympicMedals: olympicMedals?.map((option) => option.value),
        nameQuery,
        page,
        fromYear,
        toYear,
      });
    }
  }, [
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
    searchDebounced,
    page,
    fromYear,
    toYear,
    totalMarketValue,
    totalMarketValueCompare,
    averageAge,
    averageAgeCompare,
    foreignersPercentage,
    foreignersPercentageCompare,
    teamSize,
    teamSizeCompare,
    searchClubsDebounced,
    isClubMode,
  ]);

  useEffect(() => {
    setPage(1);
  }, [
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
    searchDebounced,
    totalMarketValue,
    totalMarketValueCompare,
    averageAge,
    averageAgeCompare,
    foreignersPercentage,
    foreignersPercentageCompare,
    teamSize,
    teamSizeCompare,
  ]);

  const setClubMode = (mode) => {
    if (mode === MODES.PLAYER) {
      setIsClubMode(false);
    } else if (mode === MODES.CLUB) {
      setIsClubMode(true);
    }
  };
  return (
    <Styles.Container>
      <Styles.HeaderContainer>
        <Text type="text-t1">Mode: </Text>
        <Styles.Button
          onClick={() => {
            setClubMode(MODES.PLAYER);
          }}
          selected={!isClubMode}
        >
          Player
        </Styles.Button>
        <Styles.Button
          onClick={() => {
            setClubMode(MODES.CLUB);
          }}
          selected={isClubMode}
        >
          Club
        </Styles.Button>
      </Styles.HeaderContainer>
      {isClubMode ? (
        <Styles.Content>
          <Styles.SortFilterContainer>
            <Styles.SortFilterColumn>
              <NumericFilter
                label="Games Played"
                value={games}
                setValue={setGames}
                compareValue={gamesCompare}
                setCompareValue={setGamesCompare}
              />
              <NumericFilter
                label="Total Market Value (millions)"
                value={totalMarketValue}
                setValue={setTotalMarketValue}
                compareValue={totalMarketValueCompare}
                setCompareValue={setTotalMarketValueCompare}
              />
              <NumericFilter
                label="Average Age"
                value={averageAge}
                setValue={setAverageAge}
                compareValue={averageAgeCompare}
                setCompareValue={setAverageAgeCompare}
              />
            </Styles.SortFilterColumn>
            <Styles.SortFilterColumn>
              <NumericFilter
                label="Goals"
                value={goals}
                setValue={setGoals}
                compareValue={goalsCompare}
                setCompareValue={setGoalsCompare}
              />
              <NumericFilter
                label="Yellow Cards"
                value={yellowCards}
                setValue={setYellowCards}
                compareValue={yellowCardsCompare}
                setCompareValue={setYellowCardsCompare}
              />
              <NumericFilter
                label="Team Size"
                value={teamSize}
                setValue={setTeamSize}
                compareValue={teamSizeCompare}
                setCompareValue={setTeamSizeCompare}
              />
            </Styles.SortFilterColumn>
            <Styles.SortFilterColumn>
              <NumericFilter
                label="Assists"
                value={assists}
                setValue={setAssists}
                compareValue={assistsCompare}
                setCompareValue={setAssistsCompare}
              />
              <NumericFilter
                label="Red Cards"
                value={redCards}
                setValue={setRedCards}
                compareValue={redCardsCompare}
                setCompareValue={setRedCardsCompare}
              />
              <NumericFilter
                label="Foreigners Percentage (%)"
                value={foreignersPercentage}
                setValue={setForeignersPercentage}
                compareValue={foreignersPercentageCompare}
                setCompareValue={setForeignersPercentageCompare}
              />
            </Styles.SortFilterColumn>
          </Styles.SortFilterContainer>
          <Input
            placeholder="Search Club Name"
            value={nameQuery}
            onChange={(e) => setNameQuery(e.target.value)}
          />
          <Styles.PageContainer>
            <button
              disabled={page === 1}
              onClick={() => setPage((prev) => prev - 1)}
            >
              {"<"}
            </button>
            <div>{page}</div>
            <button
              disabled={clubs.length !== 10}
              onClick={() => setPage((prev) => prev + 1)}
            >
              {">"}
            </button>
          </Styles.PageContainer>
          <Styles.ClubTable>
            <Text type="display-h3">Club Name</Text>
            <Text type="display-h3">Total Market Value</Text>
            <Text type="display-h3">Average Age</Text>
            <Text type="display-h3">Team Size</Text>
            <Text type="display-h3">Games Played</Text>
            <Text type="display-h3">Goals</Text>
            <Text type="display-h3">Assists</Text>
            <Text type="display-h3">Yellow Cards</Text>
            <Text type="display-h3">Red Cards</Text>
            <Text type="display-h3">Foreigners Percentage</Text>
            {!loading &&
              clubs.map((club) => (
                <>
                  <Text type="text-t2">{club.pretty_name}</Text>
                  <Text type="text-t2">
                    {club.total_market_value ? club.total_market_value : "none"}
                  </Text>
                  <Text type="text-t2">{club.average_age}</Text>
                  <Text type="text-t2">{club.squad_size}</Text>
                  <Text type="text-t2">{club.games_played}</Text>
                  <Text type="text-t2">{club.goals}</Text>
                  <Text type="text-t2">{club.assists}</Text>
                  <Text type="text-t2">{club.yellow_cards}</Text>
                  <Text type="text-t2">{club.red_cards}</Text>
                  <Text type="text-t2">{club.foreigners_percentage}</Text>
                </>
              ))}
          </Styles.ClubTable>
          {!loading && clubs.length === 0 && <div>None</div>}
          {loading && <div>Loading...</div>}
        </Styles.Content>
      ) : (
        <Styles.Content>
          <Styles.SortFilterContainer>
            <Styles.SortFilterColumn>
              <NumericFilter
                label="Games Played"
                value={games}
                setValue={setGames}
                compareValue={gamesCompare}
                setCompareValue={setGamesCompare}
              />
              <NumericFilter
                label="Avg. Minutes"
                value={minutes}
                setValue={setMinutes}
                compareValue={minutesCompare}
                setCompareValue={setMinutesCompare}
              />
              <Text type="text-t2">Olympic Medals</Text>
              <Select
                isMulti
                options={olympicOptions}
                value={olympicMedals}
                onChange={(options) => setOlympicMedals(options)}
                components={{
                  DropdownIndicator: () => null,
                  IndicatorSeparator: () => null,
                }}
              />
            </Styles.SortFilterColumn>
            <Styles.SortFilterColumn>
              <NumericFilter
                label="Goals"
                value={goals}
                setValue={setGoals}
                compareValue={goalsCompare}
                setCompareValue={setGoalsCompare}
              />
              <NumericFilter
                label="Yellow Cards"
                value={yellowCards}
                setValue={setYellowCards}
                compareValue={yellowCardsCompare}
                setCompareValue={setYellowCardsCompare}
              />
              <Text type="text-t2">Date Range</Text>
              <Styles.DateRangeContainer>
                <Select
                  options={yearOptions.filter((option) => {
                    if (!toYear) return true;
                    return option.value <= toYear;
                  })}
                  value={{ value: fromYear, label: fromYear }}
                  onChange={(option) => setFromYear(option.value)}
                  components={{
                    DropdownIndicator: () => null,
                    IndicatorSeparator: () => null,
                  }}
                />
                <Text type="text-t3">to</Text>
                <Select
                  options={yearOptions.filter((option) => {
                    if (!fromYear) return true;
                    return option.value >= fromYear;
                  })}
                  value={{ value: toYear, label: toYear }}
                  onChange={(option) => setToYear(option.value)}
                  components={{
                    DropdownIndicator: () => null,
                    IndicatorSeparator: () => null,
                  }}
                />
              </Styles.DateRangeContainer>
            </Styles.SortFilterColumn>
            <Styles.SortFilterColumn>
              <NumericFilter
                label="Assists"
                value={assists}
                setValue={setAssists}
                compareValue={assistsCompare}
                setCompareValue={setAssistsCompare}
              />
              <NumericFilter
                label="Red Cards"
                value={redCards}
                setValue={setRedCards}
                compareValue={redCardsCompare}
                setCompareValue={setRedCardsCompare}
              />
            </Styles.SortFilterColumn>
          </Styles.SortFilterContainer>
          <Input
            placeholder="Search Player Name"
            value={nameQuery}
            onChange={(e) => setNameQuery(e.target.value)}
          />
          <Styles.PageContainer>
            <button
              disabled={page === 1}
              onClick={() => setPage((prev) => prev - 1)}
            >
              {"<"}
            </button>
            <div>{page}</div>
            <button
              disabled={players.length !== 10}
              onClick={() => setPage((prev) => prev + 1)}
            >
              {">"}
            </button>
          </Styles.PageContainer>
          <Styles.PlayerTable>
            <Text type="display-h3">Name</Text>
            <Text type="display-h3">Club</Text>
            <Text type="display-h3">Age</Text>
            <Text type="display-h3">Country</Text>
            <Text type="display-h3">Games Played</Text>
            <Text type="display-h3">Goals</Text>
            <Text type="display-h3">Assists</Text>
            <Text type="display-h3">Avg Minutes</Text>
            <Text type="display-h3">Yellow Cards</Text>
            <Text type="display-h3">Red Cards</Text>
            <Text type="display-h3">Olympic Medals</Text>
            {!loading &&
              players.map((player) => (
                <>
                  <Text type="text-t2">{player.pretty_name}</Text>
                  <Text type="text-t2">{player.club_pretty_name}</Text>
                  <Text type="text-t2">
                    {dayjs().diff(player.date_of_birth, "years")}
                  </Text>
                  <Text type="text-t2">{player.country_of_citizenship}</Text>
                  <Text type="text-t2">{player.games_played}</Text>
                  <Text type="text-t2">{player.goals}</Text>
                  <Text type="text-t2">{player.assists}</Text>
                  <Text type="text-t2">
                    {Math.round(player.minutes_played * 10) / 10}
                  </Text>
                  <Text type="text-t2">{player.yellow_cards}</Text>
                  <Text type="text-t2">{player.red_cards}</Text>
                  <Text type="text-t2">
                    {player.olympic
                      ? JSON.parse(player.olympic)
                          .map((medal) =>
                            medal.replace("Summer-Football Men's Football-", "")
                          )
                          .join(", ")
                      : "none"}
                  </Text>
                </>
              ))}
          </Styles.PlayerTable>
          {!loading && players.length === 0 && <div>None</div>}
          {loading && <div>Loading...</div>}
        </Styles.Content>
      )}
    </Styles.Container>
  );
};

const NumericFilter = ({
  label,
  value,
  setValue,
  compareValue,
  setCompareValue,
}) => {
  return (
    <>
      <Text type="text-t2">{label}:</Text>
      <Styles.NumericFilterContainer>
        <Select
          options={compareOptions}
          value={compareValue}
          onChange={(option) => setCompareValue(option)}
          components={{
            DropdownIndicator: () => null,
            IndicatorSeparator: () => null,
          }}
        />
        <Input
          placeholder="0"
          type="number"
          min={0}
          value={value}
          onChange={(e) => setValue(e.target.value)}
        />
      </Styles.NumericFilterContainer>
    </>
  );
};
