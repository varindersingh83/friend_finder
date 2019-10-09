module.exports = function(app) {
  var mysql = require('mysql')
  var connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'password',
    database: 'friends_db'
  })

  friends_total = `
  SELECT nam AS name, url AS photo, total_score AS scores
  FROM Friends
  INNER JOIN (SELECT
      friend_id,
      SUM(answer) total_score
  FROM
      scores
  GROUP BY
      friend_id) Total
  ON Friends.id=Total.friend_id;
  `
  connection.connect()
  var tableResult
  // Displays all reservation
  app.get('/api/friends', function(req, res) {
    connection.query(friends_total, function(error, results, fields) {
      if (error) {
        res.send(error)
      } else {
        res.json(results)
      }
    })
  })
  // connection.end()

  // connection.connect()
  // Post to the tables
  app.post('/api/friends', function(req, res) {
    let arrSum = array => {
      return array.reduce((x, y) => parseInt(x) + parseInt(y), 0)
    }

    let findFriend = () => {
      var userSum = arrSum(req.body.scores)
      console.log('userSum = ' + userSum)

      connection.query(friends_total, function(error, results, fields) {
        if (error) res.send(error)
        // var friend = results

        var friend = results[0]
        var current
        // console.log('length = ' + results.length)
        for (let i = 0; i < results.length; i++) {
          current = results[i]
          var friendDiff = Math.abs(userSum - friend.scores)
          var currentDiff = Math.abs(userSum - current.scores)
          // console.log(`friend is: ${friend.name} and diff is: ${friendDiff}`)
          // console.log(`current is: ${current.name} and diff is: ${currentDiff}`)
          if (friendDiff > currentDiff) {
            friend = current
            // console.log('new friend ' + friend.name + '\n')
          } else {
            // console.log('same friend\n')
          }
        }
        // connection.end()
        console.log('friend name = ' + friend.name)
        return friend
      })
    }

    res.json(findFriend())
    // friendsData.push(req.body)
    // console.log('JSON Sent and user pushed to array')
  })
}
