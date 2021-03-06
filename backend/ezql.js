const { query } = require("express");
const { async } = require("rxjs");
var SqlString = require('sqlstring');

//SELECT * FROM user WHERE mail = "${req.body.username}";`
module.exports = {
    SELECT: async (pool, table, arr, where) => {
        let query = "SELECT ";
        if (arr == undefined || arr.length == 0) {
            query += "*  "
        } else {
            arr.forEach(el => {
                query += el + ", "
            });
        }
        query = query.slice(0, -2) + " ";
        query += "FROM " + table;
        if(where != undefined && where != ""){
            query += " WHERE " + where;
        }
        query += ";"
        console.log("[SQL] Running query : " + query)
        try{
            return await pool.query(query)
        }catch(err){
            console.log("[SQL] Request failed : " + err.text)
            throw "SQL query failed"
        }
    },

    //const query = `INSERT INTO user (pseudo, name, fam_name, mail, password, type) \
    //VALUES  ("${pseudo}", "${req.body.name}", "${req.body.fam_name}", "${req.body.mail}", "${await bcrypt.hash(req.body.password, 10)}", "student");`;
    INSERT: async (pool, table, arr, toAdd) => { 
        var query = "INSERT INTO " + table + " ("

        arr.forEach(el => {
            query += el.c + ", "
        });
        query = query.slice(0, -2) + ") VALUES (";
        arr.forEach(el => {
            query += SqlString.escape(el.v) + ", "
        });
        query = query.slice(0, -2) + ")";

        if(toAdd != undefined){
            query += toAdd;
        }
        query += ";"



        console.log("[SQL] Running query : " + query)
        try{
            return await pool.query(query)
        }catch(err){
            console.log("[SQL] Request failed : " + err.text)
            throw "SQL query failed"
        }
    },

    UPDATE: async(pool, table, arr, where, toAdd) => {
        var query = "UPDATE " + table + " SET ";

        arr.forEach(el => {
            query += el.c + " = " + SqlString.escape(el.v) + ", "
        });
        query = query.slice(0, -2)

        if(where != undefined && where != ""){
            query += " WHERE " + where;
        }

        if(toAdd != undefined){
            query += toAdd;
        }
        query += ";"

        


        console.log("[SQL] Running query : " + query)
        try{
            return await pool.query(query)
        }catch(err){
            console.log("[SQL] Request failed : " + err.text)
            throw "SQL query failed"
        }

    },

    DELETE: async(pool, table, where) => {
        var query = `DELETE FROM ${table} WHERE ${where} ;`;

        console.log("[SQL] Running query : " + query)
        try{
            return await pool.query(query)
        }catch(err){
            console.log("[SQL] Request failed : " + err.text)
            throw "SQL query failed"
        }

    }



}

