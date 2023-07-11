const app = require("./app");
const {
  listContacts,
  getContactById,
  addContact,
  removeContact,
  updateContact,
  contactsPath,
} = require("./models/contacts");

app.listen(3000, async () => {
  console.log("Server running. Use our API on port: 3000");

  // console.log(contactsPath);
  // console.log(await listContacts());
  // console.log(await getContactById("C9sjBfCo4UJCWjzBnOtxl"));
  // console.log(await removeContact("C9sjBfCo4UJCWjzBnOtxl"));
  // console.log(await addContact("serg", "fsfsf@gag.com", "35545"));
  // console.log(await updateContact('rsKkOQUi80UsgVPCcLZZW', {name: 'serg',email: 'fsfsafasf', phone: '(748) 206-2688' }));
});
