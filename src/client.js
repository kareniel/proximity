const yo = require('yo-yo')
const http = require('xhr')
const uuid = require('node-uuid')
const random = require('random-name')

const baseUrl = 'https://localhost:1337'
const user = new User()

function User () {
  this.id = uuid()
  this.name = random.first()
  this.pos = {x: 32, y: 32}
  this.reach = 100

  this.move = () => {
    const val = coinFlip() ? 1 : -1
    const horizontal = coinFlip()

    if (horizontal) {
      this.pos.x += val
    } else {
      this.pos.y += val
    }

    http.post({
      url: `${baseUrl}/position`,
      json: true,
      body: this
    }, (err, res) => {
      if (err) {
        return console.error(err)
      }
    })
  }

  this.move()

  setInterval(this.move, 3000)
}

function coinFlip() {
  return Math.floor(Math.random() * 2)
}

const el = yo`
  <div>
    <h1>proximity</h1>
  </div>
`

document.body.appendChild(el)
