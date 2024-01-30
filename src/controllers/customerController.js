const { default: aqp } = require("api-query-params");
const {
  createCustomerService,
  createArrCustomerService,
  getAllCustomerService,
  putUpdateCustomerService,
  deleteCustomerService,
  deleteArrCustomerService,
} = require("../service/customerService");
const { uploadSingleFile } = require("../service/fileService");

const postCreateUserApi = async (req, res) => {
  let { name, address, phone, email, description } = req.body;

  // console.log("🚀 ~ postCreateUserApi ~ req.files:", Object.keys(req.files));
  let imageUrl = "";
  if (!req.files || Object.keys(req.files).length === 0) {
    //if dont have file then do nothing
  } else {
    let results = await uploadSingleFile(req.files.image);
    imageUrl = results.path; //lấy được link ảnh
  }

  let customer = await createCustomerService({
    name,
    address,
    phone,
    email,
    description,
    image: imageUrl,
  });

  return res.status(200).json({ EC: 0, data: customer });
};

const postCreateArrayUserApi = async (req, res) => {
  console.log("🚀 ~ postCreateArrayUserApi ~ res:", req.body);

  let customers = await createArrCustomerService(req.body.customers);
  if (customers) {
    return res.status(200).json({ EC: 0, data: customers });
  } else {
    return res.status(400).json({ EC: -1, data: customers });
  }
};

const getAllCustomerApi = async (req, res) => {
  console.log("🚀 ~ getAllCustomerApi ~ req:", req.query);
  let limit = parseInt(req.query.limit);
  let page = parseInt(req.query.page);

  let results = null;
  if (limit && page) {
    results = await getAllCustomerService(limit, page, req.query);
  } else {
    results = await getAllCustomerService();
  }

  return res.status(200).json({ EC: 0, data: results });
};

const putUpdateCustomerApi = async (req, res) => {
  console.log("🚀 ~ putUpdateCustomerApi ~ req:", req.body);

  let imageUrl = "";
  if (!req.files || Object.keys(req.files).length === 0) {
    //if dont have file then do nothing
  } else {
    let results = await uploadSingleFile(req.files.image);
    imageUrl = results.path; //lấy được link ảnh
  }

  let { name, address, phone, email, description, id } = req.body;

  let fields = {
    name,
    image: imageUrl,
    address,
    phone,
    email,
    description,
    id,
  };
  let customers = await putUpdateCustomerService(fields);
  if (customers) {
    return res.status(200).json({ EC: 0, data: customers });
  } else {
    return res.status(400).json({ EC: -1, data: customers });
  }
};

const deleteCustomerApi = async (req, res) => {
  let { id } = req.body;
  let customers = await deleteCustomerService(id);
  if (customers) {
    return res.status(200).json({ EC: 0, response: "Xóa Thành Công" });
  } else {
    return res.status(400).json({ EC: -1, data: "Xóa Thất Bại" });
  }
};

const deleteArrCustomerApi = async (req, res) => {
  let { cutomersId } = req.body;
  let customers = await deleteArrCustomerService(cutomersId);
  console.log("🚀 ~ deleteArrCustomerApi ~ customers:", customers);
  if (customers) {
    return res.status(200).json({ EC: 0, response: "Xóa Thành Công" });
  } else {
    return res.status(400).json({ EC: -1, data: "Xóa Thất Bại" });
  }
};

module.exports = {
  postCreateUserApi,
  postCreateArrayUserApi,
  getAllCustomerApi,
  putUpdateCustomerApi,
  deleteCustomerApi,
  deleteArrCustomerApi,
};
