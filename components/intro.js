import { CMS_NAME } from "../lib/constants";

export default function Intro() {
  return (
    <section className="flex flex-col items-center pt-16 mb-16 md:flex-row md:mb-12">
      <h1 className="text-6xl font-bold leading-tight tracking-tighter md:text-8xl md:pr-8">
        Brainiac
      </h1>
      <h4 className="mt-5 text-lg text-center md:text-left md:pl-8">
        Your brain outside your head
      </h4>
    </section>
  );
}
