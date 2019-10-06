var path = require('path')

module.exports = function(app) {
  // Route to the HTML Page
  app.get('/survey', function(req, res) {
    res.sendFile(path.join(__dirname, './../public/survey.html'))
  })

  app.get('/', function(req, res) {
    res.sendFile(path.join(__dirname, './../public/home.html'))
  })

  // app.use(function(req, res) {
  //   res.sendFile(path.join(__dirname, './../public/home.html'))
  // })
}
