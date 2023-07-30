const { Contact } = require("../../models");
const { addSchema } = require("../../schemas");
const { httpError } = require("../../utils");

exports.add = async (req, res, next) => {
  try {
    const { error } = addSchema.validate(req.body);
    if (error) throw httpError(400, "missing required name field");

    const { _id: owner } = req.user;
    // console.log(req.user._id); // new ObjectId("64bb98264a3326c3d56fcc62")
    // console.log(owner); // new ObjectId("64bb98264a3326c3d56fcc62")

    const result = await Contact.create({ ...req.body, owner });
    // console.log(result);

    res.status(201).json(result);
  } catch (error) {
    next(error);
  }
};
