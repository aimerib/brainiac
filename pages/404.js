import styled, { css } from "styled-components";
import { BgTransparentGrey } from "../styles/styles-utils";
import Head from "next/head";
import Layout from "../components/layout";
import Container from "../components/container";
import { getAllPosts } from "../lib/api";

export default function Custom404({ allPosts }) {
  return (
    <main style={{ color: "#ffea02" }}>
      <Layout allPosts={allPosts}>
        <Head>
          <title>Brainiac | Error 404</title>
        </Head>
        <Container>
          <div className="transform-gpu translate-y-1\/2 md:translate-y-24 lg:translate-y-36">
            <div css={BgTransparentGrey} className="p-8 mt-20 mb-20 md:mb-28">
              <div>
                <section className="mb-4 text-lg leading-relaxed md:text-2xl lg:text-3xl">
                  <ErrorTitle>404 | Page not found</ErrorTitle>
                  <p
                    css={css`
                      text-align: center;
                    `}
                  >
                    The page you tried to access doesn't exist.
                  </p>
                </section>
              </div>
            </div>
          </div>
        </Container>
      </Layout>
    </main>
  );
}

const ErrorTitle = styled.h1.attrs(() => ({
  className:
    "text-lg md:text-4xl p-12 md:text-2xl lg:text-3xl font-bold mb-14 mt-14 text-center",
}))`
  text-align: center;
  color: #fff;
  font-family: Lazer84;
  letter-spacing: 0.1em;
  line-height: 1.7em;
  text-shadow: 0 0 2px #ff1177, 0 0 16px #ff1177, 0 0 20px #ff1177,
    0 0 25px #ff1177, 0 0 33px #ff1177;
`;

export async function getStaticProps() {
  const allPosts = getAllPosts(["title", "date", "slug", "author", "excerpt"]);

  return {
    props: { allPosts },
  };
}
