// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

import axios from "axios";
import * as cheerio from "cheerio";

export default async function handler(req, res) {
  const { albumURL } = req.query;
  const { data } = await axios.get(albumURL);

  const $ = cheerio.load(data);
  const [key, value] = $(".header-new-inner").attr("style").split(":");

  res.status(200).json({ [key.trim()]: value.trim() });
}
