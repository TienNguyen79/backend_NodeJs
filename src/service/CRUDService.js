const connection = require("../config/database");

const getAllUsers = async () => {
  let [results, fields] = await connection.query("SELECT * FROM Users");
  return results;
};

const getUserById = async (userId) => {
  let [results, fields] = await connection.query(
    "SELECT * FROM Users where id = ?",
    [userId]
  );

  let users = results && results.length > 0 ? results[0] : {};
  return users;
};

const handleupdateUser = async ({ email, name, city, id }) => {
  let [results, fields] = await connection.query(
    `UPDATE Users
    SET email = ?,name = ?, city= ?
    WHERE id = ?`,
    [email, name, city, id]
  );
};
module.exports = {
  getAllUsers,
  getUserById,
  handleupdateUser,
};
