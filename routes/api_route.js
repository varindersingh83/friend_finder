module.exports = function(app) {
  var mysql = require('mysql')
  var connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'password',
    database: 'friends_db'
  })

  connection.connect()
  // Displays all reservation
  app.get('/api/friends', function(req, res) {
    connection.query('SELECT nam FROM friends', function(
      error,
      results,
      fields
    ) {
      if (error) res.send(error)
      else res.json(results)
    })
  })

  // Post to the tables
  app.post('/api/friends', function(req, res) {
    console.log('working on post')
  })
}
