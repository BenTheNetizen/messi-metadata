import styled from "styled-components";
import { Text } from "../../ui";

export const Container = styled.div`
  width: 100vw;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;

  background-color: ${({ theme }) => theme.palette.white};
`;

export const Content = styled.div`
  max-width: 1200px;
  width: 100%;
  padding: 20px 100px 20px 100px;
  display: flex;
  flex-direction: column;
  flex: 1;

  align-items: center;

  > :not(:last-child) {
    margin-bottom: 20px;
  }
`;

export const SortFilterContainer = styled.div`
  width: 100%;
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  grid-gap: 20px;
`;

export const SortFilterColumn = styled.div`
  width: 100%;
  display: grid;
  grid-template-columns: max-content 1fr;
  align-items: center;
  column-gap: 8px;
  row-gap: 20px;
  height: fit-content;
`;

export const NumericFilterContainer = styled.div`
  width: 100%;
  display: grid;
  grid-template-columns: 40px 1fr;
  grid-gap: 20px;
  align-items: center;
`;

export const DateRangeContainer = styled.div`
  width: 100%;
  display: grid;
  grid-template-columns: 1fr auto 1fr;
  grid-gap: 20px;
  align-items: center;
`;

export const PageContainer = styled.div`
  width: 100%;
  display: flex;
  justify-content: flex-end;
  align-items: center;

  > :not(:last-child) {
    margin-right: 8px;
  }
`;

export const PlayerTable = styled.div`
  width: 100%;
  display: grid;
  grid-template-columns: repeat(11, 1fr);

  * {
    padding: 10px;
    border-bottom: 1px solid ${({ theme }) => theme.palette.black};
  }
`;

export const ClubTable = styled.div`
  width: 100%;
  display: grid;
  grid-template-columns: repeat(10, 1fr);

  * {
    padding: 10px;
    border-bottom: 1px solid ${({ theme }) => theme.palette.black};
  }
`;

export const HeaderContainer = styled.div`
  display: flex;
  padding: 10px;

  * {
    margin: 10px;
  }

  ${Text} {
    padding: 5px;
  }
`;

export const Button = styled.button`
  padding: 10px;
  border: 1px solid ${({ theme }) => theme.palette.black};
  border-radius: 4px;
  background-color: ${props => props.selected ? props.theme.palette.black : props.theme.palette.white};
  color: ${props => props.selected ? props.theme.palette.white : props.theme.palette.black};
  cursor: pointer;

  :hover {
    background-color: ${props => props.selected ? props.theme.palette.darkGrey : props.theme.palette.grey};
  }
`;
