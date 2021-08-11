import { Button, Grid } from "@material-ui/core";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import { Screenshot } from "../services/screenshot";
import { Profile } from "./Profile";

export const ProfileImage = ({ color, id }) => {
  const [image, setImage] = useState("");

  const getImage = async () => {
    const node = document.getElementById(id);
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
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <Grid container spacing={1}>
      <Profile color={color} id={id} isHidden />

      {image && (
        <Grid item xs={12} style={{ textAlign: "center" }}>
          <Image src={image} alt="chart" height={150} width={150} />
        </Grid>
      )}
      <Grid item xs={12} style={{ textAlign: "center" }}>
        <Button
          color="primary"
          onClick={onDownloadClick}
          size="small"
          variant="contained"
        >
          Download
        </Button>
      </Grid>
    </Grid>
  );
};
