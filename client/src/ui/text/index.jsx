import styled from "styled-components";

const TextStyle = styled.div`
  font: ${({ textStyle, theme }) => theme.textStyles[textStyle]};
  margin: 0;
  padding: 0;
  backface-visibility: hidden;
  ${({ capitalize }) => (capitalize ? `text-transform: uppercase;` : "")}
  ${({ italic }) => (italic ? `font-style: italic;` : "")}
`;

export const _Text = ({ type, children, ...rest }) => (
  <TextStyle textStyle={type} {...rest}>
    {children}
  </TextStyle>
);

// allow Text to be used in styled components interlopated child selector
export const Text = styled(_Text)``;
