const { Server, Socket } = require('socket.io')
const port = process.env.PORT || 7000
const io = new Server(port, {
    cors : {
        origin : "*"
    }
})

const users = {}
io.on('connection', (socket)=>{
    socket.on('new-user-joined', (user)=>{
        users[socket.id] = user
        socket.broadcast.emit('user-joined', user)
    })
    socket.on('send',(message)=>{
        socket.broadcast.emit('receive',{ message, user : users[socket.id]})
    })
    socket.on('disconnect', message=>{
        socket.broadcast.emit('left', users[socket.id])
    })
})