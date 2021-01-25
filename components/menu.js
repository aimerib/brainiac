import Link from "next/link";
import { useState, useEffect } from "react";
import Header from "../components/header";
import styled, { css } from "styled-components";
import Close from "../public/assets/close.svg";

const ArticlesList = styled.div`
  z-index: 100;
  position: sticky;
  top: 0px;
`;

const linkStyle = css`
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

const menuHeader = css`
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

export default function Menu({ posts, returnHeight }) {
  const [display, toggleDisplay] = useState(false);

  useEffect(() => {
    if (display == false)
      setTimeout(() => {
        document.getElementById("menu").scrollTop = 0;
      }, 300);
  }, [display]);

  return (
    <ArticlesList>
      <div
        className={`${
          !display ? "-translate-x-full" : "-translate-x-9"
        } transform-gpu duration-500 transition-transform  fixed grid grid-flow-column`}
        style={{ top: "0", zIndex: "999" }}
      >
        <ul
          id="menu"
          css={css`
            background-color: rgba(25, 25, 25, 0.98);
            &::-webkit-scrollbar {
              display: none;
            }
            -ms-overflow-style: none; /* IE and Edge */
            scrollbar-width: none; /* Firefox */
            overflow-y: scroll;
          `}
          className={`h-screen z-50 max-w-2xl p-8 `}
        >
          <h1 css={menuHeader} className="text-4xl font-bold text-center">
            <p
              id="heading"
              css={`
                justify-self: center;
                grid-column-start: 2;
                grid-column-end: 3;
              `}
            >
              Articles
            </p>
            <i
              onClick={() => toggleDisplay(!display)}
              css={css`
                justify-self: end;
                display: inline-block;
                max-width: 20%;
                cursor: pointer;
                grid-column-start: 3;
                grid-column-end: 4;
              `}
            >
              <Close />
            </i>
          </h1>
          {posts &&
            posts.map((post, key) => (
              <li key={key} css={linkStyle} className="font-semibold">
                <Link as={`/posts/${post.slug}`} href="/posts/[slug]">
                  <a onClick={() => toggleDisplay(!display)}>{post.title}</a>
                </Link>
              </li>
            ))}
        </ul>
      </div>
      <Header
        toggleMenu={() => toggleDisplay(!display)}
        returnHeight={returnHeight}
      />
    </ArticlesList>
  );
}
