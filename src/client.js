const yo = require('yo-yo')
const http = require('xhr')
const uuid = require('node-uuid')

const baseUrl = 'https://localhost:1337'
const user = new User()

function User () {
  this.id = uuid()
  this.reach = 100
  this.position = null

  this.updatePosition = () => {
    navigator.geolocation.getCurrentPosition(position => {
      const {latitude, longitude} = position.coords
      this.position = {lat: latitude, lng: longitude}

      console.log(position)

      const opts = {
        url: `${baseUrl}/position`,
        json: true,
        body: this
      }

      http.post(opts, (err, res) => {
        if (err) { return console.error(err) }
      })
    })
  }

  this.updatePosition()

  setInterval(this.updatePosition, 60 * 1000)
}

function coinFlip() {
  return Math.floor(Math.random() * 2)
}

const el = yo`
  <div>
    <h1>proximity</h1>

    <hr>

    <button>spawn user</button>


    <table>
      <thead>
        <tr>
          <th>username</th>
          <th>status</th>
          <th>lat</th>
          <th>lng</th>
          <th>reach</th>
          <th>channels</th>
          <th>remove</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>Jonathan</td>
          <td>moving</td>
          <td>-73.5784</td>
          <td>45.5380</td>
          <td>100m</td>
          <td>[A, B, C]</td>
          <td><button>x</button></td>           
        </tr>
      </tbody>
    </table>


    
  </div>
`

document.body.appendChild(el)
