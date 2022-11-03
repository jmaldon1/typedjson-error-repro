import * as React from "react";
import { useState } from "react";
import { hydrate } from "react-dom";
import { RemixBrowser } from "@remix-run/react";
import { CacheProvider } from "@emotion/react";
import { ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";

import ClientStyleContext from "~/src/ClientStyleContext";
import createEmotionCache from "~/src/createEmotionCache";
import theme from "~/src/theme";

interface ClientCacheProviderProps {
  children: React.ReactNode;
}
function ClientCacheProvider({
  children,
}: ClientCacheProviderProps): JSX.Element {
  const [cache, setCache] = useState(createEmotionCache());

  function reset(): void {
    setCache(createEmotionCache());
  }

  return (
    <ClientStyleContext.Provider value={{ reset }}>
      <CacheProvider value={cache}>{children}</CacheProvider>
    </ClientStyleContext.Provider>
  );
}

hydrate(
  <ClientCacheProvider>
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <RemixBrowser />
    </ThemeProvider>
  </ClientCacheProvider>,
  document
);
