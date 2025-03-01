const express = require("express");
const path = require("path");
require("dotenv").config();
const connectToDb = require("./connect");
const urlRoutes = require("./routes/url.routes");
const staticRoutes = require("./routes/static.routes");
const URL = require("./models/url.model");
const app = express();
const PORT = process.env.PORT;

connectToDb();

app.set("view engine", "ejs");
app.set("views", path.resolve("./views"));

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use("/url", urlRoutes);
app.use("/", staticRoutes);

app.get("/url/:shortId", async (req, res) => {
  const shortId = req.params.shortId;
  const entry = await URL.findOneAndUpdate(
    {
      shortId,
    },
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
