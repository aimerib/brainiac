import { parseISO, format } from "date-fns";

export default function DateFormatter({ dateString }) {
  const date = parseISO(dateString);
  return (
    <time className="px-5" dateTime={dateString}>
      {format(date, "LLLL	d, yyyy")}
    </time>
  );
}
