const db = require('../helpers/db');

module.exports = {
  getAllItems: () => {
    return db.listAll('items');
  },

  add: (title, description) => {
    return db.insert('items', { title, description });
  },

  delete: (id) => {
    return db.delete('items', id);
  },
};