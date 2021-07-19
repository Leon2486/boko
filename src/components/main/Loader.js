import React from "react";
import CircularProgress from "@material-ui/core/CircularProgress";
import { red } from "@material-ui/core/colors";

export default function CircularIndeterminate() {
  return (
    <div className="loader">
      <CircularProgress />
    </div>
  );
}
