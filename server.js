const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

app = express();


app.use(bodyParser.json());
app.use(cors());

const database = {
	users: [
		{
			id: '123',
			name: 'james',
			email: 'james@gmail.com',
			password: "cookies",
			entries: 0,
			joined: new Date()
		},
		{
			id: '124',
			name: 'mike',
			email: 'mike@gmail.com',
			password: "babies",
			entries: 0,
			joined: new Date()
		}
	]
}

app.get('/', (req, res) => {
	res.json(database.users)
})

app.post('/signin', (req, res) => {
	if (req.body.email === database.users[0].email && req.body.password === database.users[0].password) {
		res.json(database.users[0])
	} else {
		res.status(400).json('user not found')
	}
})

app.post('/register', (req, res) => {
	const { name, email, password } = req.body
	database.users.push({
		id: '125',
		name: name,
		email: email,
		entries: 0,
		joined: new Date()
	})
	res.json(database.users[database.users.length-1])
});

app.get('/profile/:id', (req, res) => {
	const { id } = req.params
	let found = false;
	database.users.forEach((user) => {
		if (user.id === id ) {
			found = true
			res.json(user)
		}
	})
	if (!found) {
		res.json('cannot get the user')
	}
})

app.put('/image', (req, res) => {
	const { id } = req.body;
	let found = false;
	database.users.forEach(user => {
		if (user.id === id ) {
			found = true
			user.entries++
			return res.json(user.entries)
		}
	})
	if (!found) {
		res.status(400).json('not found')
	}

})



app.listen(3500, () => {
	console.log('server is running on port 3500');
})

// Routes that are needed
// 1 === /signin route === post method
// 2 === /register route === post method
// 3 === /profile:id route === get method
// 4 === /image route === put method