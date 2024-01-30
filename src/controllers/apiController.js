const { User } = require("../models/user");
const {
  uploadSingleFile,
  uploadMutipleFiles,
} = require("../service/fileService");
const path = require("path");
const getUsersApi = async (req, res) => {
  let results = await User.find({});
  return res.status(200).json({
    errorCode: 0,
    data: results,
  });
};

const postCreateUserAPI = async (req, res) => {
  let { email, name, city } = req.body;

  let user = await User.create({
    email: email,
    name: name,
    city: city,
  });

  return res.status(200).json({
    errorCode: 0,
    data: user,
  });
};

const putUpdateUserAPI = async (req, res) => {
  let { email, name, city, id } = req.body;

  if (
    email === undefined ||
    name === undefined ||
    city === undefined ||
    id === undefined
  ) {
    return res.status(500).json("Không được để trống!!");
  }

  let user = await User.updateOne(
    { _id: id },
    { email: email, name: name, city: city }
  );

  return res.status(200).json({
    errorCode: 0,
    data: user,
  });
};

const deleteUserAPI = async (req, res) => {
  let { id } = req.body;
  let result = await User.deleteOne({ _id: id });

  return res.status(200).json({
    errorCode: 0,
    data: result,
  });
};

const postUploadSingleFileApi = async (req, res) => {
  console.log("req.file", req.files);

  if (!req.files || Object.keys(req.files).length === 0) {
    res.status(400).send("No files were uploaded.");
    return;
  }

  let results = await uploadSingleFile(req.files.image);
  console.log("🚀 ~ postUploadSingleFileApi ~ results:", results);

  return res.send(results);
};

const postUploadMutipleFilesApi = async (req, res) => {
  if (!req.files || Object.keys(req.files).length === 0) {
    res.status(400).send("No files were uploaded.");
    return;
  }

  // console.log("req.file", req.files);

  // upload single : file là 1 object
  // upload mutiple: file là 1 array

  if (Array.isArray(req.files.image)) {
    let results = await uploadMutipleFiles(req.files.image);
    return res.status(200).json({
      EC: 0,
      data: results,
    });
  } else {
    return await postUploadSingleFileApi(req, res);
  }
};

module.exports = {
  getUsersApi,
  postCreateUserAPI,
  putUpdateUserAPI,
  deleteUserAPI,
  postUploadSingleFileApi,
  postUploadMutipleFilesApi,
};
