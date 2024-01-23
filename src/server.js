const express = require("express"); //commonjs
require("dotenv").config();
// import express from "express";//es modules
const configViewEngine = require("./config/viewEngine");
const { router, router2 } = require("./routes/web");
const connection = require("./config/database");
// const webRoutes2 = require("./routes/web");

const app = express(); //app express
const port = process.env.PORT || 8888; //port
const hostname = process.env.HOST_NAME;

//config req.body --để lấy data từ form
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//khai báo route
app.use("/api", router); //định nghĩa tiền tố không muốn tiền tố thì để /
app.use("/api2", router2);
//config template engine--để sử dụng ejs code html
configViewEngine(app);

app.listen(port, hostname, () => {
  console.log(`Example app listening on port ${port}`);
});
