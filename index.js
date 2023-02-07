const express = require('express')
const socket = require('socket.io')


const routes = require('./src/routes/routes')

const { singIng, logIn, setVoto, getVoto, conteo, getAllUser, getUser,deletes,updates } = require('./src/controllers/controllers')


const { mongoose } = require('./src/connection/mongodb')


const app = express()
const port = 3000

app.use(express.static('public'))



app.use(express.urlencoded({ extended: true }))

app.use(express.json())

app.use('/crt', routes)


/**
 * Paginas Web
 */
app.get('/', (req, res) => res.sendFile(__dirname + '/src/views/loing.html'))

app.get('/register', (req, res) => res.sendFile(__dirname + '/src/views/register.html'))



app.get('/indexU', (req, res) => res.sendFile(__dirname + '/src/views/indexU.html'))

app.get('/perfil', (req, res) => res.sendFile(__dirname + '/src/views/perfil.html'))

app.get('/admin', (req, res) => res.sendFile(__dirname + '/src/views/panelVot.html'))

app.get('/adminUser', (req, res) => res.sendFile(__dirname + '/src/views/panelUser.html'))

app.get('/modificar', (req, res) => res.sendFile(__dirname + '/src/views/modificar.html'))


/**
 * Servidor 
 */
const server = app.listen(port, () => console.log(`App escuchando en el puerto ${port}!`))

const io = socket(server, {
    origin: "*",
    credentials: true,
})


global.onlineUsers = new Map()


io.on('connection', sockets => {


    /**
     * Sockets Utilizado en la pagina loings
     */
    sockets.on('loing', async (val) => {

        try {
            const { correo, password } = val

            const results = await logIn(correo, password)

            if (results.status === 200) {

                return sockets.emit('resLoing', results)
            }

            if (results.status === 500) {
                console.log("500");
                return sockets.emit('resLoing', results)

            }
        } catch (error) {
            console.log(error);
        }
    })

    sockets.on('register', async (val) => {

        try {
            const {  nombre, apellido,correo,password} = val

            const usuario = nombre +" "+apellido

            const results = await singIng(usuario,correo,password)

            if (results.status === 200) {
                return sockets.emit('resRegist', results)
            }

            if (results.status === 500) {
                console.log("500");
                return sockets.emit('resRegist', results)

            }
        } catch (error) {
            console.log(error);
        }
    })



    /**
     * Sockets utilizado en la pagina IndexU
     */

    sockets.on('setVoto', async val => {

        try {
            const { usuario, candidato } = val

            const results = await setVoto(usuario, candidato)

            sockets.emit('votoOk', results)



        } catch (error) {
            console.log(error);
        }

    })

    sockets.on('getVotoOk', async usuario => {

        try {
            const results = await getVoto(usuario)
            sockets.emit('getVotoOk2', results.estado)
        } catch (error) {
            console.log(error);
        }


    })

    sockets.on('conectado', async value => {
        try {
            const results = await getAllUser()

            const array = []

            onlineUsers.set(value, sockets.id)

            for (let key of onlineUsers.keys()) {
                array.push(key)
            }

            

            sockets.broadcast.emit('brConectado', {
                user: array,
                results: results.results
            })


        } catch (error) {
            console.log(error);
        }

    })


    sockets.on('desconect', async value => {
        try {
            const results = await getAllUser()

            const array = []


            console.log(onlineUsers.delete(value.usuario))


            for (let key of onlineUsers.keys()) {
                array.push(key)
            }

            sockets.broadcast.emit('brConectado', {
                user: array,
                results: results.results
            })


        } catch (error) {
            console.log(error);
        }

    })

    /**
   * Sockets utilizado en la pagina Usuario
   */
    sockets.on('getUser', async usuario => {

        try {
            const results = await getUser(usuario)
            sockets.emit('getUser2', results)

        } catch (error) {
            console.log(error);
        }

    })


    /**
     * sockets para pagina Adminstrador Votos
     */
    sockets.on('loadAdmins', async value => {

        try {
            const results = await conteo()
            sockets.emit('conteo', results)
            sockets.broadcast.emit('conteo2', results)
        } catch (error) {
            console.log(error);
        }

    })



    /**
     * Sockets Para la pagina Adminsitrador Usuarios
     */

    sockets.on('allUsers', async value => {
        try {
            const results = await getAllUser()
            sockets.emit('getAllUsers', results)
        } catch (error) {

        }
    })



    /***
     * Sockets Para la pagina Modificar Usuarios
     */

    sockets.on('deletes',async value =>{
        try {
            
            const results = await deletes(value)
            console.log(results);
            sockets.emit('deletes2',results)
        } catch (error) {
            console.log(error);
        }
    })

    sockets.on('deletes',async value =>{
        try {
            
            const results = await deletes(value)
            console.log(results);
            sockets.emit('deletes2',results)
        } catch (error) {
            console.log(error);
        }
    })

    sockets.on('updates',async value =>{
        try {
            const {usuario, correo, password} = value
            const results = await updates(usuario, correo, password )
            console.log(results);
            sockets.emit('updates2',results)
        } catch (error) {
            console.log(error);
        }
    })
})

