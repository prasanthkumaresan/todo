const express = require('express')
const path = require('path')
const {open} = require('sqlite')
const sqlite3 = require('sqlite3')
const cors = require('cors')
const app = express()
const jwt = require('jsonwebtoken')
const { error } = require('console')
app.use(cors())
app.use(express.json())

app.use((req,res,next) => {
    res.setHeader("Access-Control-Allow-Origin", "*")
    next()
})

const dbPath = path.join(__dirname,"database.db")

let db = null

const initializeDbandServer = async () => {
    try{
        db = await open({
            filename: dbPath,
            driver: sqlite3.Database,
        })
        app.listen(3001, () => {
            console.log("server initialized")
        })
    }
    catch (e){
        console.log(`DB Error : ${e.message}`)
        process.exit(1)
    }
}

initializeDbandServer()

const authenticateToken = (req,res,next) => {
    let jwtToken;
    const author = req.headers["authorization"];
    console.log(author);
    if (author === undefined){
        res.status = 401;
        res.send("Invalid token");
    }else {
        jwtToken = author.split(" ")[1];
        if (jwtToken === undefined){
            res.status = 401;
            res.send("Invalid token");
        }else {
            jwt.verify(jwtToken,"MY_SECRET_TOKEN", async (error, payload) => {
                if(error){
                    res.status = 401;
                    res.send("Invalid token")
                }else {
                    req.username = payload.username;
                    next();
                }
            })
        }
    }
}


app.post("/validpass",async (request,response) => {
    const {username,password} = request.body
    const searchquery = `select * from users where username='${username}' and  password='${password}'`
    const result = await db.get(searchquery)
    if (result === undefined){
        response.send({validation : false})
    }else {
        const payload = {
            username: username,
        }
        const jwtToken = jwt.sign(payload, "MY_SECRET_TOKEN")
        response.send({jwtToken})
    }
})

app.get("/gettodo", authenticateToken, async (req,res) => {
    const {username} = req;
    const userQuery = `SELECT * FROM users WHERE username = '${username}'`
    const userDetails = await db.get(userQuery)
    const getQuery = `SELECT * FROM todolist WHERE userid ='${userDetails.id}'`
    const result = await db.all(getQuery);
    if (getQuery === undefined){
        res.send("Error")
    }else {
        res.send(result);
    }
})

app.post("/createtodo", authenticateToken, async (req,res) => {
    const {username} = req;
    console.log(req);
    const {todoid,todo,status} = req.body;
    const userQuery = `SELECT * FROM users WHERE username = '${username}'`
    const userDetails = await db.get(userQuery)
    const insertQuery = `INSERT INTO todolist(todoid,todo,status,userid) VALUES ('${todoid}', '${todo}', '${status}', '${userDetails.id}' )`
    const dbResponse = await db.run(insertQuery)
    res.send(dbResponse)
    
})
app.post("/signing", async (req,res) => {
    const {id, username, password} = req.body;
    const insertQuery = `INSERT INTO users(id,username,password) VALUES ('${id}', '${username}', '${password}')`
    const dbResponse = await db.run(insertQuery)
    res.send(dbResponse)
    
})