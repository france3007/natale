const User = require('../models/userModel')
const brcypt=require("bcrypt") 


module.exports.register=async (req,res,next)=>{

    try{
    const {nome,cognome,email,password}=req.body;  // Estrae username, email, e password dalla richiesta HTTP
    const emailCheck= await User.findOne({email}); //Controlla se esiste già un utente con la stessa email nel database.
    if(emailCheck)
    return res.json({msg:"email già utilizzata", status: false});
    const hashedPassword= await brcypt.hash(password, 10); // Utilizza la libreria bcrypt per generare un hash della password.
    const user= await User.create({
    nome,
    cognome,
    email, 
    password: hashedPassword, // La password memorizzata nel database è l'hash appena generato.
    })
    delete user.password;  // Elimina la password dalla risposta JSON che sarà inviata al client. È una pratica comune non restituire la password dell'utente nelle risposte API per motivi di sicurezza.
    return res.json({status: true, user});

    } catch(ex){
    next(ex);
    }
};

module.exports.login=async (req,res,next)=>{

    try{
    const {email,password}=req.body;
    console.log('accesso effettuato');
    const user=await User.findOne({email});
    if(!user)
    return res.json({msg:"email o password non corretti", status: false});
    const isPasswordValid= await brcypt.compare(password, user.password)
    if(!isPasswordValid)
    return res.json({msg:"username o password non corretti", status: false});
    delete user.password;
    return res.json({status: true, user});

    } catch(ex){
    next(ex);
    }
}; 