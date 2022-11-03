import * as React from "react";
import { Link } from "remix";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import type { TypedJsonResponse } from "remix-typedjson";
import { typedjson, useTypedLoaderData } from "remix-typedjson";
import type { LoaderArgs } from "@remix-run/node";
// import { useMatches } from "@remix-run/react";

type LoaderData = {
  date: Date;
};

export async function loader({
  request,
}: LoaderArgs): Promise<TypedJsonResponse<LoaderData>> {
  return typedjson({ date: new Date() });
}

export default function Index() {
  // const matches = useMatches();
  const loaderData = useTypedLoaderData<typeof loader>();
  const { date } = loaderData;
  throw new Error("oops!");
  return (
    <>
      <h1>Data</h1>
      <pre>{JSON.stringify(loaderData, null, 2)}</pre>
    </>
  );
}
