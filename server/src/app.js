const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const passport = require('passport');


// create DB connection
// mongoose.connect('mongodb://127.0.0.1:27017/auth' , {useNewUrlParser: true })
//     .then(() => {console.log('Database is connected')},
//     err => {console.log('Can not connect to the Databases' + err )}
// );
var DATABASE_URL = process.env.DATABASE_URL || 'http://localhost'

mongoose.connect(`mongodb://${DATABASE_URL}/auth`, { useNewUrlParser: true });

var db = mongoose.connection;

db.on('error', function (error) {
  // If first connect fails because server-database isn't up yet, try again.
  // This is only needed for first connect, not for runtime reconnects.
  // See: https://github.com/Automattic/mongoose/issues/5169
  if (error.message && error.message.match(/failed to connect to server .* on first connect/)) {
    setTimeout(function () {
      mongoose.connect(`mongodb://${DATABASE_URL}/auth`, { useNewUrlParser: true }).catch(() => {
        // empty catch avoids unhandled rejections
        () => {console.log('Database is connected')}
      });
    }, 20 * 1000);
  } else {
    // Some other error occurred.  Log it.
    console.error(new Date(), String(error));
  }
});

db.once("open", function(callback){
  console.log("Connection Succeeded" , `mongodb://${DATABASE_URL}/auth` );
});

const users = require('../routes/user');

const app = express();
app.use(passport.initialize());
require('../passport')(passport)

app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});

app.use(bodyParser.urlencoded({extended: false }));
app.use(bodyParser.json());

app.use('/api/users', users);

app.get('/api/test', (req,res) => res.json({msg: "Users works"}));


app.get('/hello', function(req, res) {
    res.send('hello');
})

const PORT  = process.env.PORT || 8081;

app.listen( PORT , () => {
    console.log(`Server is running on PORT ${PORT}`);
})
