const shortid = require("shortid");
const URL = require("../models/url.model");

async function handleGenerateNewShortUrl(req, res) {
  const body = req.body;

  if (!body.url) {
    return res.status(400).json({ error: "url is required" });
  }

  const shortId = shortid();

  await URL.create({
    shortId: shortId,
    redirectURL: body.url,
    visitHistory: [],
  });

  return res.status(201).json({ id: shortId });
}

module.exports = {
  handleGenerateNewShortUrl,
};
