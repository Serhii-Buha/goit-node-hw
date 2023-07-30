const multer = require("multer");
const path = require("path");

const tempDir = path.join(__dirname, "../", "tmp");
// console.log(tempDir); // D:\Documents\GitHub\node\nodejs-homework-REST-API\tmp

const multerConfig = multer.diskStorage({
  destination: tempDir,
  filename: (req, file, cb) => {
    // функция для переименования оригинального названия файла
    cb(null, file.originalname);
  },
  // limits: {
  //   fileSize: 1048576,
  // },
});

exports.upload = multer({
  storage: multerConfig,
});
