const fs = require("fs/promises");
const path = require("path");
const { v4: generateId } = require("uuid");

const contactsPath = path.join(__dirname, "db", "contacts.json");

const listContacts = async () => JSON.parse(await fs.readFile(contactsPath));

const getContactById = async (contactId) => {
  contactId = String(contactId);
  if (!contactId) throw new Error("Undeclared contact ID");

  const contactsList = await listContacts();
  const contact = contactsList.find(({ id }) => contactId === id);

  if (!contact) throw new Error(`Contact with id ${contactId} was not found`);

  return contact;
};

const removeContact = async (contactId) => {
  contactId = String(contactId);
  if (!contactId) throw new Error("Undeclared contact ID");

  const contactsList = await listContacts();
  const idx = contactsList.findIndex(({ id }) => contactId === id);
  if (idx === -1) throw new Error(`Contact with id ${contactId} was not found`);

  const [deletedContact] = contactsList.splice(idx, 1);

  await updateContactsList(contactsList);

  return deletedContact;
};

const addContact = async (body) => {
  const { name, email, phone } = body;

  const contactsList = await listContacts();
  const newContact = {
    id: generateId(),
    name,
    email,
    phone,
  };

  contactsList.push(newContact);
  await updateContactsList(contactsList);
  return newContact;
};

const updateContact = async (contactId, body) => {
  contactId = String(contactId);
  if (!contactId) throw new Error("Undeclared contact ID");

  const contactsList = await listContacts();
  const idx = contactsList.findIndex(({ id }) => contactId === id);
  if (idx === -1) throw new Error(`Contact with id ${contactId} was not found`);

  Object.assign(contactsList[idx], body);

  await updateContactsList(contactsList);
  return contactsList[idx];
};

const updateContactsList = async (updatedContactsList) => {
  await fs.writeFile(
    contactsPath,
    JSON.stringify(updatedContactsList, null, 2)
  );
};

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
};
