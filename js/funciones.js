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


//GUARDAR ARRAY DE PRODUCTOS EN EL STORAGE (CARRITO) = START
const guardarCarrito = (carrito) =>{
    localStorage.setItem('carrito', JSON.stringify(carrito))
}
//GUARDAR ARRAY DE PRODUCTOS EN EL STORAGE = END


//IMPORTAR ARRAY DE PRODUCTOS DEL STORAGE = START
const importarCarrito = () =>{
    return JSON.parse(localStorage.getItem('carrito')) || []
}
//IMPORTAR ARRAY DE PRODUCTOS DEL STORAGE (CARRITO) = END


//SABER SI HAY PRODUCTO EN EL CARRITO = START
const estaEnElCarrito = (id) =>{
    const carrito = importarCarrito ()
    return carrito.some ((elemento) =>elemento.id == id)
}
//SABER SI HAY PRODUCTO EN EL CARRITO = END


//GUARDAR PRODUCTO DE CARRITO = START
const agregarProducto = (id) =>{
    const carrito = importarCarrito ()
    const productos = cargarProducto()
    /* const inputCantidad = document.getElementById("inputCantidad");
    const cantidad = parseInt(inputCantidad.value); */
    if (estaEnElCarrito(id)){
        let posicion = carrito.findIndex((item) => item.id === id)
        carrito[posicion].cantidad += 1
    }else{
        const agregado = productos.find((elemento) => elemento.id == id)
        agregado.cantidad = 1
        carrito.push(agregado)
    }
    guardarCarrito(carrito)
    badgeCarrito()
    renderCarrito ()
}
//GUARDAR PRODUCTO DE CARRITO = END


//RENDERIZAR CARRITO = START
const contenedorLista = document.getElementById('listaDeCarrito')
const contenedorResumen = document.getElementById('resumenDeCompra')
const sectionLista = document.getElementById('sectionListaDeCarrito')
const renderCarrito = () =>{
    const productosDelCarrito = importarCarrito()
    let listaDeCarrito = ''
    for(const elegido of productosDelCarrito){
        listaDeCarrito += `                <li class="carrito-main__sect--list--product">
        <div class="carrito-main__sect--list--product--info">
            <img class="carrito-main__sect--list--product--info--img" src="${elegido.imagen}">
            <div class="carrito-main__sect--list--product--info--text">
                <h2 class="carrito-main__sect--list--product--info--text--name" onclick="verProducto(${elegido.id})">${elegido.producto}</h2>
                <h3 class="carrito-main__sect--list--product--info--text--price">${'$' + (elegido.cantidad * elegido.precio)}</h3>
                <div class="carrito-main__sect--list--product--info--text--cantidad">
                    <button class="carrito-main__sect--list--product--info--text--cantidad--buttons" onclick="agregarQuitar(${elegido.id}, 'quitar')" id="restarProducto">-</button>
                    <input type="number" class="carrito-main__sect--list--product--info--text--cantidad--input" value="${elegido.cantidad}" onchange="actualizarCantidad(${elegido.id})" id="inputCantidad-${elegido.id}"></input>
                    <button class="carrito-main__sect--list--product--info--text--cantidad--buttons" onclick="agregarQuitar(${elegido.id}, 'agregar')" id="sumarProducto">+</button>
                </div>
            </div>
        </div>
        <svg class="carrito-main__sect--list--product--trash" onclick="eliminarProducto(${elegido.id})" xmlns="http://www.w3.org/2000/svg" fill="currentColor" class="bi bi-trash" viewBox="0 0 16 16">
            <path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5Zm2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5Zm3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0V6Z"/>
            <path d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1v1ZM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4H4.118ZM2.5 3h11V2h-11v1Z"/>
        </svg>
    </li>`
    }

    const precioFinal = `<div class="carrito-main__final--resumen">Resumen de compra</div>
    <div class="carrito-main__final--productos">Productos (${cantidadProductosTotal()})</div>
    <div class="carrito-main__final--total">
        <div class="carrito-main__final--total--word">Total</div>
        <div class="carrito-main__final--total--cash">${'$'+precioProductosTotal()}</div>
    </div>
    <button class="carrito-main__final--buy">Comprar Carrito</button>`

    let contenidoVacio = ''
    if (productosDelCarrito.length <= 0){
        contenedorResumen.style.display = 'none'
        sectionLista.style.width = '100%'
        sectionLista.style.padding = '0'
        contenidoVacio = `<div class="carrito-main__sect--vacio">
        <h2 class="carrito-main__sect--vacio--ups">
            Parece que aún no hay productos agregados en el carrito
        </h2>
        <h3 class="carrito-main__sect--vacio--comprar">
            ¡Para agregar productos visita nuestro <a href="../views/productos.html" class="carrito-main__sect--vacio--comprar--catalogo">catalogo</a>!
        </h3>
    </div>`
        sectionLista.innerHTML = contenidoVacio
    }else{
        contenedorLista.innerHTML = listaDeCarrito
        contenedorResumen.innerHTML = precioFinal
    }
}
//RENDERIZAR CARRITO = END


