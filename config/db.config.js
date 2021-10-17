const dbConfig= {
    "host": "localhost",
    "port": 5432,
    "database": "blogapidb",
    "user": "postgres"
  };
  
  const pgp = require("pg-promise")({});
  const db = pgp(dbConfig);

  module.exports = db;

 