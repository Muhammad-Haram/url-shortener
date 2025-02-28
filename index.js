const express = require("express");
require('dotenv').config();
const connectToDb = require("./connect");
const urlRoutes = require("./routes/url.routes");
const app = express();
const PORT = process.env.PORT;

connectToDb();
app.use("/url", urlRoutes);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
