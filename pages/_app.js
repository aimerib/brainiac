import "../styles/index.css";
import SiteLayout from "../components/site-layout";

export default function MyApp({ Component, pageProps }) {
  return (
    // <SiteLayout>
    <Component {...pageProps} />
    // </SiteLayout>
  );
}
