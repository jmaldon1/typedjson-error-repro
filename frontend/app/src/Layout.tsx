import * as React from "react";
import Container from "@mui/material/Container";
import Box from "@mui/material/Box";
import CssBaseline from "@mui/material/CssBaseline";

import ProTip from "./ProTip";
import Copyright from "./Copyright";

export default function Layout({
  children,
}: {
  children: React.ReactNode;
}): JSX.Element {
  return (
    <Container maxWidth="sm">
      <Box>
        <CssBaseline />
        {children}
        {/* <ProTip />
        <Copyright /> */}
      </Box>
    </Container>
  );
}
