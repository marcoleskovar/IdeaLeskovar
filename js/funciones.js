//BOTON HAMBURGUESA = START
const hamburger = document.querySelector ('.index-header__right--hamburger')
const navbar = document.querySelector ('.index-header__navbar')
const subpagesListElements = document.querySelectorAll ('.index-header__navbar--subpages--list--elements')

hamburger.onclick = () =>{//es lo mismo que escribir "hamburger.addEventListener('click', ()=>{})" o lo mismo que decir "hamburger.addEventListener('click', function(){})"
    hamburger.classList.toggle('active')
    navbar.classList.toggle('active')
}
    subpagesListElements.forEach(n  => {
    n.onclick = () =>{
        hamburger.classList.remove('active')
        navbar.classList.remove('active')
    }
})
//BOTON HAMBURGUESA = END


//GUARDAS PRODUCTOS EN STORAGE JSON = START
const guardarProducto = () =>{
    localStorage.setItem('productos', JSON.stringify(productos));
}
//GUARDAS PRODUCTOS EN STORAGE JSON = END

//LLAMAS PRODUCTOS EN STORAGE JSON = START
const cargarProducto = () =>{
    return JSON.parse(localStorage.getItem('productos'))
}
//LLAMAS PRODUCTOS EN STORAGE JSON = END


//PRODUCTOS EN EL CATALOGO = START
const productCards = document.querySelector('.productos-main__sect')
const cardCreator = (elementos) =>{
    cargarProducto()
    let cards = ''
    elementos.forEach(producto => {
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
    productCards.innerHTML = cards
}
//PRODUCTOS EN EL CATALOGO = END


//FILTRADOR DE PRODUCTOS = START
const btnFiltrar = document.querySelector('.productos-main__filter--min-max--button');
const filtrarPrecio = () => {
    const minPrice = parseInt(document.getElementById('minPrice').value);
    const maxPrice = parseInt(document.getElementById('maxPrice').value);
    const error = document.getElementById('errorFilter');
    let productos = cargarProducto();
    let productosFiltrados;

    if (isNaN(minPrice) && isNaN(maxPrice)){//SI AMBOS SON NULL O NAN
        error.innerHTML = 'No es válido, reingrese.';
        return;
    }
    if (!isNaN(minPrice) && isNaN(maxPrice)){//SI MIN ES UN NUMERO Y MAX NO
        error.innerHTML = '';
        productosFiltrados = productos.filter((producto) => {
          return producto.precio >= minPrice;
        });
    }else if (isNaN(minPrice) && !isNaN(maxPrice)){//SI MAX ES UN NUMERO Y MIN NO
        error.innerHTML = '';
        productosFiltrados = productos.filter((producto) => {
            return producto.precio <= maxPrice;
        });
    }else if (minPrice > maxPrice){//SI EL MINIMO ES MAYOR AL MAXIMO
        error.innerHTML = 'El precio mínimo no puede ser mayor al precio máximo.';
        return;
    }else{//SI SE INGRESAN CORRECTAMENTE AMBOS DATOS
        productosFiltrados = productos.filter((producto) => {
            error.innerHTML= ''
            return producto.precio >= minPrice && producto.precio <= maxPrice;
        });
    }
    cardCreator(productosFiltrados);
};
//FILTRADOR DE PRODUCTOS = END


//VER PRODUCTO EN DETALLE = START
const verProducto = (id) =>{
    let traerProducto = cargarProducto()
    let producto = traerProducto.find(item => item.id == id)
    localStorage.setItem('seleccionado', JSON.stringify(producto))
    location.href = '../views/selected_product.html'
}
//VER PRODUCTO EN DETALLE = END


//RENDERIZAR PRODUCTO ELEGIDO = START
const renderProduct = () =>{
    const seleccionado = JSON.parse(localStorage.getItem('seleccionado'))
    let contenido = `<div class="selected-main__sect--img">
    <img class="selected-main__sect--img--product" src="${seleccionado.imagen}">
</div>
<div class="selected-main__sect--info">
    <h1 class="selected-main__sect--info--name">${seleccionado.producto}</h1>
    <h2 class="selected-main__sect--info--price">${'$' + seleccionado.precio}</h2>
    <button class="selected-main__sect--info--add" onclick="agregarProducto(${seleccionado.id})" id="agregarCarrito">
        Agregar al carrito
        <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" class="bi bi-cart2" viewBox="0 0 16 16">
            <path d="M0 2.5A.5.5 0 0 1 .5 2H2a.5.5 0 0 1 .485.379L2.89 4H14.5a.5.5 0 0 1 .485.621l-1.5 6A.5.5 0 0 1 13 11H4a.5.5 0 0 1-.485-.379L1.61 3H.5a.5.5 0 0 1-.5-.5zM3.14 5l1.25 5h8.22l1.25-5H3.14zM5 13a1 1 0 1 0 0 2 1 1 0 0 0 0-2zm-2 1a2 2 0 1 1 4 0 2 2 0 0 1-4 0zm9-1a1 1 0 1 0 0 2 1 1 0 0 0 0-2zm-2 1a2 2 0 1 1 4 0 2 2 0 0 1-4 0z"/>
        </svg>
    </button>
</div>`
document.getElementById('productoSeleccionado').innerHTML = contenido
}
//RENDERIZAR PRODUCTO ELEGIDO = END


//GUARDAR ARRAY DE PRODUCTOS EN EL STORAGE = START
const guardarCarrito = (carrito) =>{
    localStorage.setItem('carrito', JSON.stringify(carrito))
}
//GUARDAR ARRAY DE PRODUCTOS EN EL STORAGE = END


//IMPORTAR ARRAY DE PRODUCTOS DEL STORAGE = START
const importarCarrito = () =>{
    return JSON.parse(localStorage.getItem('carrito')) || []
}
//IMPORTAR ARRAY DE PRODUCTOS DEL STORAGE = END


//GUARDAR PRODUCTO DE CARRITO = START
const agregarProducto = (id) =>{
    const productos = cargarProducto()
    const agregado = productos.find((elemento) => elemento.id == id)
    const carrito = importarCarrito ()
    carrito.push(agregado)
    guardarCarrito(carrito)
}
//GUARDAR PRODUCTO DE CARRITO = END