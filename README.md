<<<<<<< HEAD
![LogoICO](https://user-images.githubusercontent.com/16067675/209176194-1853262c-dacd-46e9-aa32-db310e7a2d66.jpg)

# 3DSeller 

### Tecnologias implementadas:
      1. Javascript + typescript
      2. React
      3. Redux + @reduxjs/toolkit
      4. Nextjs 
      5. MongoDB
      6. 
      
## Boilerplate

## Front End
__1.  En la ruta Home /Home__:

- [ ] Mostrar descripcion de la empresa
- [ ] Mostrar Vision - Mision 
    
___2. En la ruta productos /productos___:
- [ ] Mostrar 10 productos por pagina con las siguientes caracteristicas:
- Nombre
- Imagen al pulsar la imagen debe ir a al ruta productos/id (Ruta de detalles del producto)
- Rating 
- Tipo de producto
- Precio
- [ ] Si el stock es cero (el producto no se renderiza)
- [ ] Boton de agregar carrito
    
___3. Ruta de detalles /productos/id___:
- [ ] Muestra Nombre del prodcuto
- [ ] Muestra la imagen del producto con psoibilidad de ver otras iamgenes
- [ ] Muestra descricpion
- [ ] Tiempo estimado de fabricacion (de 45 min a 2 horas)
- [ ] Stock
- [ ] Boton de agregar carrito
    
___4. La barra Search___:
- [ ] Debe mostrar en la ruta /productos la lista de productos organizados en grupo de 10 si contienen los datos de la busqueda
    
__5. Ruta de creación de productos__: debe contener

- [ ] Un formulario __controlado con JavaScript__ con los siguientes campos:
  - Nombre
  - Descripción
  - Rating
- [ ] Agregar tipo de los contenidos en la BD 
- [ ] Botón/Opción para crear un nuevo articulo
    
## Back End
En la carpeta api/* deben estar todas las apis requeridas para la consulta de los datos requeridos para el Front End.
Se debe desarrollar un servidor en NextJS  para poder consultar el Back End y el Front End con un solo servidor activo con las siguientes rutas:

- [ ] __GET /productos__:
  - Obtener un listado de los productos 
  - Debe devolver solo los datos necesarios para la ruta productos
- [ ] __GET /productos?name="..."__:
  - Obtener un listado de productos que contengan la palabra ingresada como query parameter
  - Si no existe ningún producto mostrar un mensaje adecuado
- [ ] __GET /producto/{idProducto}__:
  - Obtener el detalle de un producto en particular
  - Debe traer solo los datos pedidos en la ruta de detalle de producto, si posee mas de una imagen esta debe mostrar imagenes pequeñas debajo de la principal y el usuario puede moverla con scroll si es un celular se debe mover sola en periodo de 2seg.
- [ ] __POST /productos__:
  - Recibe los datos recolectados desde el formulario controlado de la ruta de creación de producto por body
  - Crea un producto en la base de datos, relacionado a su tipo y aosicado al usuario que lo creo (cliente con su ID, admin con su ID)
- [ ] __POST /auth?user='user'&&passwd=?'passwd'__:
  - Se envia via Post la autenticacion Local de usuario y password
  - Debe responder ok en caso de que tenga los permisos de usuario y password habilitados para entrar con las propiedades de client o admin.
  - Debe responder usuario inhabilitado por ADMIN en caso de que el usuario sea dado de baja por politicas de la empresa.
  - Debe responder Clave incorrecta en caso de que el password sea incorrecto y el usuario exista debe dar 3 intentos, al 3er intento el usuario debe regenerar passwd.
  - Debe responder usuario NO EXISTE en caso de que usuario no exista y dar opcion de crear usuario.
- [ ] __GET /tipoproducto__:
  - Obtener todos los tipos de productos posibles
  


=======
This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `pages/index.tsx`. The page auto-updates as you edit the file.

[API routes](https://nextjs.org/docs/api-routes/introduction) can be accessed on [http://localhost:3000/api/hello](http://localhost:3000/api/hello). This endpoint can be edited in `pages/api/hello.ts`.

The `pages/api` directory is mapped to `/api/*`. Files in this directory are treated as [API routes](https://nextjs.org/docs/api-routes/introduction) instead of React pages.

This project uses [`next/font`](https://nextjs.org/docs/basic-features/font-optimization) to automatically optimize and load Inter, a custom Google Font.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js/) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/deployment) for more details.
>>>>>>> c015fca (Primer commit con Back End unido con Front End a traves de NextJS y reduxToolkit con MongoDB)
