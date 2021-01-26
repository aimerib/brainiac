import Link from "next/link";
import { useState, useEffect } from "react";
import Header from "../components/header";
import styled, { css } from "styled-components";
import CloseIcon from "../public/assets/close.svg";
import { linkStyle, menuHeader, ulStyle } from "../styles/styles-utils";

const ArticlesList = styled.div`
  z-index: 100;
  position: sticky;
  top: 0px;
`;

const MenuContainer = styled.div.attrs((props) => ({
  className: `${
    !props.show ? "-translate-x-full" : "-translate-x-9"
  } transform-gpu duration-500 transition-transform  fixed grid grid-flow-column`,
}))`
  top: 0;
  z-index: 999;
`;

const Heading = styled.p.attrs({ id: "heading" })`
  justify-self: center;
  grid-column-start: 2;
  grid-column-end: 3;
`;

const CloseButton = styled.i`
  justify-self: end;
  display: inline-block;
  max-width: 20%;
  cursor: pointer;
  grid-column-start: 3;
  grid-column-end: 4;
`;

export default function Menu({ posts, returnHeight }) {
  const [show, toggleShow] = useState(false);

  useEffect(() => {
    if (show == false)
      setTimeout(() => {
        document.getElementById("menu").scrollTop = 0;
      }, 300);
  }, [show]);

  return (
    <ArticlesList>
      <MenuContainer show={show}>
        <ul id="menu" css={ulStyle} className={`h-screen z-50 max-w-2xl p-8 `}>
          <h1 css={menuHeader} className="text-4xl font-bold text-center">
            <Heading>Articles</Heading>
            <CloseButton onClick={() => toggleShow(!show)}>
              <CloseIcon />
            </CloseButton>
          </h1>
          {posts &&
            posts.map((post, key) => (
              <li key={key} css={linkStyle} className="font-semibold">
                <Link as={`/posts/${post.slug}`} href="/posts/[slug]">
                  <a onClick={() => toggleShow(!show)}>{post.title}</a>
                </Link>
              </li>
            ))}
        </ul>
      </MenuContainer>
      <Header
        toggleMenu={() => toggleShow(!show)}
        returnHeight={returnHeight}
      />
    </ArticlesList>
  );
}
