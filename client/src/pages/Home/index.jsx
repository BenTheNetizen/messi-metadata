import React, { useState } from "react";
import Select from "react-select";
import { Input, Text } from "../../ui";

import * as Styles from "./styles";

const compareOptions = {
  greater: ">",
  less: "<",
  equal: "=",
};

const olympicOptions = {
  bronze: "Bronze",
  silver: "Silver",
  gold: "Gold",
};

const getOption = (value) => {
  return value ? { value, label: value } : null;
};

export const Home = () => {
  const [games, setGames] = useState(0);
  const [gamesCompare, setGamesCompare] = useState(compareOptions.greater);
  const [goals, setGoals] = useState(0);
  const [goalsCompare, setGoalsCompare] = useState(compareOptions.greater);
  const [assists, setAssists] = useState(0);
  const [assistsCompare, setAssistsCompare] = useState(compareOptions.greater);
  const [minutes, setMinutes] = useState(0);
  const [minutesCompare, setMinutesCompare] = useState(compareOptions.greater);
  const [yellowCards, setYellowCards] = useState(0);
  const [yellowCardsCompare, setYellowCardsCompare] = useState(
    compareOptions.greater
  );
  const [redCards, setRedCards] = useState(0);
  const [redCardsCompare, setRedCardsCompare] = useState(
    compareOptions.greater
  );
  const [olympicMedals, setOlympicMedals] = useState(null);
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
              options={Object.values(olympicOptions).map(getOption)}
              value={olympicMedals?.map(getOption)}
              onChange={(option) =>
                setOlympicMedals(option?.map((o) => o.value))
              }
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
        <Input placeholder="Search Player Name" />
        <Styles.PlayerTable>
          <Text type="display-h3">Name</Text>
          <Text type="display-h3">Club</Text>
          <Text type="display-h3">Column 3</Text>
          <Text type="display-h3">Column 4</Text>
          <Text type="display-h3">Column 5</Text>
          <Text type="display-h3">Column 6</Text>
          <Text type="text-t2">Messi</Text>
          <Text type="text-t2">Barcelona</Text>
          <Text type="text-t2">Data 3</Text>
          <Text type="text-t2">Data 4</Text>
          <Text type="text-t2">Data 5</Text>
          <Text type="text-t2">Data 6</Text>
          <Text type="text-t2">Ronaldo</Text>
          <Text type="text-t2">Juventus</Text>
          <Text type="text-t2">Data 3</Text>
          <Text type="text-t2">Data 4</Text>
          <Text type="text-t2">Data 5</Text>
          <Text type="text-t2">Data 6</Text>
          <Text type="text-t2">Neymar</Text>
          <Text type="text-t2">PSG</Text>
          <Text type="text-t2">Data 3</Text>
          <Text type="text-t2">Data 4</Text>
          <Text type="text-t2">Data 5</Text>
          <Text type="text-t2">Data 6</Text>
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
          options={Object.values(compareOptions).map(getOption)}
          value={getOption(compareValue)}
          onChange={(option) => setCompareValue(option.value)}
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
