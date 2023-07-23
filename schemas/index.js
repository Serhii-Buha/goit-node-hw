const { addShema, contactSchema, updateFavoriteSchema } = require("./contacts");
const {
  userSchema,
  registerShema,
  loginShema,
  subscriptionSchema,
} = require("./users");

module.exports = {
  addShema,
  contactSchema,
  updateFavoriteSchema,

  userSchema,
  registerShema,
  loginShema,
  subscriptionSchema,
};
