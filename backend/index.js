//Install all of this on npm
const express = require("express");
const mariadb = require("mariadb");
const sessions = require('express-session');
const bcrypt = require("bcrypt");
const cors = require('cors');
const { ColdObservable } = require("rxjs/internal/testing/ColdObservable");
const { exec } = require("child_process");

BigInt.prototype.toJSON = () => {return this.toString()}

console.clear(); 

const pool = mariadb.createPool({
    host: 'localhost', 
    user:'api', 
    password: 'api',
    database: 'doomle'
});

function verify(arr){
    for(var i=0;i<arr.length;i++){
        if(arr[i] == undefined || arr[i]==""){
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

//Authentification section, request to allow authentification


//request to log in


app.post("/login", async (req, res)=>{
    try{
        data = req.body;
        if(verify([data.username, data.password])==false){
            throw "Bad request" ;
        }
        console.log("[AUTH]Login requested");
        const query = `SELECT * FROM user WHERE mail = "${req.body.username}";`
        const result = await pool.query(query)
        if(result[0] && await bcrypt.compare(req.body.password, result[0].password)){
            req.session.logged = true;
            req.session.user = result[0];
            req.session.user.id = Number(req.session.user.id)
            delete req.session.user.password;
            res.status(200).send("Login succesfull");  
            console.log("[AUTH]Login succesfull of user " + result[0].pseudo);
        }else{
            res.status(200).send("Bad password")
            console.log("[AUTH]Login failed");
        }
    }catch (err) {
        console.error(err)
        res.status(400).send("Bad request");
    }
});

//request to create an account
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


        const query = `INSERT INTO user (pseudo, name, fam_name, mail, password, type) \
VALUES  ("${pseudo}", "${req.body.name}", "${req.body.fam_name}", "${req.body.mail}", "${await bcrypt.hash(req.body.password, 10)}", "student");`;
        console.log("[SQL ]Excuting query " + query);
        try {
            await pool.query(query);
            console.log("[AUTH]New user creation was successfull");
            res.status(200).send("ok");
        }catch (err){
            console.log("[AUTH]New user creation failed");
            console.log(err.text);
            res.status(400).send("Error with SQL request");
        }

    }catch (err) {
        console.error(err)
        res.status(400).send("Bad request");
    }
});


//request to log out
app.get("/logout", async (req, res) =>{
    console.log("[AUTH]Logout of user " + req.session.user.pseudo);
    req.session.destroy();
    res.status(200).send("Logged out");
});



//TODO:Add login information to request
app.get("/login", async (req, res)=>{
    if(req.session.logged){
        res.status(200).send("Ok"); 
    }else{
        res.status(200).send("Not logged in");
    }
});


app.get("/user", async (req, res)=>{
    if(req.session.logged){
        res.status(200).json({
            success : true,
            data : req.session.user
        })
    }else{
        res.status(200).json({
            success : false,
            message : "Not logged in"
        });
    }
    
});

app.get("/classes", async (req, res)=>{
    if(req.session.logged){
        res.status(200).json({
            success : true,
            data : [
                {
                    name : "UV01",
                    id : 1,
                    description : "UV numéro 1",
                    color : "#FFFFFF",
                    main_res_id : 1
                },
                {
                    name : "UV02",
                    id : 2,
                    description : "UV numéro 2",
                    color : "#FFFFFF",
                    main_res_id : 2
                },
                {
                    name : "UV03",
                    id : 3,
                    description : "UV numéro 3",
                    color : "#FFFFFF",
                    main_res_id : 3
                },
            ]
        })
    }else{
        res.status(200).json({
            success : false,
            message : "Not logged in"
        });
    }
    
});

app.get("/res/:id", async (req, res)=>{
    if(req.session.logged){
        res.sendFile("./res/3.html");

    }else{
        res.status(200).json({
            success : false,
            message : "Not logged in"
        });
    }
    
});



//Test section, requests to test connection with server

app.get("/ping", async (req, res)=>{
    res.status(200).send("pong");   
});

app.get("/tea", async (req, res)=>{
    res.status(418).send('<img src="https://www.ubuy.sn/productimg/?image=aHR0cHM6Ly9tLm1lZGlhLWFtYXpvbi5jb20vaW1hZ2VzL0kvNTFRaGVrUHY4YkwuX0FDX1NMMTAwMV8uanBn.jpg" alt="teapot"/>')
});

//Function to generate some route related to database queries



console.log("listening on port 8080");
app.listen(8080);
