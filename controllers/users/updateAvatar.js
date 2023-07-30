const fs = require("fs/promises");
const path = require("path");
const Jimp = require("jimp");
const { User } = require("../../models");
const { httpError } = require("../../utils");

const avatarsDir = path.join(__dirname, "../../", "public", "avatars");
// console.log(avatarsDir); // D:\Documents\GitHub\node\nodejs-homework-REST-API\public\avatars

exports.updateAvatar = async (req, res, next) => {
  try {
    const { _id } = req.user;
    const { path: tempUpload, originalname } = req.file;
    const fileName = `${_id}_${originalname}`;
    const resultUpload = path.join(avatarsDir, fileName);

    const image = await Jimp.read(tempUpload);
    await image.resize(250, 250);
    await image.writeAsync(tempUpload);

    // console.log(resultUpload); // D:\Documents\GitHub\node\nodejs-homework-REST-API\public\avatars\64c28928c601e11d2d79ef74_troll-8108315.png
    // console.log(tempUpload); // D:\Documents\GitHub\node\nodejs-homework-REST-API\tmp\troll-8108315.png

    await fs.rename(tempUpload, resultUpload);
    // старый путь tempUpload = D:\Documents\GitHub\node\nodejs-homework-REST-API\tmp\troll-8108315.png
    // новый путь resultUpload =D:\Documents\GitHub\node\nodejs-homework-REST-API\public\avatars\64c28928c601e11d2d79ef74_troll-8108315.png

    const avatarURL = path.join("avatars", fileName);
    // console.log(avatarURL); // avatars\64c28928c601e11d2d79ef74_troll-8108315.png

    const updatedUser = await User.findByIdAndUpdate(
      _id,
      { avatarURL },
      { new: true }
    );

    if (!updatedUser) throw httpError(404, "Not found");

    res.status(200).json({ avatarURL });
  } catch (error) {
    next(error);
  }
};

// const user = [];
// router.post("/users/avatars", upload.single("avatar"), async (req, res) => {

//   const { path: tempUpload, originalname } = req.file;
//   const resultUpload = path.join(avatarsDir, originalname);
// console.log(avatarsDir); // D:\Documents\GitHub\node\nodejs-homework-REST-API\public\avatars
// console.log(resultUpload); // D:\Documents\GitHub\node\nodejs-homework-REST-API\public\avatars\troll-8108315.png

// await fs.rename(tempUpload, resultUpload);
// старый путь tempUpload = D:\\Documents\\GitHub\\node\\nodejs-homework-REST-API\\temp\\troll-8108315.png
// новый путь resultUpload =D:\Documents\GitHub\node\nodejs-homework-REST-API\public\avatars\troll-8108315.png

// const avatar = path.join("avatars", originalname);
// console.log(avatar); // avatars\troll-8108315.png

// const newUser = {
//   id: nanoid(),
//   ...req.body,
//   avatarURL: avatar,
// };

// user.push(newUser);
// console.log(user);
// [
//   {
//     id: 'vmWhKll50dVPg7xKf5X3g',
//     avatarURL: 'avatars\\troll-8108315.png'
//   }
// ]

// res.status(201).json(newUser);

// console.log(req.body);

// console.log(req.file); // {
//   fieldname: 'avatar',
//   originalname: 'troll-8108315.png',
//   encoding: '7bit',
//   mimetype: 'image/png',
//   destination: 'D:\\Documents\\GitHub\\node\\nodejs-homework-REST-API\\temp',
//   filename: 'troll-8108315.png',
//   path: 'D:\\Documents\\GitHub\\node\\nodejs-homework-REST-API\\temp\\troll-8108315.png',
//   size: 5682640
// }
//
// });

// берет из req-body-form название поля "avatar" один файл и сохраняет в папку temp, все другие поля будут текстовыми и будут записаны в req-body, а файл в req.file

// v2 upload.array("avatar", 5) // т.е. запиши в 1 поле avatar 5 файлов макс
// v3 upload.fields([{name:"avatar", maxCount: 5}, {name:"profile", maxCount: 3}]) // т.е. запиши в 1 поле avatar до 5 файлов , в 2 поле profile до 3 файлов
