// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

import axios from "axios";
import * as cheerio from "cheerio";
import Vibrant from "node-vibrant";

export default async function handler(req, res) {
  const { albumURL } = req.query;
  const { data } = await axios.get(albumURL);

  const $ = cheerio.load(data);
  const image = $(".header-new-background-image")
    .attr("style")
    .replace("background-image: url(", "")
    .replace(");", "");
  const palette = await Vibrant.from(image).maxColorCount(32).getPalette();

  res.status(200).json({
    colors: [
      palette.DarkMuted.hex,
      palette.DarkVibrant.hex,
      palette.LightMuted.hex,
      palette.LightVibrant.hex,
      palette.Muted.hex,
      palette.Vibrant.hex,
    ],
  });
}
