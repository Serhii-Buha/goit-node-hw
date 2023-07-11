const express = require("express");
const joi = require("joi");

const router = express.Router();

const {
  listContacts,
  getContactById,
  addContact,
  removeContact,
  updateContact,
  contactsPath,
} = require("../../models/contacts");

const addShema = joi.object({
  name: joi.string().required(),
  email: joi.string().required(),
  phone: joi.string().required(),
});

const { httpError } = require("../../utils/httpError");

router.get("/", async (req, res, next) => {
  try {
    const result = await listContacts();
    res.json(result);
    // http://localhost:3000/api/contacts
  } catch (error) {
    next(error);
    // res.status(500).json({ message: "Server error" });
    // console.log(error.message);
  }
});

router.get("/:contactId", async (req, res, next) => {
  console.log(req.params); // динамические параметры запроса адресной строки
  try {
    const { contactId } = req.params;
    const result = await getContactById(contactId);

    if (!result) throw httpError(404, "Not found");

    res.json(result);

    // http://localhost:3000/api/contacts/C9sjBfCo4UJCWjzBnOtxl
  } catch (error) {
    next(error);
    // const { status = 500, message = "Server error" } = error;
    // res.status(status).json({ message });
  }
});

router.post("/", async (req, res, next) => {
  console.log(req.body); // { name: 'ser', email: 'fsfsf@gag.com', phone: '35545' }
  try {
    const { error } = addShema.validate(req.body);
    if (error) throw httpError(400, "missing required name field");

    const result = await addContact(req.body);
    res.status(201).json(result);
  } catch (error) {
    next(error);
    // res.json({ message: "template message" });
  }
});

router.delete("/:contactId", async (req, res, next) => {
  try {
    const { contactId } = req.params;
    const result = await removeContact(contactId);

    if (!result) throw httpError(404, "Not found");
    res.status(200).json({ message: "contact deleted" });

    // http://localhost:3000/api/contacts/rsKkOQUi80UsgVPCcLZZW
  } catch (error) {
    next(error);
  }
});

router.put("/:contactId", async (req, res, next) => {
  console.log(req.params); // { contactId: 'rsKkOQUi80UsgVPCcLZZW' }
  console.log(req.body); // {name: 'serg',email: 'fsfsafasf', phone: '(748) 206-2688' }
  try {
    const { error } = addShema.validate(req.body);
    if (error) throw httpError(400, "missing fields");

    const { contactId } = req.params; // динамические параметры запроса адресной строки
    const result = await updateContact(contactId, req.body);

    if (!result) throw httpError(404, "Not found");
    res.status(200).json(result);
  } catch (error) {
    next(error);
    // res.json({ message: "template message" });
  }
});

module.exports = router;
