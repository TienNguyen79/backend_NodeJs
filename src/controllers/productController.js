const { Project } = require("../models/project");
const {
  createProjectService,
  getAllProjectService,
  updateProjectService,
  deleteProjectService,
  createProductService,
  createTasktService,
  getTaskApiService,
  updateTaskService,
  deleteTaskService,
} = require("../service/productService");
const { default: aqp } = require("api-query-params");
const createProjectApi = async (req, res) => {
  const data = req.body;
  let results = null;
  if (data.type === "EMPTY-PROJECT") {
    results = await createProjectService(data);
  } else if (data.type === "ADD-USER") {
    //   {
    //     "type": "ADD-USER",
    //     "projectId": "65bb4eb5a2436f19536af22e",
    //     "usersArr" : ["65b07e970bce659c387a91a0","65b07ffab697c01f5257480f"]
    // }
    let myProject = await Project.findById(data.projectId).exec(); //lấy được thông tin của project

    //cách 1
    // for (let i = 0; i < data.usersArr.length; i++) {
    //   myProject.userInfo.push(data.usersArr[i]);
    // }

    //cách 2
    myProject.userInfo.push(...data.usersArr);

    results = await myProject.save();
  } else if (data.type === "REMOVE-USER") {
    let myProject = await Project.findById(data.projectId).exec();
    myProject.userInfo.pull(...data.usersArr);
    results = await myProject.save();
  } else if (data.type === "ADD-TASKS") {
    let myProject = await Project.findById(data.projectId).exec();
    myProject.tasks.push(...data.taskArr);
    results = await myProject.save();
  }

  return res.status(200).json({ EC: 0, data: results });
};

const getProjectApi = async (req, res) => {
  let results = await getAllProjectService(req.query);

  return res.status(200).json({ EC: 0, data: results });
};

const updateProjectApi = async (req, res) => {
  let { id, name, endDate, description } = req.body;

  let data = { id, name, endDate, description };
  let results = await updateProjectService(data);

  return res.status(200).json({ EC: 0, message: "update successfully!" });
};

const deleteProjectApi = async (req, res) => {
  let id = req.body;
  let projects = await deleteProjectService(id);
  if (projects) {
    return res.status(200).json({ EC: 0, response: "Delete successfully!" });
  } else {
    return res.status(400).json({ EC: -1, data: "Delete Failed!" });
  }
};

// --------------TASK---------------------

const createTaskApi = async (req, res) => {
  const data = req.body;
  let results = null;

  if (data.type === "EMPTY-TASK") {
    results = await createTasktService(data);
  }

  return res.status(200).json({ EC: 0, data: results });
};

const getTaskApi = async (req, res) => {
  let results = await getTaskApiService(req.query);

  return res.status(200).json({ EC: 0, data: results });
};

const updateTaskApi = async (req, res) => {
  let {
    id,
    name,
    description,
    status,
    startDate,
    endDate,
    userInfo,
    projectInfo,
  } = req.body;

  const data = {
    id,
    name,
    description,
    status,
    startDate,
    endDate,
    userInfo,
    projectInfo,
  };
  let results = await updateTaskService(data);
  return res.status(200).json({ EC: 0, message: "update successfully!" });
};

const deleteTaskApi = async (req, res) => {
  let { id } = req.body;

  let results = await deleteTaskService(id);
  return res.status(200).json({ EC: 0, message: "delete successfully!" });
};

module.exports = {
  createProjectApi,
  getProjectApi,
  updateProjectApi,
  deleteProjectApi,
  createTaskApi,
  getTaskApi,
  updateTaskApi,
  deleteTaskApi,
};
