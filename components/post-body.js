import Highlighter from "./Highlighter";
import { css } from "styled-components";

export default function PostBody({ content }) {
  return (
    <div
      css={css`
        pre,
        pre code {
          text-shadow: none;
        }
        a {
          text-shadow: 0 0 2px #22b1ff, 0 0 16px #22b1ff, 0 0 20px #22b1ff,
            0 0 25px #22b1ff, 0 0 33px #22b1ff;
          cursor: pointer;
          display: inline-block;
          position: relative;
        }
        a:before {
          content: "";
          position: absolute;
          width: 100%;
          height: 3px;
          bottom: -4px;
          left: 0;
          background: #ff1177;
          visibility: hidden;
          border-radius: 5px;
          transform: scaleX(0);
          transition: 0.25s linear;
          box-shadow: 0 0 10px 2px #ff1177;
        }
        a:after {
          content: "";
          position: absolute;
          width: 100%;
          height: 7px;
          border: 1px solid #fff;
          bottom: -2px;
          left: 0;
          background: #fff;
          border-radius: 5px;
          opacity: 0;
          transform: scalex(0);
          transition: 0.5s;
        }
        &:hover > a:after {
          opacity: 0.15;
          transform: scalex(1);
        }
        a:hover:before,
        a:focus:before {
          visibility: visible;
          transform: scaleX(1);
        }
      `}
      className="px-5 mx-auto max-w-max lg:max-w-6xl"
    >
      <Highlighter content={content} />
    </div>
  );
}
