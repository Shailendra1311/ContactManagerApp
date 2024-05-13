import SQLite from 'react-native-sqlite-storage';

// Open the database
const db = SQLite.openDatabase(
  { name: 'contacts.db', createFromLocation: '~www/contacts.db' },
  () => { console.log('Database opened successfully.'); },
  error => { console.error('Failed to open database:', error); }
);

// Save a new contact to the database
export const saveContact = async (contact) => {
  return new Promise((resolve, reject) => {
    db.transaction(tx => {
      tx.executeSql(
        'INSERT INTO contacts (name, phone, photo) VALUES (?, ?, ?)',
        [contact.name, contact.phone, contact.photo],
        (_, result) => {
          console.log('Contact saved:', result);
          resolve(true);
        },
        (_, error) => {
          console.error('Error saving contact:', error);
          reject(false);
        }
      );
    });
  });
};

// Update an existing contact in the database
export const updateContact = async (contact) => {
  return new Promise((resolve, reject) => {
    db.transaction(tx => {
      tx.executeSql(
        'UPDATE contacts SET name=?, phone=?, photo=? WHERE id=?',
        [contact.name, contact.phone, contact.photo, contact.id],
        (_, result) => {
          console.log('Contact updated:', result);
          resolve(true);
        },
        (_, error) => {
          console.error('Error updating contact:', error);
          reject(false);
        }
      );
    });
  });
};

// Delete a contact from the database
export const deleteContact = async (id) => {
  return new Promise((resolve, reject) => {
    db.transaction(tx => {
      tx.executeSql(
        'DELETE FROM contacts WHERE id=?',
        [id],
        (_, result) => {
          console.log('Contact deleted:', result);
          resolve(true);
        },
        (_, error) => {
          console.error('Error deleting contact:', error);
          reject(false);
        }
      );
    });
  });
};

// Retrieve all contacts from the database
export const getAllContacts = async () => {
  return new Promise((resolve, reject) => {
    db.transaction(tx => {
      tx.executeSql(
        'SELECT * FROM contacts',
        [],
        (_, result) => {
          const rows = result.rows.raw();
          resolve(rows);
        },
        (_, error) => {
          console.error('Error fetching contacts:', error);
          reject([]);
        }
      );
    });
  });
};
