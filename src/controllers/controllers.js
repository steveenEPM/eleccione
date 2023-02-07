const Usuario = require('../models/usuario')
const Votacion = require('../models/votacion')

/**
 *  
 * Registrar un nuevo usuario
 * @param {*} usuario Nomre del usuario Nombre y Apellido 
 * @param {*} correo  Correo electronico
 * @param {*} admin  El usuario es de tipo administrador
 * @param {*} password Contraseña
 * @returns 
 */
const singIng = async (usuario, correo, password) => {
    try {
        const boolUser = await Usuario.findOne({ usuario })

        const boolCorr = await Usuario.findOne({ correo })

        const candidato = ""

        const estado = false

        const admin = false

        if (boolUser || boolCorr)
            return { status: 500, msg: "Este usuario  ya existe" }

        const results = await Usuario.create({ usuario, password, admin, correo })

        const elemento = await Votacion.create({ usuario, candidato, estado })


        return { status: 200, results: results }

    } catch (error) {
        console.log(error);
        return { status: 500, msg: "Error de autenticacion" }

    }
}



/**
 *  Iniciar seccion en la pagina
 * @param {*} correo Correo del usuairo
 * @param {*} password  Contraseña del usuario
 * @returns 
 */
const logIn = async (correo, password) => {

    try {
        const results = await Usuario.findOne({ correo })

        if (!results) return { status: 500, msg: "Usuario no existe" }
        if (results.password !== password) return { status: 500, msg: "Correo y/o contraseña incorrectos" }

        return { status: 200, usuario: results.usuario }
    } catch (error) {
        console.log(error);
        return { status: 500, msg: "Error de autenticacion" }
    }
}





/**
 * 
 */

const getUser = async (usuario) => {

    try {
        const results = await Usuario.findOne({ usuario })


        return { status: 200, results: results }
    } catch (error) {
        console.log(error);
        return { status: 500, msg: "Error de autenticacion" }
    }
}

/**
 *  Votacion del usuario
 * @param {*} usuario Nombre del usuario
 * @param {*} candidato  Nomre del candidatos
 */
const setVoto = async (usuario, candidato) => {
    let estado = true
    var status
    Votacion.updateOne({ usuario }, { candidato, estado }).then(e => {
        status = 200
    }).catch(error => {
        console.log(error);
        status = 500
    })
    return status
}


/**
 *  Obtener si el usuario voto
 * @param {*} usuario nombre del usuario 
 * @returns 
 */
const getVoto = async (usuario) => {
    try {
        const results = await Votacion.findOne({ usuario })
        return { status: 200, estado: results.estado }
    } catch (error) {
        console.log(error);
        return { status: 500 }
    }

}



/**
 * Obtener todos los usuario
 */
const getAllUser = async () => {
    try {
        const results = await Votacion.find()


        return { status: 200, results: results }
    } catch (error) {
        console.log(error);
        return { status: 500, msg: "Error de autenticacion" }
    }
}

const deletes = async (usuario) => {

    try {
        const results = await Usuario.findOne({ usuario })

        if(!results) return { status: 500, msg: "usuario no existe" }

        const remove1 = await Usuario.remove({usuario})

        const remove2 = await Votacion.remove({usuario})

       console.log(remove1);

        return { status: 200, msg:'ok' }
    } catch (error) {
        console.log(error);
        return { status: 500, msg: "Error de autenticacion" }
    }
}



const updates = async (usuario, correo, password ) => {
    const results = await Usuario.findOne({ usuario })

    const results2 = await Usuario.findOne({ correo })

    let status
    let msg

    if(!results) return { status: 500, msg: "usuario no existe" }

    if(results2) return { status: 500, msg: "este correo ya esta en uso" }


    const result = await Usuario.updateOne({ usuario }, { correo, password }).then(e => {
        status = 200
        msg ="cambio exitoso"
    }).catch(error => {
        console.log(error);
        status = 500
    })

    console.log(result);

    return {status:status,msg:msg}
}




/**
 * 
 * Conteo de votos 
 */

const conteo = async () => {
    try {

        let candidato1 = "elon musk"

        let candidato2 = "jeff bezos"

        let candidato3 = "mark zuckerberg"

        const cant1 = await Votacion.find({ candidato: candidato1 })

        const cant2 = await Votacion.find({ candidato: candidato2 })

        const cant3 = await Votacion.find({ candidato: candidato3 })


        return { status: 200, cant1: cant1.length, cant2: cant2.length, cant3: cant3.length }
    } catch (error) {
        console.log(error);
        return { status: 500, msg: "Error de autenticacion" }
    }
}




module.exports = { 
    singIng, logIn, setVoto, getVoto, 
    getAllUser, getUser, conteo ,
    deletes,updates
}

