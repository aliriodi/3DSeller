//import e from 'express';
import React, {useState, useEffect} from 'react';
import { useDispatch, useSelector  } from 'react-redux';
//import {  useHistory } from 'react-router-dom';
import {modificarUser,getProducts, getUser } from '../../redux/DSellerActions';
import { useRouter } from 'next/router';
import axios from "axios";


export default function Validacion() {
    const router = useRouter()
    const {userL} =  useSelector((state) => state.products)
    const dispatch = useDispatch()
    //const history = useHistory()
    const [input,setInput] = useState({
       validacion:''
         })
    let [errors,setErrors] =  useState({validacion:true})

    const handleSentMail = async (magik, user) => {
          let response = await axios.post("/api/mail/mail", {
          magik,
          user,
        });
        return response.data;
      };
      
function validate(input) {
      
     (!input.validacion || input.validacion<0 || input.validacion >9999)?
     errors.validacion = 'Validacion debe ser un numero entre 0000-9999':errors.validacion=false;
     return errors 
}

      function handleOnChange(e) {
        setInput({
          ...input,
          [e.target.name]: e.target.value
            })
        setErrors(validate ({
            ...input,[e.target.name]:e.target.value
        }))
     }
    
 
    
      function  handleSubmit(e) {
         e.preventDefault()
         if(input.validacion == userL.magiknumber){
            dispatch(modificarUser({...userL,validate2:true,rol:'client'}))
            dispatch(getUser())
            router.push('/')
         }
         else{
            errors.validacion='El numero introducido es incorrecto'
         }
          
          setInput({
           validacion:""
                 })
                  
    
        
      }

    return (
        <>
    



<div className="marginTopValidate">
        <div className="center">

            <h1>Validar usuario</h1>

            <form onSubmit={e=>handleSubmit(e)}>

                {/* Magic Number */}
               
                 <div className="txt_field">
                         <input
                         onChange={handleOnChange}
                         onBlur={handleOnChange}
                         onFocus={handleOnChange}
                         type='number'
                         min="0"
                         max="9999"
                         step="1"
                         name='validacion'
                         value={input.validacion}
                         placeholder='Numero de validacion'/>
                         <span></span>
                         <label>Numero de Validacion</label>
                         {errors.validacion && ( <p className="error-text"> {errors.validacion} </p> )}
                </div>

                {/* <input type="submit" value="CREATE" className="btn-submit"/> */} 
                     <button
                     disabled={errors.validacion?true:false 
                            }
                            className={`btn-submit ${
                                errors.validacion?true:false == true?"btn-disabled":null
                            }`}
                            type='submit'>Validar Usuario</button>


              
            </form>

        </div>
        </div>
        
        </>
    )
}
