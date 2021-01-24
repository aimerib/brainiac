import { BgTransparentGrey } from "../styles/styles-utils";

export default function Welcome() {
  return (
    <section>
      <div css={BgTransparentGrey} className="p-8 mt-20 mb-20 md:mb-28">
        <div>
          <p className="mb-4 text-lg leading-relaxed md:text-2xl lg:text-3xl">
            Blah Blah
          </p>
        </div>
      </div>
    </section>
  );
}
