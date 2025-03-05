const express = require("express");
const path = require("path");
const cookieParser = require("cookie-parser");
const connectToDb = require("./connect");
const dotenv = require("dotenv");
dotenv.config();
const { restrictToLoggedinUserOnly, checkAuth } = require("./middlewares/auth.middleware");
const URL = require("./models/url.model");

const urlRoute = require("./routes/url.routes");
const staticRoute = require("./routes/static.routes");
const userRoute = require("./routes/user.routes");

const app = express();
const PORT = process.env.PORT || 3000;

connectToDb();

app.set("view engine", "ejs");
app.set("views", path.resolve("./views"));

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

app.use("/url", restrictToLoggedinUserOnly, urlRoute);
app.use("/user", userRoute);
app.use("/", checkAuth, staticRoute);

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

app.listen(PORT, () => console.log(`Server Started at PORT:${PORT}`));