const express = require('express')

const {Server:HttpServer} = require('http')
const {Server:IOServer} = require('socket.io')

const app = express()
const httpServer = new HttpServer(app)
const io = new IOServer(httpServer)




app.use(express.static('public'))

app.get('/', (req,res)=>{
    res.sendFile('index.html', {root:__dirname})
})

const mensajes = []



io.on('connection', socket =>{
    console.log('Usuario conectado');

    socket.on('mensaje',data =>{
        mensajes.push({socketId: socket.id, mensaje: data})
        io.sockets.emit('mensajes',mensajes)
   })
})


const port = 8083

const server =  httpServer.listen(port,()=>{
    console.log(`Servidor escuchado en http://localhost:${port}`)
})
server.on('error',err =>{
    console.log('Error en sercvidor',err)
})

