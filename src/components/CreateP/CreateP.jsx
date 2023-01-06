//import e from 'express';
import React, {useState, useEffect} from 'react';
import { useDispatch, useSelector  } from 'react-redux';
//import {  useHistory } from 'react-router-dom';
import {postCreateProduct,getProducts } from '../../redux/DSellerActions';


export default function CreateP() {
    const dispatch = useDispatch()
    //const history = useHistory()
    const [input,setInput] = useState({
        name: '',
        description: '',
        rating:'',
        material:'',
        image:'http://localhost:3000/_next/image?url=%2F_next%2Fstatic%2Fmedia%2FLogo.1c0eb044.jpeg&w=1080&q=75'
         })
    let [errors,setErrors] =  useState({name:true,
                                          description:true,
                                          rating:true,
                                          material:true})
                            
    useEffect (() => { 
        dispatch(getProducts()); 
       // eslint-disable-next-line react-hooks/exhaustive-deps
        },[dispatch]);    


      
function validate(input) {
    
    input.name.length<5?errors.name = 'Nombre de producto requerido al menos 5 caracteres':
    products.filter(product => product.name.toLowerCase()==input.name.toLowerCase()?errors.name='Producto Existe, cambie nombre':errors.name=false);
    //? errors.name=input.name:errors.name=console.log(input.name+' '+errors.name);
    input.description.length<10?
    errors.description = 'Descripcion es requerida al menos 10 caracteres':errors.description=false;
    (!input.rating || input.rating<0 || input.rating >5)?
     errors.rating = 'Rating debe ser un numero entre 0-5':errors.rating=false;
    input.material.length===0?
    errors.material = 'Al menos un Material es requerido: ': errors.material=false;
   
     return errors 
}
 const products =  useSelector((state) => state.products.products)
 let materials = ["PLA","PETG", "HIPS","Nylon","TPE","Filamento Fibra de Carbono"]
     function handleOnChange(e) {
        setInput({
          ...input,
          [e.target.name]: e.target.value
            })
        setErrors(validate ({
            ...input,[e.target.name]:e.target.value
        }))
     }
     
     function handleMaterial(e) {
        if(e.target.value!=0&& !input.material.includes(e.target.value)){
          setInput({
          ...input,
          material: input.material.length>0?input.material.concat(','+e.target.value):e.target.value
        })}
        } 

 
    
      function  handleSubmit(e) {
         e.preventDefault()
         if (input.name.length<4) {return alert('Nombre requiere mas de 4 caracetres')}
         if (!input.rating) {return alert('Rating is required')}
         if (!/^(?:[1-9]\d{0,2}(?:,\d{3})*|0)(?:\.\d+)?$/.test(input.rating)) 
            {return alert('Wrong format for Rating. Should be a number between 0-5')
         }
       
         dispatch(postCreateProduct(input))
       
         alert(`Product 3DSeller ${input.name} has been added`)
         setInput({
            name: '',
            description: '',
            //releaseDate: '',
            rating:'',
            stock:'',
            category:'',
            material: '',
            //genres: ''
                 })
                  
        // history.push('/productos')
        
      }

    return (
        <>
        <div  className="container0">
        <h1 className="addProduct">Agrega Nuevo Producto 3DSeller</h1>
            <form className="{stl.formarea}" onSubmit={handleSubmit}>
           
            <div className="NombreF">
                    <label>Nombre:</label>
                    <input className="NombreF" onChange={handleOnChange} onBlur={handleOnChange} 
                        type='text' name='name' value={input.name}/>
                    {errors.name && ( <p className="{stl.error}"> {errors.name} </p> )}

                <div className="{stl.msgarea}">
                    <label>Descripcion:</label>
                    <textarea  className="DescriptionF" onChange={handleOnChange} onBlur={handleOnChange} onFocus={handleOnChange}
                    type='text' name='description' value={input.description} />
                    {errors.description && ( <p className="{stl.error}"> {errors.description} </p> )}
                </div>
              
           
                    <label>Indice de Rating:</label>
                    <input  className="RatingF" onChange={handleOnChange} onBlur={handleOnChange} onFocus={handleOnChange}
                        type='number'  min="0" max="5" step="0.1" name='rating' value={input.rating} placeholder='ex 4.3'/>
                    {errors.rating && ( <p className="{stl.error}"> {errors.rating} </p> )}     

                    <label>Materiales Posibles:</label>   
                    <select onChange={handleMaterial}  className="MaterialF" onBlur={handleOnChange} onFocus={handleOnChange}>
                         <option key='Materials'  className="MaterialF" value={0}>==Material== </option>
                        {materials.sort().map(p => {
                           return  <option key={p} className="MaterialF" value={p}>{p}</option>
                        })}
                    </select >
                    <ul  className="ul"><li >{input.material}</li></ul>
                    {errors.material && ( <p className="MaterialF1"> {errors.material} </p> )}
                    {console.log('input')}
                    {console.log(input)}
                    {console.log('error')}
                    {console.log(errors)}
                     <button     disabled={errors.name?true:false ||
                                       errors.platforms?true:false ||
                                       errors.description?true:false ||
                                       errors.rating?true:false||
                                       errors.material?true:false
                                       } className="ButtonF" type='submit'>Agregar Producto</button> 
                    </div>
            </form>
        </div>
        <div/>
        </>
    )
}