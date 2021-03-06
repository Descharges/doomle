//Install all of this on npm
const express = require("express");
const mariadb = require("mariadb");
const sessions = require('express-session');
const bcrypt = require("bcrypt");
const cors = require('cors');
const { ColdObservable } = require("rxjs/internal/testing/ColdObservable");
const { exec } = require("child_process");
const fs = require("fs");

const ezql = require("./ezql.js");
const { ObjectUnsubscribedError } = require("rxjs");
const { debug } = require("console");

const DEBUG = true;

console.clear();

function buildFolder(arr, iterations, depth) {
    var split;
    var out = [];

    if (iterations == undefined) {
        iterations = arr.length;
    }

    if (depth == undefined) {
        depth = 0;
    }


    var i = 0;
    var iOut = 0;
    while (i < iterations) {

        out[iOut] = new Object;

        split = arr[i].path.split("/")

        if (split.length > depth + 1) {

            var toGoThrough = 0;
            var folderName = split[depth];

            while (i < arr.length && (arr[i].path.split("/")[depth] == folderName)) {
                i++;
                toGoThrough++;
            }
            i--;


            out[iOut] = {
                type: "folder",
                name: split[depth],
                opened: false,
                content: buildFolder(arr.slice(i - toGoThrough + 1), toGoThrough, depth + 1)
            }

        } else {


            out[iOut] = {
                type: arr[i].type,
                id: arr[i].id,
                name: split[depth]
            }
        }



        i++;
        iOut++
    }

    return (out);


}

BigInt.prototype.toJSON = () => { return this.toString() }



const pool = mariadb.createPool({
    host: 'localhost',
    user: 'api',
    password: 'api',
    database: 'Doomle'
});

function verify(arr) {
    for (var i = 0; i < arr.length; i++) {
        if (arr[i] == undefined || arr[i] == "") {
            return false;
        }
    }
    return true;
}

function makeid() {
    var date = new Date();
    var result = '[' + date.getDay() + "-" + date.getMonth() + "-" + date.getFullYear() + "][" + date.getHours() + ":" + date.getMinutes() + ":" + date.getSeconds() + "]-";
    var characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';;
    for (var i = 0; i < 5; i++) {
        result += characters.charAt(Math.floor(Math.random() *
            characters.length));
    }
    return result;
}

const app = express();
app.use(express.json({limit: '50mb'}));
app.use(express.urlencoded({limit: '50mb'}));

// increase maximum size of transferable files




var corsOptions = {
    origin: '*',
    // some legacy browsers (IE11, various SmartTVs) choke on 204
}

app.use(cors(corsOptions));


const oneDay = 1000 * 60 * 60 * 24;

app.use(sessions({
    secret: "imlikeasupertrooperbeamsaregonnalightme",
    saveUninitialized: true,
    cookie: { maxAge: oneDay },
    resave: false
}));


//=== User

//Authentification section, request to allow authentification


//request to log in


app.post("/login", async (req, res) => {
    try {
        var data = req.body;
        if (verify([data.username, data.password]) == false) {
            throw "Bad request";
        }
        console.log("[AUTH]Login requested");
        //const query = `SELECT * FROM user WHERE mail = "${req.body.username}";`
        //const result = await pool.query(query)

        const result = await ezql.SELECT(pool, "user", [], `mail = "${req.body.username}"`)

        if (result[0] && await bcrypt.compare(req.body.password, result[0].password)) {
            req.session.logged = true;
            req.session.user = result[0];
            req.session.user.id = Number(req.session.user.id)
            delete req.session.user.password;
            res.status(200).send("Login succesfull");
            console.log("[AUTH]Login succesfull of user " + result[0].pseudo);
        } else {
            res.status(200).send("Bad password")
            console.log("[AUTH]Login failed");
        }
    } catch (err) {
        console.error(err)
        res.status(400).send("Bad request");
    }
});

app.post("/newuser", async (req, res) => {
    try {
        console.log("[AUTH]New user creation requested");

        var data = req.body;

        if (verify([data.name, data.fam_name, data.mail, data.password]) == false) {
            throw "Bad request";
        }

        const pseudo = (req.body.name[0] + req.body.fam_name).toLowerCase();


        const query = `INSERT INTO user (pseudo, name, fam_name, mail, password, type) \
VALUES  ("${pseudo}", "${req.body.name}", "${req.body.fam_name}", "${req.body.mail}", "${await bcrypt.hash(req.body.password, 10)}", "student");`;
        console.log("[SQL ]Excuting query " + query);
        try {
            await pool.query(query);
            console.log("[AUTH]New user creation was successfull");
            res.status(200).send("ok");
        } catch (err) {
            console.log("[AUTH]New user creation failed");
            console.log(err.text);
            res.status(400).send("Error with SQL request");
        }

    } catch (err) {
        console.error(err)
        res.status(400).send("Bad request");
    }
});


