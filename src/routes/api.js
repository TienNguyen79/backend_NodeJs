//để các phương thức RESTFUL - GET, POST, PUT, PATCH, DELETE..
const express = require("express");
const {
  getUsersApi,
  postCreateUserAPI,
  putUpdateUserAPI,
  deleteUserAPI,
  postUploadSingleFileApi,
  postUploadMutipleFilesApi,
} = require("../controllers/apiController");
const {
  postCreateUserApi,
  postCreateArrayUserApi,
  getAllCustomerApi,
  putUpdateCustomerApi,
  deleteCustomerApi,
  deleteArrCustomerApi,
} = require("../controllers/customerController");
const {
  createProjectApi,
  getProjectApi,
  updateProjectApi,
  deleteProjectApi,
  createTaskApi,
  getTaskApi,
  updateTaskApi,
  deleteTaskApi,
} = require("../controllers/productController");

const routerAPI = express.Router();
const router2 = express.Router();

//route1

routerAPI.get("/", (req, res) => {
  res.status(200).json({
    data: [
      { id: 1, name: "Tiến" },
      { id: 2, name: "Tiến2" },
    ],
  });
});

routerAPI.get("/users", getUsersApi);
routerAPI.post("/users", postCreateUserAPI);
routerAPI.put("/users", putUpdateUserAPI);
routerAPI.delete("/users", deleteUserAPI);

routerAPI.post("/file", postUploadSingleFileApi);
routerAPI.post("/files", postUploadMutipleFilesApi);

routerAPI.post("/customers", postCreateUserApi);
routerAPI.get("/customers", getAllCustomerApi);
routerAPI.put("/customers", putUpdateCustomerApi);
routerAPI.delete("/customers", deleteCustomerApi);
routerAPI.delete("/customers-many", deleteArrCustomerApi);
routerAPI.post("/customers-many", postCreateArrayUserApi);

routerAPI.get("/info", (req, res) => {
  console.log("🚀 ~ routerAPI.get ~ req:", req.query);

  return res.status(200).json({ data: req.query });
});

routerAPI.get("/info/:name/:address", (req, res) => {
  console.log("🚀 ~ routerAPI.get ~ req:", req.params);

  return res.status(200).json({ data: req.params });
});

routerAPI.post("/projects", createProjectApi);
routerAPI.get("/projects", getProjectApi);
routerAPI.put("/projects", updateProjectApi);
routerAPI.delete("/projects", deleteProjectApi);

routerAPI.post("/tasks", createTaskApi);
routerAPI.get("/tasks", getTaskApi);
routerAPI.put("/tasks", updateTaskApi);
routerAPI.delete("/tasks", deleteTaskApi);
// //route2
// router2.get("/hi2", getR2);

module.exports = { routerAPI, router2 };
