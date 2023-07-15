const express = require("express");
const app = express();
app.use(express.json());
const cookeiparser = require("cookie-parser");
app.use(cookeiparser());
const  errormiddleware = require("./middleware/error")
const productrouting  = require("./router/productrouter");
const userrouting  = require("./router/userrouter");
const orderrouting = require("./router/orderrouter")
  app.use("/api/v1",productrouting)

app.use("/api/v1",userrouting )
app.use("/api/v1",orderrouting)

// middlewaren for error
app.use(errormiddleware)
module.exports = app;