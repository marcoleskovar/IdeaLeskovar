//Creo array de productos
const productos = [
    {id: 1, producto: 'Abstract Black Shirt', precio: 3000, imagen: '../img/prod-1.webp'},
    {id: 2, producto: 'Simple Orange Shirt', precio: 1000, imagen: '../img/prod-2.webp'},
    {id: 3, producto: 'Simple Brown Shirt', precio: 980, imagen: '../img/prod-3.webp'},
    {id: 4, producto: 'Marble Black & White Shirt', precio: 3500, imagen: '../img/prod-4.webp'},
    {id: 5, producto: 'Abstract White Shirt', precio: 2900, imagen: '../img/prod-5.webp'},
    {id: 6, producto: 'Hoodie Peace', precio: 8000, imagen: '../img/prod-6.webp'},
    {id: 7, producto: 'Hoodie Skeleton', precio: 8200, imagen: '../img/prod-7.webp'},
    {id: 8, producto: 'Fuck Off Shirt', precio: 3000, imagen: '../img/prod-8.webp'},
    {id: 9, producto: 'Cargo Black', precio: 4500, imagen: '../img/prod-9.webp'},
    {id: 10, producto: 'Cargo Style Purple', precio: 5000, imagen: '../img/prod-10.webp'},
    {id: 11, producto: 'Cargo Style Blue', precio: 5000, imagen: '../img/prod-11.webp'},
    {id: 12, producto: 'Cargo Black Chains', precio: 4500, imagen: '../img/prod-12.webp'},
]

guardarProducto()//SE GUARDAN LOS PRODUCTOS EN STORAGE
cargarProducto();//DEVUELVE LOS PRODUCTOS DEL STORAGE
cardCreator(productos);//SE CREAN LAS TARJETAS DE PRODUCTOS
btnFiltrar.onclick = filtrarPrecio;//SE LLAMA A LA FUNCION PARA FILTRAR