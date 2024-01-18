const getHomePage = (req, res) => {
  //processData
  //Call Modal
  res.send("Hello Nguyễn Mạnh Tiến");
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
};
