const express = require('express');
const cors = require('cors');
const mysql = require('mysql');
const port = 3001;
const bodyParser = require('body-parser');

const app = express();

app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

const pool  = mysql.createPool({
    connectionLimit : 10,
    host: "127.0.0.1",
    user: "root",
    password: "",
    database: "news"
});

app.get('/api/readPosts', (req, res) => {
    const sql = "SELECT * FROM posts";
    pool.getConnection((err, con) => {
        con.query(sql, (err, res) => {
            if (err) throw err;
            console.log(res);
            return res;
        });
    });
});

app.post('/api/createPost', (req, res) => {
    const sql = "INSERT INTO posts (user, pictureURL, title, text) VALUES (?)";
    const values = [
        req.body.user,
        req.body.pictureURL,
        req.body.title,
        req.body.text
    ];

    pool.getConnection((err, con) => {
        con.query(sql, [values], (err, res) => {
            if (err) throw err;
            return res;
        });
    });
});

app.listen(port, () => 
    console.log(`Server started at port ${port}`)
);