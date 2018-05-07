const config = require('config');
const _ = require('lodash');
const mysql = require('promise-mysql');

const query = (sql) => {
  return mysql.createConnection({
    host: config.get('database.host'),
    user: config.get('database.user'),
    password: config.get('database.password'),
    database: config.get('database.name')
  }).then(conn => {
    const results = conn.query(sql);
    conn.end();
    return results;
  });
};

module.exports = {
  getById: (id, tableName) => {
    return query(`select * from ${tableName} where id = ${id}`);
  },

  listAll: (tableName) => {
    return query(`select * from ${tableName}`);
  },

  insert: (tableName, params) => {
    const keys = Object.keys(params).sort();
    const wrapString = _.template('"<%= string %>"');
    return query(`insert into ${tableName} (${keys.join(', ')}) values (
      ${keys.map(key => {
        return _.isString(params[key]) ? wrapString({string: params[key]}) : params[key];
      })
      .join(', ')})`);
  },

  delete: (tableName, id) => {
    return query(`delete from ${tableName} where id = ${id}`);
  },
};