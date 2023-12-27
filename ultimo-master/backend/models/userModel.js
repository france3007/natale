const mongoose= require("mongoose")

const userSchema= new mongoose.Schema({
    nome:{
        type:String,
        required:true,
    },
    cognome:{
        type:String,
        required:true,
    },
    email:{
        type:String,
        required: true,
        unique: true,
        max: 50,},

    password:{
        type:String,
        required: true,
        unique: true,
        min: 8,
    },
    favoriteProducts: [{ 
        type: mongoose.Schema.Types.ObjectId, ref: 'Product' 
    }],
    prodottiNelCarrello:[{
        productId:{
            type: mongoose.Schema.Types.ObjectId,
            ref:'Product'
        },
        quantity:{
            type: Number
        }
    }],
    asteUtente:[{
        astaId:{
            type:mongoose.Schema.Types.ObjectId,
            ref:"Asta"
        }
    }]
})
const User = mongoose.model('User', userSchema);

module.exports = User;