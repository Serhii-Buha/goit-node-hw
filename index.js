const { Command } = require('commander');
const program = new Command();

const {
  listContacts,
  getContactById,
  addContact,
  removeContact,
} = require('./contacts');

program
  .option('-a, --action <action>', 'choose action')
  .option('-i, --id <id>', 'contact id')
  .option('-n, --name <name>', 'contact name')
  .option('-e, --email <email>', 'contact email')
  .option('-p, --phone <phone>', 'contact phone');

program.parse(process.argv);
const argv = program.opts();

const invokeAction = async ({ action, id, name, email, phone }) => {
  switch (action) {
    case 'list':
      const contacts = await listContacts();
      console.table(contacts);
      break;

    case 'get':
      const contact = await getContactById(id);
      console.log(contact ?? null);
      break;

    case 'add':
      const newContact = await addContact(name, email, phone);
      console.log(newContact);
      break;

    case 'remove':
      const removedContact = await removeContact(id);
      console.log(removedContact ?? null);
      break;

    default:
      console.warn('\x1B[31m Unknown action type!');
  }
};

invokeAction(argv);
