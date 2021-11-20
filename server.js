const express = require("express");
require("dotenv").config({ path: "./config/.env" });
require("./config/db");

const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.listen(process.env.PORT, () => {
  console.log(`Listening on port ${process.env.PORT}`);
});
