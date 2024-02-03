const { Project } = require("../models/project");
const { default: aqp } = require("api-query-params");
const { Task } = require("../models/task");
const createProjectService = async (data) => {
  let project = await Project.create(data);
  return {
    errorCode: 0,
    data: project,
  };
};

const getAllProjectService = async (queryString) => {
  const page = queryString.page;
  const { filter, limit, population } = aqp(queryString);

  let offset = (page - 1) * limit;
  delete filter.page;
  results = await Project.find(filter)
    .populate(population) //lấy được thông tin user từ id của nó // .populate(population) truyền động , truyền cứng populate("userInfo")
    .skip(offset)
    .limit(limit)
    .exec();
  return results;
};

const updateProjectService = async (data) => {
  try {
    let { id, name, endDate, description } = data;
    let results = await Project.updateOne(
      { _id: id },
      {
        name: name,
        endDate: endDate,
        description: description,
      }
    );
    return results;
  } catch (error) {
    console.log("🚀 ~ updateProjectService ~ error:", error);
  }
  return results;
};

const deleteProjectService = async ({ id }) => {
  console.log("🚀 ~ deleteProjectService ~ id:", id);
  try {
    let results = await Project.deleteById(id); //xóa mềm , xóa hẳn thì dùng deleteOne
    return results;
  } catch (error) {
    console.log("🚀 ~ deleteProjectService ~ error:", error);
    return null;
  }
};

const createTasktService = async (data) => {
  let task = await Task.create(data);
  return {
    errorCode: 0,
    data: task,
  };
};

const getTaskApiService = async (queryString) => {
  const page = queryString.page;
  const { filter, limit } = aqp(queryString);

  let offset = (page - 1) * limit;
  delete filter.page;
  results = await Task.find(filter).skip(offset).limit(limit).exec();
  return results;
};

const updateTaskService = async (data) => {
  try {
    let results = await Task.updateOne(
      { _id: data.id },
      {
        // name: name,
        // status: status,
        // startDate: startDate,
        // endDate: endDate,
        // description: description,
        ...data,
      }
    );
    return results;
  } catch (error) {
    console.log("🚀 ~ updateTaskService ~ error:", error);
  }
};
const deleteTaskService = async (id) => {
  try {
    let results = await Task.deleteById(id); //xóa mềm , xóa hẳn thì dùng deleteOne
    return results;
  } catch (error) {
    console.log("🚀 ~ deleteTaskService ~ error:", error);
    return null;
  }
};

module.exports = {
  createProjectService,
  getAllProjectService,
  updateProjectService,
  deleteProjectService,
  createTasktService,
  getTaskApiService,
  updateTaskService,
  deleteTaskService,
};
