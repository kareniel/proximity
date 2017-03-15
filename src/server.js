const fs = require('fs')
const restify = require('restify')

const opts = {
  key: fs.readFileSync('ssl/server.key'), 
  certificate: fs.readFileSync('ssl/server.crt')
}

const server = restify.createServer(opts)

server.use(restify.CORS())
server.use(restify.queryParser())
server.use(restify.bodyParser())

server.post('/position', onPositionChange)

server.listen(1337, function () {
  console.log('Listening on 1337')
})

function onPositionChange (req, res, next) {
  console.log(`${req.body.name} moved to [${req.body.pos.x}, ${req.body.pos.y}]`)

  res.send(200)

  return next()
}

function Vector (x, y) {
  this.x = x
  this.y = y

  this.distance = vector => {
    let a = this.x - vector.x
    let b = this.y - vector.y
    
    return Math.sqrt(a * a + b * b)
  }
}

function User () {
  this.pos = new Vector(0, 0)
  this.radius = 100
}