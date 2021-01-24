import Footer from "../components/footer";
import Meta from "../components/meta";
import Menu from "../components/menu";
import styled, { css } from "styled-components";
import { useState } from "react";

const Background = styled.div`
  background-image: url("/assets/background.jpg");
  filter: blur(10px);
  height: 110vh;
  width: 110vw;
  transform: translateX(-20px);
  background-position: center;
  background-repeat: no-repeat;
  position: fixed;
  background-size: cover;
  overflow: auto;
`;

const Content = styled.div`
  background-color: rgba(0, 0, 0, 0.4);
  position: relative;
  min-height: 100vh;
`;

export default function Layout({ allPosts, children }) {
  const [footerHeight, setFooterHeight] = useState(0);
  const [headerHeight, setHeaderHeight] = useState(0);
  const offset = footerHeight + headerHeight;
  const contentHeight = css`
    min-height: calc(100vh - ${offset + 80}px);
  `;

  return (
    <main style={{ color: "#ffea02" }}>
      <Background />
      <Content>
        <Menu
          posts={allPosts}
          returnHeight={(height) => setHeaderHeight(height)}
        />
        <Meta />
        <div css={contentHeight}>
          <main>{children}</main>
        </div>
        <Footer returnHeight={(height) => setFooterHeight(height)} />
      </Content>
    </main>
  );
}
