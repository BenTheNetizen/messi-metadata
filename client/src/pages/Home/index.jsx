import React, { useState } from "react";
import Select from "react-select";
import { Input, Text } from "../../ui";

import * as Styles from "./styles";

const options = {
  one: "One",
  two: "Two",
  three: "Three",
};

const getOption = (value) => {
  return value ? { value, label: value } : null;
};

export const Home = () => {
  return (
    <Styles.Container>
      <Styles.Content>
        <Styles.SortFilterContainer>
          <Styles.SortFilterColumn>
            <Filter label="Filter 1" />
            <Filter label="Filter 4" isMulti />
          </Styles.SortFilterColumn>
          <Styles.SortFilterColumn>
            <Filter label="Filter 2" />
            <Filter label="Filter 5" />
          </Styles.SortFilterColumn>
          <Styles.SortFilterColumn>
            <Filter label="Filter 3" />
            <Filter label="Filter 6" />
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

const Filter = ({ label, isMulti = false }) => {
  const [selectedOption, setSelectedOption] = useState(null);
  return (
    <>
      <Text type="text-t2">{label}:</Text>
      <Select
        isMulti={isMulti}
        options={Object.values(options).map(getOption)}
        value={
          isMulti ? selectedOption?.map(getOption) : getOption(selectedOption)
        }
        onChange={(option) =>
          isMulti
            ? setSelectedOption(option?.map(({ value }) => value))
            : setSelectedOption(option.value)
        }
      />
    </>
  );
};
