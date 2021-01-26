import DateFormatter from "../components/date-formatter";
import PostTitle from "../components/post-title";
import PostTags from "../components/post-tags";

export default function PostHeader({ title, date, tags }) {
  return (
    <>
      <PostTitle>{title}</PostTitle>
      <div className="max-w-xl px-5 mx-auto md:max-w-3xl lg:max-w-6xl">
        <div className="mb-6 text-lg">
          <PostTags tags={tags} />
          <DateFormatter dateString={date} />
        </div>
      </div>
    </>
  );
}
