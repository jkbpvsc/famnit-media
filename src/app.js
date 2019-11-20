require('dotenv').config()
const express = require('express');
const app = express();
const exampleRouter = require('../src/routers/example')
const mysql = require('mysql')

const server = app.listen(process.env.PORT || 3000, function () {
   const host = server.address().address || 'localhost'
   const port = server.address().port
   
   console.log("Listening at http://%s:%s", host, port)
})

let connection;

function handleDisconnect() {
  connection = mysql.createConnection(process.env.DATABASE_URL);
  global.db = connection;

  connection.connect(function(err) {
    if(err) {
      console.log('error when connecting to db:', err);
      setTimeout(handleDisconnect, 10);
    }
  });
  connection.on('error', function(err) {
    console.log('db error', err);
    if(err.code === 'PROTOCOL_CONNECTION_LOST') {
      handleDisconnect();
    } else {
      throw err;
    }
  });
}

handleDisconnect();

app.use(express.json());

app.use('/example', exampleRouter);

// match with this if no other route catches
app.use('/', (req, res) => {
   res.send('ERR_ROUTE_NOT_DEFINED')
});
