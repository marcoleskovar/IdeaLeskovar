//Creo array de productos
const productos = [
    {id: 1, producto: 'Remera Negra', precio: 3000, imagen: '../img/prod-1.webp'},
    {id: 2, producto: 'Remera Naranja', precio: 2500, imagen: '../img/prod-2.webp'},
    {id: 3, producto: 'Remera Marron', precio: 2400, imagen: '../img/prod-3.webp'},
    {id: 4, producto: 'Remera Blanca', precio: 3000, imagen: '../img/prod-4.webp'}
]

//Creo una constante que selecciona el arituclo donde se van a almacenar los productos
const productCards = document.querySelector('.productos-main__sect')

//Creamos funcion que nos guarda el array de productos en una storage llamada 'productos'
const guardarProducto = () =>{
    localStorage.setItem('productos', JSON.stringify(productos));
}

//Creamos una funcion que una vez llamada, recupera el array guardado
const cargarProducto = () =>{
    return JSON.parse(localStorage.getItem('productos'))
}

guardarProducto()

//Creo funcion que crea las cards de productos
const cardCreator = () =>{
    let productos = cargarProducto()
    let cards = ''
    //En cada iteracion del array de productos, itera por cada uno de los elementos y los asigna
    productos.forEach(producto => {
        //Se guarda cada una de estas cards en 'cards'
       cards += `<div class="productos-main__sect--div">
       <div class="productos-main__sect--div--card" onClick="verProducto(${producto.id})">
           <img class="productos-main__sect--div--card--img" src=${producto.imagen}>
           <div class="productos-main__sect--div--card--caption">
               <h3>${producto.producto}</h3>
               <h4>${'$' + producto.precio}</h4>
           </div>
       </div>
   </div>`
    });
    //Al final de cada iteracion se escribe en el html lo que esta en cada card
    productCards.innerHTML = cards
}

const verProducto = (id) =>{
    let traerProducto = cargarProducto()
    let producto = traerProducto.find(item => item.id === id)
    localStorage.setItem('seleccionado', JSON.stringify(producto))
    location.href = '../views/selected_product.html'
}
cardCreator()

