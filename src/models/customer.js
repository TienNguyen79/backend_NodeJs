const mongoose = require("mongoose");
const mongoose_delete = require("mongoose-delete");
//schema: định dạng hình thù data của chúng ta
const customerSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    address: String,
    phone: String,
    email: String,
    image: String,
    description: String,
  },
  {
    timestamps: true,
    // statics: {
    //   findByNguyenManhTien(name) {
    //     return this.find({ name: new RegExp(name, "i") });
    //   },
    // },
  } //auto add createdAt, updatedAt
);

//xử lý xóa mềm
// Override all methods
customerSchema.plugin(mongoose_delete, { overrideMethods: "all" });
customerSchema.plugin(mongoose_delete); //soft delete

const Customer = mongoose.model("customer", customerSchema);

module.exports = { Customer };
