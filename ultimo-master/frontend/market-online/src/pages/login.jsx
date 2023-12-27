import React from "react";
import '../components/login.css';
import {useState,useEffect} from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {ToastContainer,toast} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import axios from "axios";
import { loginRoute } from '../utils/APIRoutes';
export default function Login() {
    const navigate= useNavigate()
    const [values,setValues]=useState({
        email:"",
        password:"",

        
    });
    const toastOptions={
        position: 'bottom-left',
        autoClose:3000,
        pauseOnHover: true,
        draggable:true,
        theme:"colored"
    };

    //convalidiamo il login fatto dall'utente
    const handleSubmit= async(e)=>{
        e.preventDefault();
        if(handleValidation()){
           
            const {password,email}=values;
            const{data}=await axios.post(loginRoute, {
                email, 
                password,
            });
            if (data.status===false){
            toast.error(data.msg, toastOptions);
        } if (data.status===true){
            
            localStorage.setItem('chat-app-user', JSON.stringify(data.user))
            navigate("/Ortoshop");
        }


        };
    };
    
    //definiamo e inviamo come "messaggio" tutti i possibili errori di compilazione
    const handleValidation =()=>{
        const {password,email}=values;
        if (password==='') {
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
        }else if (email===''){
            toast.error("email e password sono richiesti", toastOptions,{
                position: 'bottom-left',
                autoClose:3000,
                pauseOnHover: true,
                draggable:true,
                theme:"colored", 
            });
            return false;
        }
            return true;
        
    }
    //aggiorniamo i valori
    const handleChange= (e)=>{
        setValues({...values, [e.target.name]:e.target.value})
    }
    return(
        <>
            <div className='login'>
                <form className='form' onSubmit={(event)=>handleSubmit(event)}>
                    <div className='logo'>
                    <Link to="/" style={{ textDecoration: 'none', color: '#2ecc71',  }}>
                        <h1 className='title'>OrtoShop</h1>
                    </Link>
                    </div>
                    <input type="text" placeholder='email' name='email' onChange={(e)=>handleChange(e)} ></input>
                    <input type="password" placeholder='********' name='password' onChange={(e)=>handleChange(e)} ></input>
                    <button id='submit'type="submit">Accedi</button>
                    <span>Non possiedi un Account?  <Link to="/register" style={{ textDecoration: 'none', color: '#2ecc71',  }}> Register</Link></span>
                </form>
                <div className="benvenuto">
                    <h1>Bentornato su OrtoShop</h1>
                    <p>
                        Accedi o registrati per immergerti al pieno nella nostra varietà di prodotti coltivati e raccolti proprio per te!
                    </p>
                    
                </div>
            </div>
        </>
    );
}