const handleHome = (req, res, db) => {
	db.select('*').from('users')
	  .then(user => {
		return res.json(user)
	  })
}

module. exports = {
	handleHome
}