const joi = require("joi");
const { Schema } = require("mongoose");
const { mongooseError } = require("../utils");

const addSchema = joi.object({
  name: joi.string().required(),
  email: joi.string().required(),
  phone: joi.string().required(),
  favorite: joi.boolean(),
});

const contactSchema = new Schema(
  {
    name: {
      type: String,
      required: [true, "Set name for contact"],
    },
    email: {
      type: String,
    },
    phone: {
      type: String,
    },
    favorite: {
      type: Boolean,
      default: false,
    },
    owner: {
      type: Schema.Types.ObjectId,
      ref: "user", // 'user' - название коллекции (в единственном числе), с которой будет ObjectId user
      required: true,
    },
    // в каждый контакт мы обязательно записываем owner т.е. владелец его user _id и по id owner т.е.  пользователя в каждом контакте мы понимаем что контакт принадлежит определенному user
  },
  { versionKey: false, timestamps: true }
);

contactSchema.post("save", mongooseError);

const updateFavoriteSchema = joi.object({
  favorite: joi.boolean().required(),
});

module.exports = {
  addSchema,
  contactSchema,
  updateFavoriteSchema,
};
