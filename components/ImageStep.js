import { Button, Grid } from "@material-ui/core";
import React from "react";
import { ProfileImage } from "./ProfileImage";

const PROFILE_ID = "profile-image";

export const ImageStep = ({ colors, onBackClick }) => {
  return (
    <>
      {colors.map((color) => (
        <Grid key={color} item xs={6} style={{ textAlign: "center" }}>
          <ProfileImage
            color={color}
            id={`${PROFILE_ID}_${color.replace("#", "")}`}
          />
        </Grid>
      ))}
      <Grid item xs={12}>
        <Button variant="outlined" onClick={onBackClick} color="primary">
          Go back
        </Button>
      </Grid>
    </>
  );
};
