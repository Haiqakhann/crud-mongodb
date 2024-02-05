import  express from "express";
const router = express.Router()
import {create,read, edit,update,remove} from '../controller/curd.js'

router.route('/')
    .get((req,res)=>res.render('../views/index.ejs'))
    .post(create)

router.route('/users')
    .get(read)

router.route('/edit/:username')
    .get(edit)
    .post(update)

router.route('/delete/:username')
    .get(remove)
export {router}