const path = require("path");
const uploadSingleFile = async (fileObject) => {
  //get image extendsion
  let extName = path.extname(fileObject.name); //lấy được đuôi như .png,.jpg...
  let baseName = path.basename(fileObject.name, extName); //lấy được tên đằng trước ví dụ abc.jpg thì lấy được abc

  let finalName = `${baseName}-${Date.now()}${extName}`;

  // path.resolve(__dirname, "..") loại bỏ thư mục cuối xong cộng với cái này /public/images
  let uploadPath =
    path.resolve(__dirname, "../public/images") + "/" + finalName;
  console.log("🚀 ~ uploadSingleFile ~ uploadPath:", uploadPath);

  try {
    await fileObject.mv(uploadPath);
    return {
      status: "Success",
      path: finalName,
      error: null,
    };
  } catch (error) {
    return {
      status: "Failed",
      path: null,
      error: JSON.stringify(error),
    };
  }
};

const uploadMutipleFiles = async (fileArr) => {
  try {
    console.log("🚀 ~ uploadMutipleFiles ~ fileArr:", fileArr);

    let resultArr = [];
    let CountSuccess = 0;

    for (let i = 0; i < fileArr.length; i++) {
      let extName = path.extname(fileArr[i].name); //lấy được đuôi như .png,.jpg...
      let baseName = path.basename(fileArr[i].name, extName); //lấy được tên đằng trước ví dụ abc.jpg thì lấy được abc

      let finalName = `${baseName}-${Date.now()}${extName}`;
      let uploadPath =
        path.resolve(__dirname, "../public/images") + "/" + finalName; //loại bỏ thư mục cuối xong cộng với cái này /public/images
      try {
        await fileArr[i].mv(uploadPath);
        resultArr.push({
          status: "Success",
          path: finalName,
          fileName: fileArr[i].name,
          error: null,
        });
        CountSuccess++;
      } catch (error) {
        resultArr.push({
          status: "Failed",
          path: null,
          fileName: null,
          error: JSON.stringify(error),
        });
      }
    }

    return {
      CountSuccess: CountSuccess,
      detail: resultArr,
    };
  } catch (error) {
    console.log("🚀 ~ uploadMutipleFiles ~ error:", error);
  }
};

module.exports = { uploadSingleFile, uploadMutipleFiles };