//request to log out
app.get("/logout", async (req, res) => {
    console.log("[AUTH]Logout of user " + req.session.user.pseudo);
    req.session.destroy();
    res.status(200).send("Logged out");
});



//TODO:Add login information to request
app.get("/login", async (req, res) => {
    if (req.session.logged) {
        res.status(200).send("Ok");
    } else {
        res.status(200).send("Not logged in");
    }
});


app.get("/user", async (req, res) => {
    if (req.session.logged) {
        res.status(200).json({
            success: true,
            data: req.session.user
        })
    } else {
        res.status(200).json({
            success: false,
            message: "Not logged in"
        });
    }

});



app.get("/classes", async (req, res) => {
    if (req.session.logged) {


        var data = await ezql.SELECT(pool, "class LEFT JOIN inscription ON class.id = inscription.classid", [], "userid=" + req.session.user.id);
        res.status(200).json({
            success: true,
            data: data
        })
    } else {
        res.status(200).json({
            success: false,
            message: "Not logged in"
        });
    }

});

app.post("/class", async (req, res) => {
    if ((req.session.logged && req.session.user.type == "teacher")) {
        data = req.body;
        if (verify([data.name, data.description, data.color]) != false) {
            var result = await ezql.INSERT(pool, "class", [
                { c: "name", v: data.name },
                { c: "description", v: data.description },
                { c: "color", v: data.color },
            ], " RETURNING id")
            res.status(200).json({
                success: true,
            })

            ezql.INSERT(pool, "inscription", [
                { c: "userid", v: req.session.user.id },
                { c: "classid", v: result[0].id },
                { c: "isFav", v: 0 },
                { c: "isArchived", v: 0 },
            ])


            console.log(result[0].id)

        } else {
            res.status(200).json({
                success: false,
                message: "Bad request"
            })
        }
    } else {
        res.status(200).json({
            success: false,
            message: "Not logged in or not a teacher"
        })
    }
})

app.patch("/class/:id", async (req, res) => {
    if (req.session.logged || DEBUG) {
        data = req.body;
        if (verify([data.name, data.description, data.color]) == false) {
            res.status(200).json({
                success: false,
                message: "bad request"
            });
        } else {
            ezql.UPDATE(pool, "class", [
                { c: "name", v: data.name },
                { c: "description", v: data.description },
                { c: "color", v: data.color },
            ], "id = " + req.params.id)
            res.status(200).json({
                success: true
            })
        }
    }
})

app.get("/class/:id/users", async (req, res) => {
    if (req.session.logged || DEBUG) {
        var data = await ezql.SELECT(pool, "user INNER JOIN inscription ON user.id = inscription.userid",
            ['id', 'pseudo', 'name', 'fam_name', 'type'], 'classid=' + req.params.id);
        data.forEach(el => {
            el.id = Number(el.id)
        });
        res.status(200).json({
            success: true,
            data: data
        })

    } else {
        res.status(200).json({
            success: false,
            message: "Not logged in"
        })
    }
})

app.post("/class/:idClass/users/:name", async (req, res) => {
    if (req.session.logged || DEBUG) {

        var user = await ezql.SELECT(pool, "user", ['id'], `pseudo='${req.params.name}'`)

        if (user.length == 0) {
            res.status(200).json({
                success: false,
                message: "no user found"
            });
        } else {
            var inscription = await ezql.SELECT(pool, "inscription", [], `userid='${user[0].id}' AND classid=${req.params.idClass}`)
            
            if(inscription.length != 0){
                res.status(200).json({
                    success: false,
                    message: "allready subscribed"
                });
            }else{
                ezql.INSERT(pool, 'inscription',[
                    {c:'userid', v:user[0].id},
                    {c:'classid', v:req.params.idClass},
                    {c:'isFav', v:0},
                    {c:'isArchived', v:0},
                ])
                res.status(200).json({
                    success: true
                })
            }

        }
    } else {
        res.status(200).json({
            success: false,
            message: "Not logged in"
        });
    }

})


app.get("/class/:id", async (req, res) => {
    console.log("[REQ] class requested :" + req.params.id)
    if (req.session.logged || DEBUG) {

        try {
            var data = await ezql.SELECT(pool, "class LEFT JOIN inscription ON class.id = inscription.classid", [], `id = ${Number(req.params.id)} AND userid=${req.session.user.id}`)
            if (data.length == 0) {
                res.status(200).json({
                    success: false,
                    message: "The class doesn't exists"
                })
            } else {


                filesData = await ezql.SELECT(pool, "ressources", ['id', 'path', 'type'], `class = ${Number(req.params.id)} ORDER BY path`)

                data[0].ressources = buildFolder(filesData);

                res.status(200).json({
                    success: true,
                    data: data[0]
                })
            }
        } catch (error) {
            console.log(error)
            res.status(200).json({
                success: false,
                message: "An occured error in the SQL request"
            });
        }


    } else {
        res.status(200).json({
            success: false,
            message: "Not logged in"
        });
    }

});

