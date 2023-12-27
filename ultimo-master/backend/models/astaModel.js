const mongoose = require("mongoose");

const astaSchema = mongoose.Schema({
  nomeProdotto: {
    type: String,
    required: true,
  },
  image:{
    type:String,
    required:true
  },
  descrizioneProdotto: {
    type: String,
    required: true,
  },
  prezzoPartenza: {
    type: String,
    required: true,
  },
  prezzoCorrente: {
    type: String,
    required:true
  },
  dataInizio: {
    type: String,
    required: true,
  },
  oraDiInizio:{
    type:String,
    required:true
  },
  dataFine: {
    type: String,
    required: true,
  },
  oraDiFine:{
    type:String,
    required:true
  },
  offerte: [
    {
      offerente: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
      },
      importoOfferta: {
        type: String,
        required: true,
      },
    },
  ],
});

const Asta = mongoose.model("Asta", astaSchema);

module.exports=Asta;