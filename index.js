const express = require("express");
require("dotenv").config();
const connectToDb = require("./connect");
const urlRoutes = require("./routes/url.routes");
const URL = require("./models/url.model");
const app = express();
const PORT = process.env.PORT;

connectToDb();
app.use(express.json());
app.use("/url", urlRoutes);

app.get("/:shortId", async (req, res) => {
  const shortId = req.params.shortId;

  const entry = await URL.findOneAndUpdate(
    { shortId },
    {
      $push: {
        visitHistory: {
          timestamp: Date.now(),
        },
      },
    }
  );

  res.redirect(entry.redirectURL);
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
