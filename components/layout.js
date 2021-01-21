import Footer from "../components/footer";
import Meta from "../components/meta";
import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/router";

export default function Layout({ allPosts, children }) {
  const router = useRouter();
  const isHome = router.pathname === "/";
  const [display, toggleDisplay] = useState(false);
  console.log(isHome);
  return (
    <main classNames="h-screen">
      <div>
        <div
          className={`grid grid-flow-col fixed`}
          style={{ gridTemplateColumns: "auto 1fr" }}
        >
          <ul
            className={`${
              !display ? "hidden" : ""
            } transform-gpu duration-150 bg-purple-600 h-screen p-8`}
          >
            <h1 className="pb-5 text-4xl font-bold text-center text-white">
              Articles
            </h1>
            {allPosts.map((post) => (
              <li className="font-semibold text-white hover:underline">
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
        <Meta />
        <div className="min-h-screen">
          <main>{children}</main>
        </div>
      </div>
      <Footer />
    </main>
  );
}
