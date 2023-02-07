const mongoose = require('mongoose')

const Schema = mongoose.Schema({
    usuario:{
        type:String,
        require:true,
        unique:true, 
        min:4
    },
    candidato:{
        type:String,
        min:4
    },
    estado:{
        type:Boolean,
        require:true,
    }
},{timestamps:true})

module.exports = mongoose.model('votacion',Schema)