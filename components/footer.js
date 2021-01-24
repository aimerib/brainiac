import Container from "./container";
import { useState, useCallback, useEffect } from "react";
import { css } from "styled-components";
const footerStyle = css`
  color: white;
  text-shadow: 0 0 7px #ffea02, 0 0 14px #ffea02;
`;

export default function Footer({ returnHeight }) {
  const [height, setHeight] = useState(0);
  const date = new Date();
  const year = date.getFullYear();
  const measuredRef = useCallback((node) => {
    if (node !== null) {
      setHeight(node.getBoundingClientRect().height);
    }
  }, []);

  useEffect(() => {
    returnHeight(height);
  }, [height]);

  return (
    <footer
      ref={measuredRef}
      style={{ backgroundColor: "#191919", fontFamily: "Lazer84" }}
      className="border-t bg-accent-7 border-accent-7"
    >
      <Container>
        <div className="grid items-center content-center py-5 justify-items-center">
          <h3
            css={footerStyle}
            className="text-xl font-bold leading-tight tracking-tighter text-center lg:text-left lg:mb-0 lg:pr-4"
          >
            Copyright&copy; Slothcrew {year.toString().split("").join(" ")}
          </h3>
        </div>
      </Container>
    </footer>
  );
}
