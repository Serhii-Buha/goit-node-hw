const bcrypt = require("bcrypt");
const { registerShema } = require("../../schemas");
const { httpError } = require("../../utils");
const { User } = require("../../models");

exports.register = async (req, res, next) => {
  try {
    const { error } = registerShema.validate(req.body);
    // console.log(req.body); // { name: 'sdsd', email: 'ser@gmail.com', password: '123456' }
    if (error) throw httpError(400, error);

    const { email, password } = req.body; // 123456

    const user = await User.findOne({ email });
    if (user) throw httpError(409, "Email in use");

    const hashPassword = await bcrypt.hash(password, 10);

    const newUser = await User.create({ ...req.body, password: hashPassword });
    // console.log({ ...req.body, password: hashPassword });
    // {
    //   name: 'sdsd',
    //   email: 'ser@gmail.com',
    //   password: '$2b$10$u3AxAHNUBEBNPtrl3RAHTOe.UbT5Uqysn4.xszWLVAQXdBQlDLRce'
    // }

    // console.log(newUser);
    // {
    //   password: '$2b$10$ZrHLGA5lzOLvDlcIy3NdKuFhAFj./1Z82x2L4f9kaSeiQm0Rhxk9K',
    // email: 'ser@gmail.com',
    // subscription: 'starter',
    // token: null,
    // _id: new ObjectId("64b8da791d8a3646210efea6"),
    // createdAt: 2023-07-20T06:55:53.688Z,
    // updatedAt: 2023-07-20T06:55:53.688Z
    // }
    res.status(201).json({
      user: {
        email: newUser.email,
        subscription: newUser.subscription,
      },
    });
  } catch (error) {
    next(error);
  }
};
