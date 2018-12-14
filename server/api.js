const express = require('express');
const { Task } = require('./models');

const router = express.Router();

function pack(type = "GET", request, res, apiresponse) {
	res.send({
		type: type.toUpperCase(),
		requestTime: (new Date).toLocaleString(),
		request,
		data: apiresponse
	});
}

router.get('/', (req, res) => {
	res.send("Welcome to TODOLIST API. Oles Odynets @2018");
});

router.get('/todos', async (req, res) => {
	let a = await Task.find({}).sort({ time: -1 });

	pack(
		'GET', 
		'/todos',
		res,
		a
	);
});

router.post('/todos', async (req, res) => {
	let { content } = req.body;

	if(!content) {
		return pack(
			'GET', 
			'/todos',
			res,
			"#0001 - Please, provide content"
		);
	}

	let a = await (
		new Task({
			content,
			time: new Date,
			isDone: false
		})
	).save();

	pack(
		'GET', 
		'/todos',
		res,
		a
	);
});

router.put('/todos/:id', async (req, res) => {
	let { content, isDone } = req.body;

	let a = {}
	if(typeof content !== "undefined") a.content = content;
	if(typeof isDone !== "undefined") a.isDone = isDone;

	let b = await Task.findByIdAndUpdate(req.params.id, a, (_, a) => a);

	pack(
		'GET', 
		'/todos',
		res,
		b
	);
});

router.delete('/todos/:id', async (req, res) => {
	let a = await Task.findByIdAndDelete({
		_id: req.params.id
	});

	pack(
		'GET', 
		'/todos',
		res,
		a
	);
});

module.exports = router;