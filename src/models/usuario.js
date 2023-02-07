const mongoose = require('mongoose')

const Schema = mongoose.Schema({
    usuario:{
        type:String,
        require:true,
        unique:true, 
        min:4
    },
    correo:{
        type:String,
        require:true,
        unique:true, 
        min:4
    },
    admin:{
        type:Boolean,
        require:true,
    },
    password:{
        type:String,
        required:true,
        min:4,
    },
},{timestamps:true})

module.exports = mongoose.model('usuario',Schema)