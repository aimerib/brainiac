import Link from "next/link";
import { useState } from "react";
import Header from "../components/header";
import styled from "styled-components";

const ArticlesList = styled.div`
  z-index: 100;
  position: sticky;
  top: 0px;
`;

export default function Menu({ posts }) {
  const [display, toggleDisplay] = useState(false);
  return (
    <ArticlesList>
      <div
        className={`grid grid-flow-col fixed h-screen z-50`}
        style={{ gridTemplateColumns: "auto 1fr" }}
      >
        <ul
          style={{ backgroundColor: "#191919 " }}
          className={`${
            !display ? "scale-x-0 hidden" : ""
          } transform-gpu duration-500 transition-transform p-8`}
        >
          <h1
            style={{ color: "#ffea02" }}
            className="pb-5 text-4xl font-bold text-center"
          >
            Articles
          </h1>
          {posts.map((post, key) => (
            <li
              key={key}
              style={{ color: "#f52653" }}
              className="font-semibold hover:underline"
            >
              <Link as={`/posts/${post.slug}`} href="/posts/[slug]">
                <a onClick={() => toggleDisplay(!display)}>{post.title}</a>
              </Link>
            </li>
          ))}
        </ul>

        <div onClick={() => toggleDisplay(!display)}>
          {!display ? "Show Menu" : "Hide Menu"}
        </div>
      </div>
      <Header />
    </ArticlesList>
  );
}
