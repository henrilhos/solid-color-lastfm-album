import React from "react";
import { Box } from "@material-ui/core";

const hidden = { position: "absolute", left: -1000, top: -1000 };

export const Profile = ({ color, id, isHidden = false }) => (
  <Box
    width="1000px"
    height="1000px"
    id={id}
    style={isHidden ? { ...hidden, background: color } : { background: color }}
  />
);
