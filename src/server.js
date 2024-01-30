const express = require("express"); //commonjs
require("dotenv").config();
// import express from "express";//es modules
const configViewEngine = require("./config/viewEngine");
const { router, router2 } = require("./routes/web");
const connection = require("./config/database");
// const { MongoClient } = require("mongodb"); //cái này dùng cho cach 2 mongodb driver
const { routerAPI } = require("./routes/api");
// const webRoutes2 = require("./routes/web");
const fileUpload = require("express-fileupload");

const app = express(); //app express
const port = process.env.PORT || 8888; //port
const hostname = process.env.HOST_NAME;

//config file upload
app.use(fileUpload());

//config req.body --để lấy data từ form
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//khai báo route
app.use("/api", router); //định nghĩa tiền tố không muốn tiền tố thì để /
app.use("/api2", router2);

//dùng api với v

app.use("/v1/api/", routerAPI);

//config template engine--để sử dụng ejs code html
configViewEngine(app);

// const cat = new Kitten({ name: "Hoi dan It Cat" });
// cat.save();

//self-help running function

(async () => {
  try {
    //using mongoose
    await connection(); //ở đây muốn phải kết nối được database trước xong làm gì thì làm

    //----------------------------------
    //using mongoDb driver
    // Connection URL
    // const url = process.env.DB_HOST_WITH_DRIVER;
    // const client = new MongoClient(url);

    // // Database Name
    // const dbName = process.env.DB_NAME;

    // await client.connect();
    // console.log("Connected successfully to server");
    // const db = client.db(dbName);
    // const collection = db.collection("customer");

    //----------------------------------

    app.listen(port, hostname, () => {
      console.log(`Backend zero listening on port ${port}`);
    });
  } catch (error) {
    console.log("error connect to Database", error);
  }
})();
