const fs = require('fs').promises;
const { nanoid } = require('nanoid');
const path = require('path');

const contactsPath = path.join(__dirname, 'db', 'contacts.json');

/**
 * @function listContacts
 * This asynchronous function reads data from a file, parses it into JSON format and returns the parsed information.
 *
 * @returns {Array} contacts - Returns an array of contact objects.
 */

const listContacts = async () => {
  const contactsData = await fs.readFile(contactsPath);

  const contacts = JSON.parse(contactsData);

  return contacts;
};

/**
 * @function getContactById
 * This asynchronous function retrieves a specific contact by its ID. If no matching contact is found, it will return null.
 *
 * @param {string} contactId - The unique identifier for a contact.
 *
 * @returns {Object|null} - Returns either an object representing the matched contact or null if no match was found.
 */

const getContactById = async contactId => {
  const contacts = await listContacts();

  const contact = contacts.find(contact => contactId === contact.id);

  return contact ?? null;
};

/**
 * @function addContact
 * This asynchronous function adds new entries to the existing set of contacts. It first checks whether any existing entry has 
   the same name, email and phone number as those provided; if so, it logs "Contact already exists" and terminates without adding anything new. Otherwise,
   it creates a new entry with these details plus an id generated using nanoid(), appends this to the end of 
   current dataset and writes everything back to storage before returning newly created object.

* @param {string} name - The name of person that wants to be added as Contact.
* @param {string} email - Email address associated with this individual's account which serves as their primary point of communication..
* @param {number|string} phone - Phone number associated with this individual's account..

* @returns {(Object|undefined)} Either returns an object corresponding newly added Contact or undefined if such combination already existed beforehand..
*/

const addContact = async (name, email, phone) => {
  const contacts = await listContacts();

  const existingContact = contacts.find(
    contact =>
      contact.name === name &&
      contact.email === email &&
      contact.phone === phone
  );

  if (existingContact) {
    console.log('Contact already exists');
    return;
  }

  const newContact = {
    id: nanoid(),
    name: name,
    email: email,
    phone: phone,
  };

  contacts.push(newContact);
  await fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2));

  return newContact;
};

/** 
 *@function removeContact
This Async function deletes single record from existing dataset based on parameter passed i.e., `contactID`. Before performing deletion operation,
it fetches fresh copy then finds out whether requested entity exists within collection or not —if latter case holds true message gets logged onto console & process ends here itself.. In other scenario where specified item does exist:
1st step involves removing said entity followed by writing updated records back onto underlying system resource after converting them into proper textual representation suitable enough for later retrieval purposes+finally returning removed instance just incase user might want use its contents somewhere else down line perhaps analytics related tasks etc..

*@param {string} contactId - The unique identifier for a contact.

*@returns {Object|null} - Returns either an object representing the matched contact or null if no match was found.
*/

const removeContact = async contactId => {
  const removedContact = await getContactById(contactId);

  if (!removedContact) {
    console.log(null);
    return null;
  }

  const contactsData = await fs.readFile(contactsPath);
  const contacts = JSON.parse(contactsData);
  const updatedContacts = contacts.filter(contact => contact.id !== contactId);
  await fs.writeFile(contactsPath, JSON.stringify(updatedContacts, null, 2));

  return removedContact ?? null;
};

const contactsF = {
  listContacts,
  getContactById,
  addContact,
  removeContact,
};

module.exports = contactsF;