import {client} from '../database/connection.js'  

const create = async(req,res)=> {
    try {
        const {username,email,password} = req.body
        await client.connect();
        console.log('connected')
        const db =  client.db("CRUD");
        const myColl = db.collection("users");
        const result = await myColl.insertOne({username,email,password});
        res.redirect('/users')
    }
    catch (error) {
        console.log(error)
    } 
    finally {
        await client.close();
    }
}


const read = async(req,res)=> {
    try {    
        let users =[]
        await client.connect();
        console.log('connected')
        const db =  client.db("CRUD");
        const myColl = db.collection("users");
        const result = myColl.find();
        await result.forEach(element=>users.push(element));
        res.render('../views/view.ejs',{users})
    } 
    catch (error) {
        console.log(error)
    }
    finally {
      await client.close();
    }
}

const edit = async(req,res)=> {
    try {
        const username =req.params.username
        await client.connect();
        const db =  client.db("CRUD");
        const user = await db.collection('users').findOne({ username });
        res.render('../views/edit.ejs',{user})
    } 
    catch (error) {
        console.log(error)
    }
    finally {
      await client.close();
    }
}

const update = async(req,res)=> {
    try {
        const username =req.params.username
        await client.connect();
        console.log('connected')
        const db =  client.db("CRUD");
        await db.collection('users').updateOne({ username }, { $set: { username: req.body.username, email: req.body.email, password : req.body.password } });
        res.redirect('/users')
    } 
    catch (error) {
        console.log(error)
    }
    finally {
      await client.close();
    }
}


const remove = async(req,res)=> {
    try {
        console.log('update controller')
        const username =req.params.username
        console.log(req.body)
        await client.connect();
        console.log('connected')
        const db =  client.db("CRUD");
        await db.collection('users').deleteOne({ username })
        res.redirect('/users')
    } 
    catch (error) {
        console.log(error)
    }
    finally {
      await client.close();
    }
}


export {create,read,edit,update,remove}