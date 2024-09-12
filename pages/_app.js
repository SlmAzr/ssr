import { createGlobalStyle } from "styled-components";
import Header from "@/components/Header";


const GlobalStyles = createGlobalStyle`
  body {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    }
`;

export default function App({ Component, pageProps }) {
  return (
    <>
      <GlobalStyles />
      <Header />
      <Component {...pageProps} />
    </>
  );
}
