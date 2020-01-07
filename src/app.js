require('dotenv').config()

import {createDatabaseConnection} from "./utils/database";
import express from 'express'
import router from './routers'
import cors from 'cors'
import { initModels } from "./models";
import bodyParser from 'body-parser';
import { addAdminManually } from "./controllers/user";

const app = express();

const connection = createDatabaseConnection();
initModels(connection);

app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }))

app.use(express.json());

app.use(router);

const server = app.listen(process.env.PORT || 5000, async function () {
   const host = server.address().address || 'localhost';
   const port = server.address().port;

   console.log("Listening at http://%s:%s", host, port);

   await connection.sync();
});
