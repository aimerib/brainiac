import Link from "next/link";
import styled from "styled-components";

const StyledHeader = styled.h2.attrs((props) => ({
  className: "pt-5 pb-6 pl-8",
}))`
  background-color: rgba(25, 25, 25, 1);
  z-index: 1000;
`;

export default function Header() {
  return (
    <StyledHeader>
      <Link href="/">
        <a
          // className="hover:underline"
          css={`
            &:hover {
              cursor: pointer;
            }
            &:hover:after {
              content: "";
              display: block;
              margin: 0 auto;
              margin-top: -3px;
              width: 30%;
              border-bottom-width: 3px;
              border-bottom-style: solid;
              border-bottom-color: rgba(255, 56, 119, 1);
            }
            text-align: center;
            display: block;
            font-size: 2.5rem;
            font-family: "Lazer84";
            color: rgba(255, 56, 119, 1);
            background: linear-gradient(
              180deg,
              rgba(255, 56, 119, 1) 0%,
              rgba(255, 56, 119, 1) 40%,
              rgba(106, 16, 67, 1) 90%
            );
            -webkit-background-clip: text;
            -webkit-text-fill-color: transparent;
          `}
        >
          B r a i n i a c
        </a>
      </Link>
    </StyledHeader>
  );
}
