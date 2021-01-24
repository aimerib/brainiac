import { BgTransparentGrey } from "../styles/styles-utils";

export default function Welcome() {
  return (
    <section>
      <div css={BgTransparentGrey} className="p-8 mt-20 mb-20 md:mb-28">
        <div>
          <p className="pb-10 mb-4 text-lg leading-relaxed text-center md:text-2xl lg:text-3xl">
            Brainiac, your brain outside your head.
          </p>
          <p className="pb-10 mb-4 text-lg leading-relaxed text-center md:text-2xl lg:text-3xl">
            This is my personal collection of knowledge that I find useful or
            insightful in some way.
          </p>
          <p className="pb-10 mb-4 text-lg leading-relaxed text-center md:text-2xl lg:text-3xl">
            “Cyberspace. A consensual hallucination experienced daily by
            billions of legitimate operators, in every nation, by children being
            taught mathematical concepts... A graphic representation of data
            abstracted from banks of every computer in the human system.
            Unthinkable complexity. Lines of light ranged in the nonspace of the
            mind, clusters and constellations of data. Like city lights,
            receding...”
          </p>
        </div>
      </div>
    </section>
  );
}
