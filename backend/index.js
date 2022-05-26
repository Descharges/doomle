//Install all of this on npm
const express = require("express");
const mariadb = require("mariadb");
const sessions = require('express-session');
const bcrypt = require("bcrypt");
const cors = require('cors')



const app = express();

app.use(express.json());

var corsOptions = {
    origin: '*',
     // some legacy browsers (IE11, various SmartTVs) choke on 204
  }

app.use(cors(corsOptions));


const myusername = 'cringe@cringe.cringe'
const mypassword = 'cringe'

const oneDay = 1000 * 60 * 60 * 24;

app.use(sessions({
    secret: "imlikeasupertrooperbeamsaregonnalightme",
    saveUninitialized:true,
    cookie: { maxAge: oneDay },
    resave: false 
}));

app.post("/login", async (req, res)=>{
    try{
        console.log(req.body.username);
        console.log(myusername);
        if(req.body.username == myusername && req.body.password == mypassword){
            req.session.userid = myusername;
            console.log(req.session);
            res.status(200).send("Login succesfull");  
        }else{
            res.status(200).send("Bad password")
        }
    }catch{
        res.status(400).send("Bad request");
    }
});

app.get("/logout", async (req, res) =>{
    req.session.destroy();
    res.status(200).send("Logged out");
});

app.get("/login", async (req, res)=>{
    if(req.session.userid){
        res.status(200).send("Ok"); 
    }else{
        res.status(200).send("Not logged in");
    }
    
});

app.get("/ping", async (req, res)=>{
    res.status(200).send("pong");   
});

app.get("/tea", async (req, res)=>{
    res.status(418).send('<img src="https://www.ubuy.sn/productimg/?image=aHR0cHM6Ly9tLm1lZGlhLWFtYXpvbi5jb20vaW1hZ2VzL0kvNTFRaGVrUHY4YkwuX0FDX1NMMTAwMV8uanBn.jpg" alt="teapot"/>')
});

console.log("listening on port 8080");
app.listen(8080);
