import React from "react";
import Typography from "@mui/material/Typography";
import MuiLink from "@mui/material/Link";
import constants from "../constants";

function Copyright() {
  return (
    <Typography variant="body2" color="text.secondary" align="center">
      {"Copyright © "}
      <MuiLink color="inherit" href={constants.brandUrl}>
        {constants.brandName}
      </MuiLink>{" "}
      {new Date().getFullYear()}.
    </Typography>
  );
}

export default Copyright;