//SUMAR O RESTAR CANTIDAD BOTONES = START
const agregarQuitar = (id, funcion) =>{
    const inputValue = document.getElementById(`inputCantidad-${id}`)
    let cantidad = parseInt(inputValue.value)
    if (funcion === 'quitar' && cantidad>1){
        cantidad--;
    }else if(funcion === 'agregar'){
        cantidad++
    }
    inputValue.value = cantidad
    actualizarCantidad(id)
}
//SUMAR O RESTAR CANTIDAD BOTONES = END


//ACTUALIZAR CANTIDAD = START
const actualizarCantidad = (id) => {
    const carrito = importarCarrito();
    const posicion = carrito.findIndex((item) => item.id === id);
    const inputValue = document.getElementById(`inputCantidad-${id}`)
    carrito[posicion].cantidad = parseInt(inputValue.value);
    guardarCarrito(carrito);
    renderCarrito();
};
//ACTUALIZAR CANTIDAD = END


//ELIMINAR PRODUCTO DEL CARRITO = START
const eliminarProducto = (id) =>{
    const carrito = importarCarrito()
    const elegido = carrito.filter((item) => item.id != id)
    guardarCarrito(elegido)
    renderCarrito()
    badgeCarrito()
}
//ELIMINAR PRODUCTO DEL CARRITO = END


//CANTIDAD TOTAL DE PRODUCTOS = START
const cantidadProductosTotal = () =>{
    const carrito = importarCarrito ()
    return carrito.reduce((acumulador, item) => acumulador += item.cantidad, 0)
}
//CANTIDAD TOTAL DE PRODUCTOS = END


//PRECIO TOTAL DE PRODUCTOS = START
const precioProductosTotal = () =>{
    const carrito = importarCarrito ()
    return carrito.reduce((acumulador, elemento) => acumulador += (elemento.precio * elemento.cantidad), 0)
}
//PRECIO TOTAL DE PRODUCTOS = END


//BADGE ICON CARRITO = START
const badgeCarrito = () =>{
    const badge = document.getElementById('carritoLink')
    contenido = `<span class="badge">${cantidadProductosTotal()}</span>
                <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" class="bi bi-cart2" viewBox="0 0 16 16">
                <path d="M0 2.5A.5.5 0 0 1 .5 2H2a.5.5 0 0 1 .485.379L2.89 4H14.5a.5.5 0 0 1 .485.621l-1.5 6A.5.5 0 0 1 13 11H4a.5.5 0 0 1-.485-.379L1.61 3H.5a.5.5 0 0 1-.5-.5zM3.14 5l1.25 5h8.22l1.25-5H3.14zM5 13a1 1 0 1 0 0 2 1 1 0 0 0 0-2zm-2 1a2 2 0 1 1 4 0 2 2 0 0 1-4 0zm9-1a1 1 0 1 0 0 2 1 1 0 0 0 0-2zm-2 1a2 2 0 1 1 4 0 2 2 0 0 1-4 0z"/>
                </svg>`
    if (cantidadProductosTotal() <= 0){
        contenido = `<svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" class="bi bi-cart2" viewBox="0 0 16 16">
        <path d="M0 2.5A.5.5 0 0 1 .5 2H2a.5.5 0 0 1 .485.379L2.89 4H14.5a.5.5 0 0 1 .485.621l-1.5 6A.5.5 0 0 1 13 11H4a.5.5 0 0 1-.485-.379L1.61 3H.5a.5.5 0 0 1-.5-.5zM3.14 5l1.25 5h8.22l1.25-5H3.14zM5 13a1 1 0 1 0 0 2 1 1 0 0 0 0-2zm-2 1a2 2 0 1 1 4 0 2 2 0 0 1-4 0zm9-1a1 1 0 1 0 0 2 1 1 0 0 0 0-2zm-2 1a2 2 0 1 1 4 0 2 2 0 0 1-4 0z"/>
        </svg>`
    }
    badge.innerHTML = contenido
}
badgeCarrito()
//BADGE ICON CARRITO = END