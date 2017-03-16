const fs = require('fs')
const restify = require('restify')
const proximity = require('./proximity')

const server = restify.createServer({
  key: fs.readFileSync('ssl/server.key'), 
  certificate: fs.readFileSync('ssl/server.crt')
})

server.use(restify.CORS())
server.use(restify.queryParser())
server.use(restify.bodyParser())
server.post('/position', (req, res, next) => {
  proximity.recalculateDistances(req.body.id, req.body.position)
  res.send(200)
  return next()
})

server.listen(1337, function () {
  console.log('Listening on 1337')
})


