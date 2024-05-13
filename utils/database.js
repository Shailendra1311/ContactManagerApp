import SQLite from 'react-native-sqlite-storage';

const DB_NAME = 'contacts.db';
const DB_VERSION = '1.0';
const DB_DISPLAY_NAME = 'Contacts Database';
const DB_SIZE = 200000; // Size of the database in bytes

const db = SQLite.openDatabase(
  { name: DB_NAME, version: DB_VERSION, displayName: DB_DISPLAY_NAME, size: DB_SIZE },
  () => {},
  error => {
    console.error('Error opening database:', error);
  }
);

// Create a table for contacts if it doesn't exist
db.transaction(tx => {
  tx.executeSql(
    'CREATE TABLE IF NOT EXISTS contacts (id INTEGER PRIMARY KEY AUTOINCREMENT, name TEXT, phone TEXT, photo TEXT)'
  );
});

export default db;
