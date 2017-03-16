const redis = require('redis')
const redisClient = redis.createClient()
const db = new DB()

module.exports = { recalculateDistances }

let key = 'positions:montreal'

function recalculateDistances (id, position) {
  redisClient.geoadd(key, position.lng, position.lat, id)
  db.getPositions(key, (err, positions) => {
    console.log(positions)
  })
}

function DB () {

}

DB.prototype.getPositions = function (set, cb) {
  redisClient.georadius(set, 0, 0, 22000, 'km', 'WITHCOORD', (err, res) => {
    if (err) return cb(err)

    const positions = res.map(tupple => {
      const userId = tupple[0]
      const lngLat = new LngLat(tupple[1][0], tupple[1][1])
      const pos = new Position(userId, lngLat)

      return pos 
    })

    return cb(null, positions)
  })
}

function LngLat (lng, lat) {
  this.lng = lng
  this.lat = lat
}

function Position (id, lngLat) {
  this.id = id
  this.lngLat = lngLat
}

