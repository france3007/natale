import React from "react";
import '../components/register.css';
import {useState,useEffect} from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {ToastContainer,toast} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import axios from "axios";
import { registerRoute } from '../utils/APIRoutes';
import Facebook from "../components/facebook";

export default function Register() {
    //IMPORTO LA LOGICA CHE MI PORTA A DEFINIRE LA REGISTRAZIONE TRAMITE FACEBOOK
    const handleFacebookLogin = (facebookData) => {
        console.log(facebookData);

        
    };
    
    //prendiamo i valori dal form
    const navigate= useNavigate()
    const [values,setValues]=useState({
        nome:"",
        cognome:"",
        email:"",
        password:"",
        confirmPassword:"",
    });
    const toastOptions={
        position: 'bottom-left',
        autoClose:3000,
        pauseOnHover: true,
        draggable:true,
        theme:"colored"

    };
    // funzione per effettuare la registrazione dell'utente
    const handleSubmit= async(e)=>{
        e.preventDefault();
        if(handleValidation()){
           
            const {nome,cognome,password,email}=values;
            const{data}=await axios.post(registerRoute, {
                nome,
                cognome,
                email, 
                password,
                
            });
            if (data.status===false){
            toast.error(data.msg, toastOptions);
        } if (data.status===true){
            localStorage.setItem('chat-app-user', JSON.stringify(data.user));
            navigate("/");
        }
        }
    };
    //inviamo un messaggio di errore per ogni complazione del form non corretta
    const handleValidation =()=>{
        const {password,confirmPassword,email}=values;
        if (password !== confirmPassword) {
            console.log('corretto', toast);
            toast.error(("Password e conferma password devono coincidere", toastOptions),
            {
                position: 'bottom-left',
                autoClose:3000,
                pauseOnHover: true,
                draggable:true,
                theme:"colored"
            });
            return false;
        }else if (email.length<4){
            toast.error("Email troppo corta", {
                position: 'bottom-left',
                autoClose:3000,
                pauseOnHover: true,
                draggable:true,
                theme:"colored"
            });
            return false;
        }else if (password.length<8){
            toast.error("La password deve essere di almeno 8 caratteri",toastOptions, {
                position: 'bottom-left',
                autoClose:3000,
                pauseOnHover: true,
                draggable:true,
                theme:"colored"
            });
            return false;
        }else if(email===""){
            toast.error("email richiesta",toastOptions)
        }
        return true;
    }
    //aggiorniamo i valori
    const handleChange= (e)=>{
        setValues({...values, [e.target.name]:e.target.value})
    }
    return(
        <>
            <div className='register'>
                
                <form onSubmit={(event)=>handleSubmit(event)}>
                    <Link to="/" style={{ textDecoration: 'none', color: '#2ecc71',  }}>
                        <h1 className='title'>OrtoShop</h1>
                    </Link>

                    <button className="google" >Continua con Google</button>
                    <button className="facebook" >Continua con Facebook</button>
                    
                    <p>or</p>
                    
                    <input type="text" placeholder='Nome' name='nome' onChange={(e)=>handleChange(e)}></input>
                    <input type="text" placeholder='Cognome' name='cognome' onChange={(e)=>handleChange(e)}></input>
                    <input type="text" placeholder='Email' name='email' onChange={(e)=>handleChange(e)}></input>
                    <input type="password" placeholder='********' name='password' onChange={(e)=>handleChange(e)}></input>
                    <input type="password" placeholder='********' name='confirmPassword' onChange={(e)=>handleChange(e)}></input>
                    
                    <button className='submit' type="submit">Registrati</button>
                    <span>Possiedi già un Account?  <Link to="/Login" style={{ textDecoration: 'none', color: '#2ecc71',  }}> Login</Link></span>
                </form>
                <div className="benvenuto">
                    <h1>Benvenuto su OrtoShop</h1>
                    <p>
                        Accedi o registrati per immergerti al pieno nella nostra varietà di prodotti coltivati e raccolti proprio per te!
                    </p>
                    
                </div>
            </div>
        </>
    );
}