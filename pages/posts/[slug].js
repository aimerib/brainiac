import { useRouter } from "next/router";
import ErrorPage from "next/error";
import Container from "../../components/container";
import PostBody from "../../components/post-body";
import PostHeader from "../../components/post-header";
import Layout from "../../components/layout";
import { getPostBySlug, getAllPosts } from "../../lib/api";
import PostTitle from "../../components/post-title";
import Head from "next/head";
import markdownToHtml from "../../lib/markdownToHtml";
import styled from "styled-components";

const PostContent = styled.div`
  background-color: rgba(25, 25, 25, 0.6);
  padding-bottom: 2.8rem;
  color: white;
  text-shadow: 0 0 2px #ffea02, 0 0 7px #ffea02;
`;

export default function Post({ post, allPosts }) {
  const router = useRouter();
  if (!router.isFallback && !post?.slug) {
    return <ErrorPage statusCode={404} />;
  }
  return (
    <Layout allPosts={allPosts}>
      <Container>
        {router.isFallback ? (
          <PostTitle>Loading…</PostTitle>
        ) : (
          <>
            <article className="mt-20 mb-16">
              <Head>
                <title>{post.title}</title>
              </Head>
              <PostContent>
                <PostHeader
                  title={post.title}
                  date={post.date}
                  author={post.author}
                />
                <PostBody content={post.content} />
              </PostContent>
            </article>
          </>
        )}
      </Container>
    </Layout>
  );
}

export async function getStaticProps({ params }) {
  const post = getPostBySlug(params.slug, ["title", "date", "slug", "content"]);
  const allPosts = getAllPosts(["title", "date", "slug", "author", "excerpt"]);

  const content = await markdownToHtml(post.content || "");

  return {
    props: {
      post: {
        ...post,
        content,
      },
      allPosts,
    },
  };
}

export async function getStaticPaths() {
  const posts = getAllPosts(["slug"]);

  return {
    paths: posts.map((post) => {
      return {
        params: {
          slug: post.slug,
        },
      };
    }),
    fallback: false,
  };
}
