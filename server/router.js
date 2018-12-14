const express = require('express');
const mongoose = require('mongoose');

const router = express.Router();

router.get('/', (req, res) => {
	res.send("Welcome to TODOLIST API. Oles Odynets @2018");
});

router.get('/todos', (req, res) => {
	res.send({ type: "GET" });
});

router.post('/todos', (req, res) => {
	res.send({ type: "POST" });
});

router.put('/todos/:id', (req, res) => {
	res.send({ type: "PUT" });
});

router.delete('/todos/:id', (req, res) => {
	res.send({ type: "DELETE" });
});

module.exports = router;