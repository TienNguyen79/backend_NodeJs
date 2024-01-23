const connection = require("../config/database");
const {
  getAllUsers,
  getUserById,
  handleupdateUser,
} = require("../service/CRUDService");

const getHomePage = async (req, res) => {
  let results = await getAllUsers();
  console.log("🚀 ~ getHomePage ~ results:", results);

  return res.render("home.ejs", { listUser: results });
};

const postCreateUser = async (req, res) => {
  console.log("🚀 ~ postCreateUser ~ res:", req.body);

  let { email, name, city } = req.body;

  let [results, fields] = await connection.execute(
    `INSERT INTO Users (email,name,city) VALUES (?, ?, ?)`,
    [email, name, city]
  );

  res.send("Create User successfully!");
};

const getCreate = (req, res) => {
  res.render("create.ejs");
};

const getUpdatePage = async (req, res) => {
  console.log("🚀 ~ getUpdatePage ~ req:", req.params);

  let userId = req.params.id;

  let users = await getUserById(userId);
  console.log("🚀 ~ getUpdatePage ~ users:", users);

  res.render("update.ejs", { userEdit: users });
};

const updateUser = async (req, res) => {
  let { id, email, name, city } = req.body;

  await handleupdateUser({ email, name, city, id });
  res.redirect("/api/home");
  // res.send("Update User successfully!");
};

const getSample = (req, res) => {
  res.render("sample.ejs");
};

const getR2 = (req, res) => {
  res.send("Hello World! and hehe 2222");
};

module.exports = {
  getHomePage,
  getSample,
  getR2,
  postCreateUser,
  getCreate,
  getUpdatePage,
  updateUser,
};
