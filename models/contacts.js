const fs = require("fs").promises;
const path = require("path");
const { nanoid } = require("nanoid");

const contactsPath = path.join(__dirname, "", "contacts.json");
// console.log(contactsPath); // D:\Documents\GitHub\node\nodejs-homework-REST-API\models\contacts.json
// console.log(__dirname); // D:\Documents\GitHub\node\nodejs-homework-REST-API\models

const listContacts = async () => {
  try {
    const contactsData = await fs.readFile(contactsPath);
    // console.log(contactsData);
    const contacts = JSON.parse(contactsData);

    // console.table(contacts);

    return contacts;
  } catch (error) {
    console.error(error.message);
  }
};

const getContactById = async (contactId) => {
  try {
    const contacts = await listContacts();

    const contact = contacts.find((contact) => contactId === contact.id);

    // console.log(contact ?? null);
    return contact ?? null;
  } catch (error) {
    console.error(error.message);
  }

  // ...твой код. Возвращает объект контакта с таким id. Возвращает null, если объект с таким id не найден.
};

const addContact = async (data) => {
  try {
    const contacts = await listContacts();

    const existingContact = contacts.find(
      (contact) =>
        contact.name === data.name &&
        contact.email === data.email &&
        contact.phone === data.phone
    );

    if (existingContact) {
      console.log("Contact already exists");
      return;
    }

    const newContact = {
      id: nanoid(),
      ...data,
      // name: name,
      // email: email,
      // phone: phone,
    };

    contacts.push(newContact);

    await fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2));

    // console.log(newContact);
    return newContact;
  } catch (error) {
    console.error(error.message);
  }

  // ...твой код. Возвращает объект добавленного контакта.
};

const removeContact = async (contactId) => {
  try {
    const removedContact = await getContactById(contactId);

    if (!removedContact) {
      console.log(null);
      return null; // Контакт с указанным id не найден
    }

    // const contactsData = await fs.readFile(contactsPath);
    // const contacts = JSON.parse(contactsData);
    const contacts = await listContacts();
    const updatedContacts = contacts.filter(
      (contact) => contact.id !== contactId
    ); // Фильтруем контакты, исключая удаленный контакт

    await fs.writeFile(contactsPath, JSON.stringify(updatedContacts, null, 2)); // Записываем обновленный список контактов в файл
    // console.log(removedContact ?? null);
    return removedContact ?? null; // Возвращаем удаленный контакт
  } catch (error) {
    console.error(error.message);
  }
};

// ...твой код. Возвращает объект удаленного контакта. Возвращает null, если объект с таким id не найден.

const updateContact = async (id, data) => {
  try {
    const contacts = await listContacts();
    const index = contacts.findIndex((contact) => contact.id === id);

    // console.log(index);

    if (index !== -1) {
      // Если такой контакт найден
      // contacts[index] = { ...contacts[index], ...data };
      contacts[index] = { id, ...data };

      await fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2));

      return contacts[index];
    }

    return null;
  } catch (error) {
    console.error(error.message);
  }
};

module.exports = {
  listContacts,
  getContactById,
  addContact,
  removeContact,
  updateContact,
  contactsPath,
};
