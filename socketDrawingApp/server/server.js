const PORT = 3000

const express = require('express')
const app = express()

app.use(express.static('views'))

const server = app.listen(PORT, ()=>{
      console.log(`Socket server is running on http://localhost:${PORT}`)
})

const socket = require('socket.io')
const io = socket(server)

io.sockets.on('connection', (socket) => {
      socket.on('mouse', (data) => {
            socket.broadcast.emit('mouse', data)
      })
      socket.on('clear', () => {
            socket.broadcast.emit('clear')
      })
})