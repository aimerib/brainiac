import Highlighter from "./Highlighter"
import { css } from "styled-components";

export default function PostBody({ content }) {
  return (
    <div
      css={css`
        pre,
        pre code {
          text-shadow: none;
        }
      `}
      className="px-5 mx-auto max-w-max lg:max-w-6xl"
    >
      <Highlighter content={content} />
    </div> 
  );
}
