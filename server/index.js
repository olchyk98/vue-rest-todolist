const app = require('express')();
const router = require('./router');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

// Connect to a database.
mongoose.connect("mongodb://oles:0password@ds129904.mlab.com:29904/vuerest-learning-todo", {
	useNewUrlParser: true
});
mongoose.connection.once('open', () => console.log("The API server was successfully connected to the database!"));

// Load deps.
app.use(bodyParser.json());
app.use(router);

// Start.
app.listen(4000, () => console.log("Server is listening on port 4000!"));