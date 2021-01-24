import Container from "../components/container";
import Welcome from "../components/welcome";
import Layout from "../components/layout";
import { getAllPosts } from "../lib/api";
import Head from "next/head";

export default function Index({ allPosts }) {
  return (
    <>
      <Layout allPosts={allPosts}>
        <Head>
          <title>Brainiac | A place for all your knowledge</title>
        </Head>
        <Container>
          <Welcome />
        </Container>
      </Layout>
    </>
  );
}

export async function getStaticProps() {
  const allPosts = getAllPosts(["title", "date", "slug", "tags", "content"]);

  return {
    props: { allPosts },
  };
}
