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
const cardCreator = (elementos) =>{
    let cards = ''
    //En cada iteracion del array de productos, itera por cada uno de los elementos y los asigna
    elementos.forEach(producto => {
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

//Filtrar por precio
const btnFiltrar = document.querySelector('.productos-main__filter--min-max--button');
const filtrarPrecio = () => {
    const minPrice = parseInt(document.getElementById('minPrice').value);
    const maxPrice = parseInt(document.getElementById('maxPrice').value);
    const error = document.getElementById('errorFilter');
    let productos = cargarProducto();
    let productosFiltrados;

    //Si los dos son NaN
    if (isNaN(minPrice) && isNaN(maxPrice)) {
        error.innerHTML = 'No es válido, reingrese.';
        cardCreator(productos);
        return;
    }

    if (!isNaN(minPrice) && isNaN(maxPrice)){//Si min es un numero y max no
        error.innerHTML = '';
        productosFiltrados = productos.filter((producto) => {
          return producto.precio >= minPrice;
        });
    }else if (isNaN(minPrice) && !isNaN(maxPrice)){//Si max es un numero y min no
        error.innerHTML = '';
        productosFiltrados = productos.filter((producto) => {
            return producto.precio <= maxPrice;
        });
    }else if (minPrice > maxPrice){
        error.innerHTML = 'El precio mínimo no puede ser mayor al precio máximo.';
        cardCreator(productos);
        return;
    }else{
        productosFiltrados = productos.filter((producto) => {
            error.innerHTML= ''
            return producto.precio >= minPrice && producto.precio <= maxPrice;
        });
    }
    cardCreator(productosFiltrados);
};
const productos2 = cargarProducto();
cardCreator(productos2);
btnFiltrar.onclick = filtrarPrecio;

//Acceder a cada producto
const verProducto = (id) =>{
    let traerProducto = cargarProducto()
    let producto = traerProducto.find(item => item.id === id)
    localStorage.setItem('seleccionado', JSON.stringify(producto))
    location.href = '../views/selected_product.html'
}