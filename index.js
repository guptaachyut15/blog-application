const path = require("path");
const express = require("express");
const cookieParser = require("cookie-parser");

const staticRouter = require("./routes/staticRoutes");
const userRouter = require("./routes/userRoutes");
const blogRouter = require("./routes/blogRoutes");

const {
  checkForAuthenticationCookie,
} = require("./middlewares/authentication");

const { PORT } = require("./utils/config");
const { connectMongo } = require("./utils/connection");

const app = express();
connectMongo();

app.set("view engine", "ejs");
app.set("views", path.resolve("./views"));

app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(checkForAuthenticationCookie("token"));
app.use(express.static(path.resolve("./public")));

app.use("/", staticRouter);
app.use("/user", userRouter);
app.use("/blog", blogRouter);

app.listen(Number(PORT), () => console.log("listening on port", PORT));

//global catch
app.use((err, req, res, next) => {
  console.log(err);
  return res.json({ message: "Seems like something went wrong from our side" });
});
