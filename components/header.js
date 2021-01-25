import Link from "next/link";
import { css } from "styled-components";
import { useState, useCallback, useEffect } from "react";
import Brain from "../public/assets/brain.svg";
const TitleWrapper = css`
  span {
    cursor: pointer;
    display: inline-block;
    position: relative;
    text-decoration: none;
    color: white;
  }
  span:before {
    content: "";
    position: absolute;
    width: 100%;
    height: 3px;
    bottom: -4px;
    left: 0;
    background: #22b1ff;
    visibility: hidden;
    border-radius: 5px;
    transform: scaleX(0);
    transition: 0.25s linear;
    box-shadow: 0 0 10px 2px #22b1ff;
  }
  span:after {
    content: "";
    position: absolute;
    width: 100%;
    height: 7px;
    border: 1px solid #fff;
    bottom: -2px;
    left: 0;
    background: #fff;
    border-radius: 5px;
    opacity: 0;
    transform: scalex(0);
    transition: 0.5s;
  }
  &:hover > span:after {
    opacity: 0.15;
    transform: scalex(1);
  }
  span:hover:before,
  span:focus:before {
    visibility: visible;
    transform: scaleX(1);
  }

  cursor: pointer;
  align-self: center;
  color: #fff;
  font-family: Lazer84;
  text-align: center;
  text-shadow: 0 0 2px #ff1177, 0 0 16px #ff1177, 0 0 20px #ff1177,
    0 0 25px #ff1177, 0 0 33px #ff1177;
  display: inline-block;
`;

export default function Header({ returnHeight, toggleMenu }) {
  const [height, setHeight] = useState(0);
  const measuredRef = useCallback((node) => {
    if (node !== null) {
      setHeight(node.getBoundingClientRect().height);
    }
  }, []);

  useEffect(() => {
    returnHeight(height);
  }, [height]);

  return (
    <>
      <div
        className="grid-cols-5 lg:grid-cols-3"
        css={css`
          background-color: rgba(25, 25, 25, 1);
          z-index: 1000;
          display: grid;
          grid-auto-flow: column;
          justify-content: center;
          align-content: center;
        `}
      >
        <div
          onClick={toggleMenu}
          className="max-w-xs col-start-1 col-end-2 ml-7"
          css={`
            display: inline-block;
            max-width: 4.5rem;
            align-self: center;
            cursor: pointer;
          `}
        >
          <Brain />
        </div>

        <Link href="/">
          <div
            ref={measuredRef}
            css={TitleWrapper}
            className="pt-5 pb-6 pl-8 text-lg md:text-4xl font-bold \
            leading-tight tracking-tighter text-center md:text-6xl \
            md:leading-none col-start-2 lg:col-end-3 col-end-5"
          >
            <span>B r a i n i a c</span>
          </div>
        </Link>
      </div>
    </>
  );
}
