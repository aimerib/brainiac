import Footer from "../components/footer";
import Meta from "../components/meta";
import Menu from "../components/menu";
import styled from "styled-components";

const Background = styled.div`
  background-image: url("/assets/background.jpg");
  filter: blur(10px);
  height: 105vh;
  width: 105vw;
  transform: translateX(-20px);
  background-position: center;
  background-repeat: no-repeat;
  position: fixed;
  background-size: cover;
  overflow: auto;
`;
const Content = styled.div`
  background-color: rgba(0, 0, 0, 0.4);
  /* z-index: 100; */
  position: relative;
  /* top: 40%;
  left: 30%; */
`;

export default function Layout({ allPosts, children }) {
  return (
    <main
      // classNames="h-screen"
      style={{ color: "#ffea02" }}
    >
      <Background />
      <Content>
        <Menu posts={allPosts} />
        <Meta />
        <div className="min-h-screen" style={{}}>
          <main>{children}</main>
        </div>
        <Footer />
      </Content>
      {/* <Background /> */}
    </main>
  );
}
