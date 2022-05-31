//Install all of this on npm
const express = require("express");
const mariadb = require("mariadb");
const sessions = require('express-session');
const bcrypt = require("bcrypt");
const cors = require('cors');
const { ColdObservable } = require("rxjs/internal/testing/ColdObservable");

const pool = mariadb.createPool({
    host: 'localhost', 
    user:'api', 
    password: 'api',
    database: 'doomle'
});

function verify(arr){
    for(var i=0;i<arr.length;i++){
        if(arr[i] == undefined){
            return false;
        }
    }
    return true;
}


const app = express();

app.use(express.json());

var corsOptions = {
    origin: '*',
     // some legacy browsers (IE11, various SmartTVs) choke on 204
  }

app.use(cors(corsOptions));


const oneDay = 1000 * 60 * 60 * 24;

app.use(sessions({
    secret: "imlikeasupertrooperbeamsaregonnalightme",
    saveUninitialized:true,
    cookie: { maxAge: oneDay },
    resave: false 
}));


//=== User
app.post("/login", async (req, res)=>{
    try{
        console.log("[AUTH]Login requested");
        const query = `SELECT mail, type, password FROM user WHERE mail = "${req.body.username}";`
        const result = await pool.query(query)
        if(result[0]){
            req.session.userid = 1;
            res.status(200).send("Login succesfull");  
        }else{
            res.status(200).send("Bad password")
        }
    }catch (err) {
        console.error(err)
        res.status(400).send("Bad request");
    }
});

app.get("/login", async (req, res)=>{
    if(req.session.userid){
        res.status(200).send("Ok"); 
    }else{
        res.status(200).send("Not logged in");
    }
    
});

app.post("/newuser", async (req, res)=>{
    try{
        console.log("[AUTH]New user creation requested");

        data = req.body;

        if(verify([data.name, data.fam_name, data.mail, data.password])==false){
            throw "Bad request" ;
        }

        const pseudo = (req.body.name[0] + req.body.fam_name).toLowerCase();


        const query = `INSERT INTO doomle (pseudo, name, fam_name, mail, password, type) \
VALUES  ("${pseudo}", "${req.body.name}", "${req.body.fam_name}", "${req.body.mail}", "${req.body.password}", "student");`;
        console.log(query)
        res.status(200).send("ok");
    }catch (err) {
        console.error(err)
        res.status(400).send("Bad request");
    }
});


app.get("/logout", async (req, res) =>{
    req.session.destroy();
    res.status(200).send("Logged out");
});



// == Ressources
app.post("/ressource", async (req, res)=>{
    try{
        console.log("[AUTH]Login requested");
        const query = `SELECT path FROM ressource;`
        const result = await pool.query(query)
        if(result[0]){
            req.session.userid = 1;
            res.status(200).send("Ressource successfully got");  
        }
    }catch (err) {
        console.error(err)
        res.status(400).send("Bad request");
    }
});







// == Test purpose
app.get("/ping", async (req, res)=>{
    res.status(200).send("pong");   
});

app.get("/tea", async (req, res)=>{
    res.status(418).send('<img src="https://www.ubuy.sn/productimg/?image=aHR0cHM6Ly9tLm1lZGlhLWFtYXpvbi5jb20vaW1hZ2VzL0kvNTFRaGVrUHY4YkwuX0FDX1NMMTAwMV8uanBn.jpg" alt="teapot"/>')
});

console.log("listening on port 8080");
app.listen(8080);
