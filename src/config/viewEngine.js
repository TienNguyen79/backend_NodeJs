const path = require("path");
const express = require("express"); //commonjs
const configViewEngine = (app) => {
  //   console.log("__dirname", __dirname); D:\Box_Code\CodeNodeJS\Backend0\src\config
  app.set("views", path.join("./src", "views")); //cấu hình cái này để chạy file ejs trong view
  app.set("view engine", "ejs");

  //config static file -- kiểu để sử dụng folder public
  app.use(express.static(path.join("./src", "public")));
};

module.exports = configViewEngine;
