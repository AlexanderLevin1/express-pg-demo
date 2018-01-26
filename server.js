const express = require('express');
const app = express();

const port = process.env.PORT || 3000;
app.listen(port, ()=> console.log(`listening on port ${port}`));

app.use('/users', require('./routes/users'));

const db = require('./db');

db.sync((err)=> {
  if(err) return console.log(err);
  db.getUsers((err, users)=> {
    if(err) return console.log(err);
    console.log(users.length);
    db.seed((err)=> {
      if(err) return console.log(err);
      db.getUsers((err, users)=> {
        if(err) return console.log(err);
        console.log(users.length);
        db.getUser(2, (err, user)=> {
          if(err) return console.log(err);
          console.log(user.name);
        });
      });
    });

  });

});

console.log(process.env.DATABASE_URL);
