import React from "react";
import { renderToString } from "react-dom/server";
import { RemixServer } from "@remix-run/react";
import type { EntryContext } from "@remix-run/node";

import createEmotionCache from "~/src/createEmotionCache";
import theme from "~/src/theme";

import CssBaseline from "@mui/material/CssBaseline";
import { ThemeProvider } from "@mui/material/styles";
import { CacheProvider } from "@emotion/react";
import createEmotionServer from "@emotion/server/create-instance";
import { resetServerContext } from "react-beautiful-dnd";

export default function handleRequest(
  request: Request,
  responseStatusCode: number,
  responseHeaders: Headers,
  remixContext: EntryContext
): Response {
  const cache = createEmotionCache();
  const { extractCriticalToChunks } = createEmotionServer(cache);

  function MuiRemixServer(): JSX.Element {
    return (
      <CacheProvider value={cache}>
        <ThemeProvider theme={theme}>
          {/* CssBaseline kickstart an elegant, consistent, and simple baseline to build upon. */}
          <CssBaseline />
          <RemixServer context={remixContext} url={request.url} />
        </ThemeProvider>
      </CacheProvider>
    );
  }

  /* The resetServerContext function should be used when server side rendering (SSR). 
  It ensures context state does not persist across multiple renders on the server which would 
  result in client/server markup mismatches after multiple requests are rendered on the server. 
  https://github.com/atlassian/react-beautiful-dnd/blob/master/docs/api/reset-server-context.md */
  resetServerContext();
  // Render the component to a string.
  const html = renderToString(<MuiRemixServer />);

  // Grab the CSS from emotion
  const { styles } = extractCriticalToChunks(html);

  let stylesHTML = "";

  styles.forEach(({ key, ids, css }) => {
    const emotionKey = `${key} ${ids.join(" ")}`;
    const newStyleTag = `<style data-emotion="${emotionKey}">${css}</style>`;
    stylesHTML = `${stylesHTML}${newStyleTag}`;
  });

  // Add the emotion style tags after the insertion point meta tag
  const markup = html.replace(
    /<meta(\s)*name="emotion-insertion-point"(\s)*content="emotion-insertion-point"(\s)*\/>/,
    `<meta name="emotion-insertion-point" content="emotion-insertion-point"/>${stylesHTML}`
  );

  responseHeaders.set("Content-Type", "text/html");

  return new Response(`<!DOCTYPE html>${markup}`, {
    status: responseStatusCode,
    headers: responseHeaders,
  });
}
