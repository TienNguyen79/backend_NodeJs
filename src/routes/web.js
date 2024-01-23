const express = require("express");
const {
  getHomePage,
  getSample,
  getR2,
  postCreateUser,
  getCreate,
  getUpdatePage,
  updateUser,
} = require("../controllers/homeController");
const router = express.Router();
const router2 = express.Router();

//route1

router.get("/home", getHomePage);

router.get("/", (req, res) => {
  res.send("Hello World! and hehe"); //nếu không viết hàm bên Controller thì sẽ như này
});

router.get("/sam", getSample);
router.get("/create", getCreate);
router.post("/create-user", postCreateUser);
router.post("/update-user", updateUser);
router.get("/update/:id", getUpdatePage);

//route2
router2.get("/hi2", getR2);

module.exports = { router, router2 };
