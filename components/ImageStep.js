import { Button, Grid } from "@material-ui/core";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import { Screenshot } from "../services/screenshot";
import { Profile } from "./Profile";

const PROFILE_ID = "profile-image";

export const ImageStep = ({ color, onBackClick }) => {
  const [image, setImage] = useState("");

  const getImage = async () => {
    const node = document.getElementById(PROFILE_ID);
    if (!node) return;
    const screenshot = new Screenshot({ node });
    return screenshot.getImage();
  };

  const onDownloadClick = () => {
    const a = document.createElement("a");
    a.href = image;
    a.setAttribute("download", `profile_${new Date().getTime()}.jpg`);
    a.click();
  };

  useEffect(() => {
    const getImageUrl = async () => {
      const imageUrl = await getImage();
      if (imageUrl) setImage(imageUrl);
    };

    getImageUrl().catch((err) => console.error(err));
  }, []);

  return (
    <>
      <Profile color={color} id={PROFILE_ID} isHidden />

      {image && (
        <Grid item xs={12} style={{ textAlign: "center" }}>
          <Image src={image} alt="chart" height={300} width={300} />
        </Grid>
      )}
      <Grid item xs={12} style={{ textAlign: "center" }}>
        <Button
          onClick={onBackClick}
          style={{ marginRight: "6px" }}
          variant="contained"
        >
          Go back
        </Button>

        <Button
          color="primary"
          onClick={onDownloadClick}
          style={{ marginLeft: "6px" }}
          variant="contained"
        >
          Download
        </Button>
      </Grid>
    </>
  );
};
