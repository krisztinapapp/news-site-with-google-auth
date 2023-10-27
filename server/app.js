const express = require('express');
const cors = require('cors');
const mysql = require('mysql');
const port = 3001;
const bodyParser = require('body-parser');

const app = express();

app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

const con  = mysql.createConnection({
    connectionLimit : 10,
    host: "127.0.0.1",
    user: "root",
    password: "",
    database: "news",
    port: '3306'
});

con.query(`CREATE TABLE IF NOT EXISTS posts (
    id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    user VARCHAR(30) NOT NULL,
    pictureURL VARCHAR(300),
    title VARCHAR(80) NOT NULL,
    text VARCHAR(600) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
  )`, (err, res) => {
    if (err) console.log(err);
    else return res;
});

/*
app.use('/user/:id', (req, res, next) => {
    console.log('Request Type:', req.method)
    next()
});*/

// create new post
app.post('/api/post', (req, res) => {
    const sql = "INSERT INTO posts (user, pictureURL, title, text) VALUES (?)";
    const values = [
        req.body.user,
        req.body.pictureURL,
        req.body.title,
        req.body.text
    ];

    con.query(sql, [values], (error, result) => {
        if (error) res.status(500).send();
        else res.json(result);
    });
});

// read all posts
app.get('/api/posts', (req, res, next) => {
    const sql = "SELECT * FROM posts ORDER BY id DESC";
    con.query(sql, (error, result) => {
        if (error) res.status(500).send();
        else res.json(result);
    });
});

// read a post
app.get('/api/post/:id', (req, res) => {
    const sql = "SELECT * FROM posts WHERE id = ?";

    con.query(sql, [req.params.id], (error, result) => {
        if (error) res.status(500).send();
        else if (result.length) res.json(result[0]);
        else res.status(404).send();
    });
});

// update a post
app.patch('/api/post/:id', (req, res) => {
    const sql = "UPDATE posts SET title = ?, text = ? WHERE id = ?";
    const data = [
        req.body.title,
        req.body.text,
        req.params.id
    ];

    con.query(sql, data, (error, result) => {
        if (error) res.status(500).send();
        else if (result.affectedRows) res.json(result);
        else res.status(404).send();
    });
});

// delete a post
app.delete('/api/post/:id', (req, res) => {
    const sql = "DELETE FROM posts WHERE id = ?";

    con.query(sql, [req.params.id], (error, result) => {
        if (error) next(error);
        else if (result.affectedRows) res.json(result);
        else res.status(404).send();
    });
});

app.listen(port, () => 
    console.log(`Server started at port ${port}`)
);