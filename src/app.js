require('dotenv').config()
import express from 'express'
import exampleRouter from './routers/example/example'
import authRouter from './routers/auth'
import * as mysql from 'mysql'
import cors from 'cors'

const app = express();
const server = app.listen(process.env.PORT || 5000, function () {
   const host = server.address().address || 'localhost'
   const port = server.address().port
   
   console.log("Listening at http://%s:%s", host, port)
})

let connection;

/* function handleDisconnect() {
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
*/

app.use(cors())

app.use(express.json());
app.use('/auth', authRouter);
app.use('/example', exampleRouter);

// match with this if no other route catches
app.use('/', (req, res) => {
   res.send('ERR_ROUTE_NOT_DEFINED')
});
