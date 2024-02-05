import Express  from "express";
const app = Express()
import 'dotenv/config'
// import {connection} from './database/connection.js'
import { router } from "./routes/route.js";
// import { MongoClient, ServerApiVersion }  from "mongodb";
import {fileURLToPath} from 'url';
import path from 'path';
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const port = process.env.PORT

app.set('view engine','ejs')
app.use(Express.urlencoded({extended:true}))
app.use(Express.static('public'))


// connection()

app.use('/',router)

app.listen(port,()=>console.log('server is running'))