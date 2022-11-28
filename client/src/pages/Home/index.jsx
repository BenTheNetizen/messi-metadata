import React, { useCallback, useEffect, useState } from "react";
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

  const search = async (params) => {
    const res = await API.searchPlayers(params);
    setPlayers(res || []);
  };

  const searchDebounced = useCallback(_.debounce(search, 500), []);

  useEffect(() => {
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
    });
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
  ]);
  console.log(players);

  return (
    <Styles.Container>
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
          {players.map((player) => (
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
      </Styles.Content>
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
