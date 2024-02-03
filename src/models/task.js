const mongoose = require("mongoose");
const mongoose_delete = require("mongoose-delete");

const userSchema = new mongoose.Schema({
  name: String,
  email: String,
  city: String,
});

const projectSchema = new mongoose.Schema({
  name: String,
  startDate: String,
  endDate: String,
  description: String,
});

const taskSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    description: String,
    status: String,
    startDate: String,
    endDate: String,
    userInfo: userSchema,
    projectInfo: projectSchema,
  },
  {
    timestamps: true,
  }
);

//xử lý xóa mềm
// Override all methods
taskSchema.plugin(mongoose_delete, { overrideMethods: "all" });
taskSchema.plugin(mongoose_delete); //soft delete

const Task = mongoose.model("task", taskSchema);

module.exports = { Task };
