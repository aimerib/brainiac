import Link from "next/link";
import DateFormatter from "./date-formatter";

export default function PostPreview({ title, date, excerpt, slug, tags }) {
  return (
    <div>
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
