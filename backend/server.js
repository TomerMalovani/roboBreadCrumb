const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const app = express();
const mysql = require('mysql');
const moment = require('moment')

// test

app.use(bodyParser.json());
app.use(cors());

const con = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "root",
    database: "breadcrumbs"
});

app.post('/addtransfer', (req, res) => {
    con.query(`select money from users where firstName='${req.body.user}'`, function (err, result) {
        if (err) throw err;
        if (req.body.amount == "" || req.body.description == "") {
            res.json("some of the input are empty");
        }
        else if (result[0].money < req.body.amount && req.body.type === "Expense") {
            res.json("not enough money in the account");
        }
        else if (req.body.type === "income") {
            con.query(`UPDATE users SET money = '${result[0].money + req.body.amount}' WHERE firstName ='jamal';`, function (err, result) {
                res.json("money was added to account");
            });
        }
        else if (req.body.type === "Expense") {
            con.query(`UPDATE users SET money = '${result[0].money - req.body.amount}' WHERE firstName ='jamal';`, function (err, result) {
                res.json("money was taken from account");
            });
        }
        else {
            con.query(`INSERT INTO transfers (user,category,description,amount,type,date) VALUES('${req.body.user}','${req.body.category}','${req.body.description}',${req.body.amount},'${req.body.type}','${moment().format('YYYY-MM-DD')}')`, function (err, result) {
                if (err) throw err;
                res.json("worked");
            });
        }
    });

})

app.get('/getuserstatus', (req, res) => {
    con.query("select * from users where firstName='jamal'", function (err, result) {
        if (err) throw err;
        res.json(result[0]);
    });
});



app.listen("5500", () => {
    console.log('app is running on port 5500')
});