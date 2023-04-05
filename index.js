const express = require('express');
const app = express();
const mysql = require('mysql')
const cors = require('cors');
app.use(cors());
app.use(express.json());

const port = 3003;

const db = mysql.createConnection({
    host: 'sql8.freesqldatabase.com',
    user: 'sql8603881',
    password: '7rc1lFTeaj',
    database: 'sql8603881'
})

app.listen(port, () => {
    console.log('Listening on port ' + port);
});

//? POST TO USERS
app.post('/registered-user', (req, res) => {
    const name = req.body.name
    const email = req.body.email
    const age = req.body.age
    const password = req.body.password
    const interest = req.body.interest

    db.query("INSERT INTO registered_users (name, email, age, password, interest) VALUES (?,?,?,?,?)",
        [name, email, age, password, interest],
        (error, result) => {
            if (error) {
                console.log(error);
            } else {
                console.log('success')
                res.send(201)
            }
        })
});

//? GET ALL USERS
app.get('/registered-user', (req, res) => {
    db.query("SELECT * FROM registered_users",
        (error, result) => {
            if (error) {
                console.log(error);
            } else {
                console.log('success')
                console.log(result)
                res.send(result).statusCode = 200
            }
        })
});

//? GET USER BY ID FROM PARAMETERS
app.get('/registered-user-id/:id', (req, res) => {
    const id = req.params.id
    console.log(id);
    const query = `SELECT * FROM registered_users WHERE id = ${id}`;
    db.query(query, (error, results) => {
      if (error) throw error;
      res.send(results);
    });
});

//? GET USER BY NAME FROM BODY
app.get('/registered-user-name', (req, res) => {
    const { name } = req.body
    console.log(name);
    const query = `SELECT * FROM registered_users WHERE name = '${name}'`;
    db.query(query, (error, results) => {
      if (error) throw error;
      res.send(results);
    });
});
