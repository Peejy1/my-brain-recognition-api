const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors')
const bcrypt = require('bcrypt-nodejs')
const knex = require('knex');

const register = require('./controllers/register');
const signin = require('./controllers/signin');
const image = require('./controllers/image');
const profile = require('./controllers/profile')
const home = require('./controllers/home')

const db = knex({
  client: 'pg',
  connection: {
    host : '127.0.0.1',
    port : 5432,
    user : 'postgres',
    password : 'abasimmi1',
    database : 'smart_brain'
  }
});

app = express();

app.use(bodyParser.json());
app.use(cors());

app.get('/', (req, res) => {home.handleHome(req, res, db)})
app.post('/signin', signin.handleSignin(db, bcrypt))
app.post('/register', (req, res) => {register.handleRegister(req, res, db, bcrypt)});
app.get('/profile/:id', (req, res) => {profile.handleProfileGet(req, res, db)})
app.put('/image', (req, res) => {image.handleImage(req, res, db)});
app.post('/imageUrl', (req, res) => {image.handleApiCall(req, res)});
app.listen(3500, () => {
	console.log('server is running on port 3500');
})