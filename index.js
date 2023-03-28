const http = require('http');
const express = require('express');
const app = express();
const bodyParser = require('body-parser');

const port = 8000;

app.use(bodyParser.json());
app.use(
	bodyParser.urlencoded({
		extended: true
	})
);

// Import the mongoose module
const mongoose = require('mongoose');

mongoose.set('strictQuery', false);

// Define the database URL to connect to.
const mongoDB = 'mongodb+srv://admin:admin123@cluster0.2xjirdj.mongodb.net/?retryWrites=true&w=majority';

// Wait for database to connect, logging an error if there is a problem
main().catch((err) => console.log(err));
async function main() {
	await mongoose.connect(mongoDB);
}

// Define schema
const Schema = mongoose.Schema;

const PersonSchema = new Schema({
	firstName: String,
	lastName: String,
	gender: String,
	dob: Date
});

// Compile model from schema
const PersonModel = mongoose.model('Person', PersonSchema);

// respond with "hello world" when a GET request is made to the homepage
app.get('/getData', (req, res) => {
	PersonModel.find().then((data) => {
		return res.send(data);
	});
});

app.post('/saveData', (req, res) => {
	console.log('save data request body ==> ', req.body);
	const body = req.body;
	PersonModel.create(body).then((created) => {
		return res.send(created);
	});
});

app.listen(port, () => {
	console.log(`API app listening on port ${port}`);
});
