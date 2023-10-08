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

// create new post
app.post('/api/post', (req, res) => {
    const sql = "INSERT INTO posts (user, pictureURL, title, text) VALUES (?)";
    const values = [
        req.body.user,
        req.body.pictureURL,
        req.body.title,
        req.body.text
    ];

    pool.getConnection((err, con) => {
        if (err) res.status(500).end();
        con.query(sql, [values], (error, result) => {
            if (error) res.status(500).end();
            res.status(200).end();
        });
    });
});

// read all posts
app.get('/api/posts', (req, res) => {
    const sql = "SELECT * FROM posts";
    pool.getConnection((err, con) => {
        if (err) res.status(500).end();
        con.query(sql, (error, result) => {
            if (error) res.status(500).end();
            res.json(result);
        });
    });
});

// read a post
app.get('/api/post/:id', (req, res) => {
    const sql = "SELECT * FROM posts WHERE id = ?";
    pool.getConnection((err, con) => {
        if (err) res.status(500).end();
        con.query(sql, [req.params.id], (error, result) => {
            if (error) res.status(500).end();
            res.json(result);
        });
    });
});

// update a post
app.patch('/api/post', (req, res) => {
    const sql = ```UPDATE posts SET 
        title = ?,
        text = ?
        WHERE id = ?
    ```;
    const values = [
        req.body.title,
        req.body.text
    ];

    pool.getConnection((err, con) => {
        if (err) res.status(500).end();
        con.query(sql, [values, id], (error, result) => {
            if (error) res.status(500).end();
            res.status(200).end();
        });
    });
});

// delete a post
app.delete('/api/post/:id', (req, res) => {
    const sql = "DELETE FROM posts WHERE id = ?";
    pool.getConnection((err, con) => {
        if (err) res.status(500).end();
        con.query(sql, [req.params.id], (error, result) => {
            if (error) res.status(500).end();
            res.status(200).end();
        });
    });
});

app.listen(port, () => 
    console.log(`Server started at port ${port}`)
);