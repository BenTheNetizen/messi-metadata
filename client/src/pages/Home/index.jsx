import React, { useState } from "react";
import Select from "react-select";
import { Text } from "../../ui";

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
            <Filter label="Filter 4" />
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
      </Styles.Content>
    </Styles.Container>
  );
};

const Filter = ({ label }) => {
  const [selectedOption, setSelectedOption] = useState(null);
  return (
    <>
      <Text type="text-t2">{label}:</Text>
      <Select
        options={Object.values(options).map(getOption)}
        value={getOption(selectedOption)}
        onChange={(option) => setSelectedOption(option.value)}
      />
    </>
  );
};
