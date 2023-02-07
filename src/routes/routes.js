const Router = require('express').Router()

const { singIng, logIn , setVoto, getVoto,conteo,getAllUser,deletes, updates} = require('../controllers/controllers')

Router.post('/singIng', async (req, res) => {
    const { usuario, correo, admin, password } = req.body

    const results = await singIng(usuario, correo, false, "123456")

    if (results.status === 500) return res.status(500).json(results.msg)

    return res.status(200).json(results)

})

Router.post('/updates', async (req, res) => {
    const { usuario, correo,  password } = req.body

    const results = await updates(usuario, correo,  password)
    console.log(results);
    if (results.status === 500) return res.status(500).json(results.msg)

    return res.status(200).json(results)

})

Router.post('/singIng', async (req, res) => {
    const { usuario, correo, admin, password } = req.body

    const results = await singIng(usuario, correo, false, "123456")

    if (results.status === 500) return res.status(500).json(results.msg)

    return res.status(200).json(results)

})



Router.post('/logIn', async(req, res) => {
    const { correo, password } = req.body

    const results = await logIn(correo,password)
    if (results.status === 500) return res.status(500).json(results.msg)

    return res.status(200).json(results)
})


Router.post('/setVoto', async(req, res) => {
    const { usuario,candidato } = req.body

    const results = await setVoto(usuario,candidato)
    if (results === 500) return res.status(500).json("")

    return res.status(200).json(results)
})



Router.post('/getVoto', async(req, res) => {
    const { usuario } = req.body

    const results = await getVoto(usuario)
    if (results.status === 500) return res.status(500).json("")

    return res.status(200).json(results)
})

Router.post('/getAllUserr', async(req, res) => {

    const results = await getAllUser()
    if (results.status === 500) return res.status(500).json("")

    return res.status(200).json(results)
})


Router.post('/conteo', async(req, res) => {

    const results = await conteo()
    if (results.status === 500) return res.status(500).json(results)

    return res.status(200).json(results)
})



Router.post('/deletes', async(req, res) => {
    
    const { usuario } = req.body

    const results = await deletes(usuario)
    if (results.status === 500) return res.status(500).json(results)

    return res.status(200).json(results)
})



module.exports = Router