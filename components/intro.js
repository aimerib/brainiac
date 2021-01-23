import { CMS_NAME } from "../lib/constants";

export default function Intro() {
  return (
    <section className="z-40 flex flex-col items-center pt-16 mb-16 md:flex-row md:mb-12">
      <h1
        style={{ color: "#f52653" }}
        className="text-6xl font-bold leading-tight tracking-tighter md:text-8xl md:pr-8"
      >
        Brainiac
      </h1>
      <h4
        style={{ color: "#ffea02" }}
        className="mt-5 text-xl font-bold text-center md:text-left md:pl-8"
      >
        Your brain outside your head
      </h4>
    </section>
  );
}
