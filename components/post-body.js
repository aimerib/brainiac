import markdownStyles from "./markdown-styles.module.css";
import hljs from "highlight.js";
import { useEffect } from "react";
import { css } from "styled-components";
export default function PostBody({ content }) {
  useEffect(() => {
    hljs.initHighlighting();
  }, []);
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
      <div
        className={markdownStyles["markdown"]}
        dangerouslySetInnerHTML={{ __html: content }}
      />
    </div>
  );
}
