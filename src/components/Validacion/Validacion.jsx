//import e from 'express';
import React, {useState, useEffect} from 'react';
import { useDispatch, useSelector  } from 'react-redux';
//import {  useHistory } from 'react-router-dom';
import {postCreateProduct,getProducts } from '../../redux/DSellerActions';
import { useRouter } from 'next/router';


export default function Validacion() {
   


    const dispatch = useDispatch()
    //const history = useHistory()
    const [input,setInput] = useState({
       validacion:''
         })
    let [errors,setErrors] =  useState({validacion:true})
                            
    useEffect (() => { 
        dispatch(getProducts()); 
       // eslint-disable-next-line react-hooks/exhaustive-deps
        },[dispatch]);    

      
function validate(input) {
      
     (!input.validacion || input.validacion<0 || input.validacion >9999)?
     errors.validacion = 'Validacion debe ser un numero entre 0000-9999':errors.validacion=false;
     return errors 
}
 const {userL} =  useSelector((state) => state.products.products)
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
         if (input.name.length<4) {return alert('Nombre requiere mas de 4 caracetres')}
         if (!input.rating) {return alert('Rating is required')}
         if (!/^(?:[1-9]\d{0,2}(?:,\d{3})*|0)(?:\.\d+)?$/.test(input.rating)) 
            {return alert('Wrong format for Rating. Should be a number between 0-5')
         }
       
         dispatch(getValidate(userL,input))
       
          setInput({
           validate:""
                 })
                  
        // history.push('/productos')
        
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
