const { default: aqp } = require("api-query-params");
const { Customer } = require("../models/customer");

const createCustomerService = async ({
  name,
  address,
  phone,
  email,
  description,
  image,
}) => {
  let customer = await Customer.create({
    name,
    address,
    phone,
    email,
    description,
    image,
  });
  return {
    errorCode: 0,
    data: customer,
  };
};

const createArrCustomerService = async (arr) => {
  try {
    let results = await Customer.insertMany(arr);
    return results;
  } catch (error) {
    console.log("🚀 ~ createArrCustomerService ~ error:", error);
    return null;
  }
};

const getAllCustomerService = async (limit, page, queryString) => {
  try {
    let results = null;
    let length = "";
    if (limit && page) {
      let offset = (page - 1) * limit;
      const { filter } = aqp(queryString); // thư viện api-query-params
      delete filter.page;

      results = await Customer.find(filter).skip(offset).limit(limit).exec();

      let totalFind = await Customer.find(filter);
      length = totalFind.length;
    } else {
      results = await Customer.find({});
    }

    return {
      results: results,
      total: limit ? Math.ceil(length / limit) : length,
      page: page,
    };
  } catch (error) {
    console.log("🚀 ~ getAllCustomerService ~ error:", error);
    return null;
  }
};

const putUpdateCustomerService = async (fields) => {
  try {
    console.log("fields888888888: ", fields);
    let { name, image, address, phone, email, description, id } = fields;
    console.log("🚀 ~ putUpdateCustomerService ~ id:", id);

    let results = await Customer.updateOne(
      { _id: id },
      {
        email: email,
        name: name,
        phone: phone,
        address: address,
        image: image,
        description: description,
      }
    );
    return results;
  } catch (error) {
    console.log("🚀 ~ getAllCustomerService ~ error:", error);
    return null;
  }
};

const deleteCustomerService = async (id) => {
  try {
    let results = await Customer.deleteById(id); //xóa mềm , xóa hẳn thì dùng deleteOne
    return results;
  } catch (error) {
    console.log("🚀 ~ getAllCustomerService ~ error:", error);
    return null;
  }
};

const deleteArrCustomerService = async (arrCustomer) => {
  try {
    //xóa mềm thì dùng delete của thư viện mongoose-delete còn muốn xóa hẳn thì dùng deleteMany của mongoose
    let results = await Customer.delete({ _id: { $in: arrCustomer } });
    return results;
  } catch (error) {
    console.log("🚀 ~ deleteArrCustomerService ~ error:", error);

    return null;
  }
};

module.exports = {
  createCustomerService,
  createArrCustomerService,
  getAllCustomerService,
  putUpdateCustomerService,
  deleteCustomerService,
  deleteArrCustomerService,
};
