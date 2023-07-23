const { model } = require("mongoose");
const { contactSchema } = require("../schemas/contacts");

const Contact = model("contact", contactSchema); // contact коллекция на сервере contact-s

module.exports = {
  Contact,
};
