import PostPreview from "../../components/post-preview";
import { getAllTaggedPosts, getAllPosts } from "../../lib/api";
import { useRouter } from "next/router";

export default function TaggedPosts({ posts }) {
  return (
    <section>
      <h2 className="mb-8 text-6xl font-bold leading-tight tracking-tighter md:text-7xl">
        More Stories
      </h2>
      <div className="grid grid-cols-1 mb-32 md:grid-cols-2 md:gap-x-16 lg:gap-x-32 gap-y-20 md:gap-y-32">
        {posts.map((post) => (
          <PostPreview
            key={post.slug}
            title={post.title}
            date={post.date}
            slug={post.slug}
            excerpt={post.excerpt}
          />
        ))}
      </div>
    </section>
  );
}

export async function getStaticProps({ params }) {
  console.log(params);
  const posts = getAllTaggedPosts(params.tag);

  return {
    props: { posts },
  };
}
export async function getStaticPaths() {
  const posts = getAllPosts(["tags"]);
  const tags = posts.map((post) => post.tags).flat();
  const uniqueTags = tags.filter((item, pos) => {
    return tags.indexOf(item) == pos;
  });

  return {
    paths: uniqueTags.map((tag) => {
      return {
        params: {
          tag: tag,
        },
      };
    }),
    fallback: false,
  };
}
