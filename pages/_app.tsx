import "../styles/globals.css";
import { ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import { CacheProvider } from "@emotion/react";
import theme from "../src/theme";
import type { AppProps } from "next/app";
import createEmotionCache from "../src/createEmotioCache";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <CacheProvider value={createEmotionCache()}>
      <ThemeProvider theme={theme}>
        {/* CssBaseline kickstart an elegant, consistent, and simple baseline to build upon. */}
        <CssBaseline />
        <Component {...pageProps} />
      </ThemeProvider>
    </CacheProvider>
  );
}