app.get("/searchres/:search", async (req, res) => {
    console.log("[REQ] File search :" + req.params.search)
    if (req.session.logged || DEBUG) {

        //perform authorization control

        var data = await ezql.SELECT(pool, "ressources AS res INNER JOIN class ON res.class = class.id",
            ["res.id", "res.type", "res.class", "res.path", "class.name as classname", "class.color"], `path LIKE "%${req.params.search}%"`)

        if (data.length == 0) {
            res.status(200).json({
                success: false,
                message: "The file couldn't be found"
            })
        } else {
            res.status(200).json({
                success: true,
                data: data
            })

        }



    } else {
        res.status(200).json({
            success: false,
            message: "Not logged in"
        });
    }

});

app.delete("/class/:idClass/users/:userId", async (req, res)=>{

    if (req.session.logged || DEBUG) {
        await ezql.DELETE(pool,"inscription",`userid=${req.params.userId} AND classid=${req.params.idClass} `)
        res.status(200).json({
            success: true
        })
    }else{
        res.status(200).json({
            success: false,
            message: "Not logged in"
        });
    }
})

app.delete("/res/:id", async (req, res)=>{

    if (req.session.logged || DEBUG) {
        await ezql.DELETE(pool,"ressources",`id=${req.params.id}`)
        res.status(200).json({
            success: true
        })
    }else{
        res.status(200).json({
            success: false,
            message: "Not logged in"
        });
    }
})


app.get("/resmeta/:id", async (req, res) => {
    console.log("[REQ] File requested :" + req.params.id)
    if (req.session.logged || DEBUG) {

        //perform authorization control

        var data = await ezql.SELECT(pool, "ressources", ["id", "type", "class", "path"], `id = ${Number(req.params.id)} `)

        if (data.length == 0) {
            res.status(200).json({
                success: false,
                message: "The file couldn't be found"
            })
        } else {
            res.status(200).json({
                success: true,
                data: {
                    id: data[0].id,
                    type: data[0].type,
                    class: data[0].class,
                    path: data[0].path
                }
            })

        }



    } else {
        res.status(200).json({
            success: false,
            message: "Not logged in"
        });
    }

});

app.get("/res/:resid", async (req, res) => {
    console.log("[REQ] File requested :" + req.params.resid)
    if (req.session.logged || DEBUG) {

        //perform authorization control

        try {
            var data = await ezql.SELECT(pool, "ressources", ["filename"], `id = ${Number(req.params.resid)} `)
        } catch {
            res.status(400).json({
                success: false,
                message: "The SQL Query failed"
            })
        }

        if (data.length == 0) {
            res.status(404).json({
                success: false,
                message: "The file couldn't be found"
            })
        } else {
            res.status(200).sendFile("res/" + data[0].filename, { root: __dirname })
        }



    } else {
        res.status(200).json({
            success: false,
            message: "Not logged in"
        });
    }

});

app.post("/res", async (req, res) => {

    try {

        console.log("[RES]New file upload requested");

        var data = req.body;

        if (verify([data.class, data.path, data.type, data.filedata]) == false) {
            throw "Bad request";
        }

        filename = makeid() + data.type

        ezql.INSERT(pool, "ressources", [
            { c: "class", v: data.class },
            { c: "path", v: data.path },
            { c: "type", v: data.type },
            { c: "filename", v: filename },
        ])

        file = data.filedata;

        fs.writeFile("./res/" + filename, file, 'base64', (err) => {
            console.log("[RES]upload file result (null means success) :" + err);

        })


        res.status(200).json({
            success: true
        })



    } catch (err) {
        console.error(err)
        res.status(400).send("Bad request");
    }
});



//Test section, requests to test connection with server

app.get("/ping", async (req, res) => {
    res.status(200).send("pong");
});

app.get("/tea", async (req, res) => {
    res.status(418).send('<img src="https://www.ubuy.sn/productimg/?image=aHR0cHM6Ly9tLm1lZGlhLWFtYXpvbi5jb20vaW1hZ2VzL0kvNTFRaGVrUHY4YkwuX0FDX1NMMTAwMV8uanBn.jpg" alt="teapot"/>')
});

//Function to generate some route related to database queries

console.log("listening on port 8080");
app.listen(8080);
