import express from "express";
import path from "path";
import favicon from "serve-favicon";
import indexRouter from "./routes/indexRouter.js";

const app = express();

const port = process.env.PORT || 8000;

app.use(favicon(path.join(import.meta.dirname, "favicon.ico")))

const assetsPath = path.join(import.meta.dirname, "public")
app.use(express.static(assetsPath))

app.use(express.urlencoded({ extended: true }));

app.set("views", path.join(import.meta.dirname, "views"));
app.set("view engine", "ejs");

app.use("/", indexRouter);

app.use((err, req, res, next) => {
  console.error(err);
  res.status(err.statusCode || 500).send(err.message)
})

app.listen(port, (error) => {
  if (error) {
    throw error;
  }
  console.log(`App listening at port ${port}`);
})
