const app = require('express')();
const api = require('./api');
const bodyParser = require('body-parser');
const cors = require('cors');
const mongoose = require('mongoose');

// Connect to a database.
mongoose.connect("mongodb://<login>:<password>@ds129904.mlab.com:00000/database", {
	useNewUrlParser: true
});
mongoose.connection.once('open', () => console.log("The API server was successfully connected to the database!"));

// Load middlewares.
app.use(cors());
app.use(bodyParser.json());
app.use(api);

// Start.
app.listen(4000, () => console.log("Server is running on port 4000!"));