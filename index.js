const express = require("express");
// import express from 'express'
const db = require("./data/db");

const server = express();
server.use(express.json());

server.get("/", (req, res) => {
  res.send("Hello World");
});

server.post("/api/users", (req, res) => {
  const { name, bio } = req.body;
  db.insert({ name, bio })
    .then(response => {
      res.send(response);
    })
    .catch(error => {
      res.json(error);
    });
});

//getting al users
server.get("/api/users", (req, res) => {
  db.find()
    .then(users => {
      res.json({ users });
    })
    .catch(error => {
      res.json({ error });
    });
});

// get specific user based on ID
server.get("/api/users/:id", (req, res) => {
  db.findById(req.params.id)
    .then(user => {
      if (user.length === 0) {
        return res
          .status(404)
          .json({ message: "the user with the specified ID does note exist" });
      }
      res.status(200).json(user);
    })
    .catch(err => {
      res
        .status(500)
        .json({ error: "the user information could not be retreived" });
    });
});

// skeleton for delete user based on id
server.delete("api/users/:id", (req, res) => {});

server.listen(8000, () => console.log("API Running on port 8000"));
