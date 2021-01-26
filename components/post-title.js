import styled from "styled-components";

const TitleWrapper = styled.h1.attrs(() => ({
  className:
    "text-lg md:text-4xl p-12 md:text-2xl lg:text-3xl font-bold mb-8 mt-14 text-center",
}))`
  background-color: rgba(25, 25, 25, 0.7);
  text-align: center;
  color: #fff;
  font-family: Lazer84;
  letter-spacing: 0.1em;
  line-height: 1.7em;
  text-shadow: 0 0 2px #ff1177, 0 0 16px #ff1177, 0 0 20px #ff1177,
    0 0 25px #ff1177, 0 0 33px #ff1177;
`;

export default function PostTitle({ children }) {
  return <TitleWrapper>{children}</TitleWrapper>;
}
