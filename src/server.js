"use strict";

const express = require("express");
const cors = require("cors");
const app = express();
const morgan = require("morgan");

const notFound = require("./error-handlers/404.js");
const errorHandler = require("./error-handlers/500.js");

const apiRoutes = require("../src/routes/api-routes.js");

const v2Routes = require("./routes/v2.js");


app.use(cors());
app.use(morgan("dev"));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(apiRoutes);

app.use("/api/v2", v2Routes);


app.use("*", notFound);
app.use(errorHandler);

module.exports = {
  server: app,
  start: (port) => {
    app.listen(port, () => {
      console.log(`Gurrl we up on: ${port}`);
    });
  },
};
