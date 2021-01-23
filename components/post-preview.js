import DateFormatter from "../components/date-formatter";
import Link from "next/link";

export default function PostPreview({ title, date, excerpt, author, slug }) {
  return (
    <div
      style={{ backgroundColor: "rgba(25, 25, 25, .8)" }}
      className="pt-10 pb-10 pl-16 pr-10"
    >
      <div className="mb-5"></div>
      <h3 className="mb-3 text-3xl leading-snug">
        <Link as={`/posts/${slug}`} href="/posts/[slug]">
          <a className="hover:underline">{title}</a>
        </Link>
      </h3>
      <div className="mb-4 text-lg">
        <DateFormatter dateString={date} />
      </div>
      <p className="mb-4 text-lg leading-relaxed">{excerpt}</p>
    </div>
  );
}
