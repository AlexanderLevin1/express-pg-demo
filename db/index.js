const pg = require('pg');

const client = new pg.Client(process.env.DATABASE_URL);

client.connect();

const SQL_CREATE = `
  DROP TABLE IF EXISTS users;
  CREATE TABLE users(
    id SERIAL PRIMARY KEY,
    name VARCHAR(255)
  );
`;

const SQL_SEED = `
  INSERT INTO users(name) values('moe');
  INSERT INTO users(name) values('larry');
  INSERT INTO users(name) values('curly');
`;

const sync = (cb)=> {
  client.query(SQL_CREATE, cb);
};

const seed = (cb)=> {
  client.query(SQL_SEED, cb);
}

const getUsers = (cb)=> {
  client.query('select * from users', (err, result)=> {
    if(err) return cb(err);
    cb(null, result.rows);
  });
};

const getUser = (id, cb)=> {
  client.query('SELECT * from users WHERE id = $1', [ id ], (err, result)=> {
    if(err) return cb(err);
    cb(null, result.rows.length ? result.rows[0] : null);
  });

};

module.exports = {
  getUsers,
  getUser,
  sync,
  seed
};
