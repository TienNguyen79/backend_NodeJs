const express = require("express");
const {
  getHomePage,
  getSample,
  getR2,
} = require("../controllers/homeController");
const router = express.Router();
const router2 = express.Router();

//route1

router.get("/home", getHomePage);

router.get("/", (req, res) => {
  res.send("Hello World! and hehe"); //nếu không viết hàm bên Controller thì sẽ như này
});

router.get("/sam", getSample);

//route2
router2.get("/hi2", getR2);

module.exports = { router, router2 }; //export default xong import chỗ khác đặt tên là gì cũng được
