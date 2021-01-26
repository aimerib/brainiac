import { css } from "styled-components";

export const BgTransparentGrey = css`
  background-color: rgba(25, 25, 25, 0.8);
  color: white;
  text-shadow: 0 0 2px #ffea02, 0 0 7px #ffea02;
`;

export const linkStyle = css`
  padding-bottom: 10px;
  padding-left: 2rem;
  line-height: 2em;
  display: table;

  a {
    text-shadow: 0 0 2px #22b1ff, 0 0 16px #22b1ff, 0 0 20px #22b1ff,
      0 0 25px #22b1ff, 0 0 33px #22b1ff;
    cursor: pointer;
    display: inline-block;
    position: relative;
    text-decoration: none;
    color: white;
  }
  a:before {
    content: "";
    position: absolute;
    width: 100%;
    height: 3px;
    bottom: -4px;
    left: 0;
    background: #ff1177;
    visibility: hidden;
    border-radius: 5px;
    transform: scaleX(0);
    transition: 0.25s linear;
    box-shadow: 0 0 10px 2px #ff1177;
  }
  a:after {
    content: "";
    position: absolute;
    width: 100%;
    height: 7px;
    bottom: -2px;
    left: 0;
    border-radius: 5px;
    opacity: 0;
    transform: scalex(0);
    transition: 0.5s;
  }
  &:hover > a:after {
    opacity: 0.15;
    transform: scalex(1);
  }
  a:hover:before,
  a:focus:before {
    visibility: visible;
    transform: scaleX(1);
  }
`;

export const menuHeader = css`
  grid-template-columns: 1fr 1fr 1fr;
  display: grid;
  grid-auto-flow: column;
  line-height: 4em;
  color: #fff;
  font-family: Lazer84;
  text-align: center;
  text-shadow: 0 0 2px #ff1177, 0 0 16px #ff1177, 0 0 20px #ff1177,
    0 0 25px #ff1177, 0 0 33px #ff1177;
`;

export const ulStyle = css`
  background-color: rgba(25, 25, 25, 0.98);
  &::-webkit-scrollbar {
    display: none;
  }
  -ms-overflow-style: none; /* IE and Edge */
  scrollbar-width: none; /* Firefox */
  overflow-y: scroll;
`;
