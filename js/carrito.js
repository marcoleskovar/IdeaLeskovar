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

const contenedorLista = document.getElementById('listaDeCarrito')
const contenedorResumen = document.getElementById('resumenDeCompra')
const sectionLista = document.getElementById('sectionListaDeCarrito')
const renderCarrito = () =>{
    const productosDelCarrito = importarCarrito()
    let listaDeCarrito = ''
    for(const elegido of productosDelCarrito){
        listaDeCarrito += `<li class="carrito-main__sect--list--product">
        <div class="carrito-main__sect--list--product--info">
            <img class="carrito-main__sect--list--product--info--img" src="${elegido.imagen}">
            <div class="carrito-main__sect--list--product--info--text">
                <h2 class="carrito-main__sect--list--product--info--text--name" onclick="verProducto(${elegido.id})">${elegido.producto}</h2>
                <h3 class="carrito-main__sect--list--product--info--text--price">${'$' + (elegido.cantidad * elegido.precio)}</h3>
                <div class="carrito-main__sect--list--product--info--text--cantidad">
                    <button class="carrito-main__sect--list--product--info--text--cantidad--buttons" onclick="agregarQuitar(${elegido.id}, 'quitar'); badgeCarrito()" id="restarProducto">-</button>
                    <input type="number" class="carrito-main__sect--list--product--info--text--cantidad--input" value="${elegido.cantidad}" onchange="actualizarCantidad(${elegido.id})" id="inputCantidad-${elegido.id}" readonly></input>
                    <button class="carrito-main__sect--list--product--info--text--cantidad--buttons" onclick="agregarQuitar(${elegido.id}, 'agregar'); badgeCarrito()" id="sumarProducto">+</button>
                </div>
            </div>
        </div>
        <svg class="carrito-main__sect--list--product--trash" onclick="eliminarProducto(${elegido.id})" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 16 16">
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
    <button class="carrito-main__final--buy" onclick="comprarCarrito()">Comprar Carrito</button>`

    let contenidoVacio = ''
    if (productosDelCarrito.length <= 0){
        contenedorResumen.style.display = 'none'
        sectionLista.style.width = '100%'
        sectionLista.style.padding = '0'
        contenidoVacio = `<div class="carrito-main__sect--vacio">
        <h2 class="carrito-main__sect--vacio--ups">
            Parece que aún no hay productos agregados en el carrito
        </h2>
        <a href="../views/productos.html" class="carrito-main__sect--vacio--comprar--catalogo">
            <button class="carrito-main__sect--vacio--comprar">Visitar Catalogo</button>
        </a>
    </div>`
    sectionLista.innerHTML = contenidoVacio
    }else{
        contenedorLista.innerHTML = listaDeCarrito
        contenedorResumen.innerHTML = precioFinal
    }
}

eliminadoArray = []
const eliminarProducto = (id, cantidad) =>{
    const carrito = importarCarrito()
    const elegido = carrito.filter((item) => item.id != id)
    const eliminado = carrito.find ((item) => item.id === id)
    guardarCarrito(elegido)
    renderCarrito()
    badgeCarrito()
    Toastify({
        text: "Haz click para deshacer",
        duration: 1500,
        gravity: "top",
        position: "right",
        stopOnFocus: true,
        className: `productoEliminado-${id}`,
        onClick: () => {recuperarEliminado(id);},
        offset: {
            x: 0,
            y: 70
          },
        style:{
            cursor: 'pointer',
            background: "rgba(153, 0, 0, 0.7)",
        },
    }).showToast();
    eliminadoArray.push(eliminado)
    localStorage.setItem('eliminado', JSON.stringify(eliminadoArray))
}

const recuperarEliminado = (id) => {
    const arrayEliminados = JSON.parse(localStorage.getItem('eliminado'));
    const carrito = importarCarrito();
    const alerta = document.getElementsByClassName(`productoEliminado-${id}`)
    if(carrito.length === 0 && alerta){
        location.reload();
    }
    for(const producto of arrayEliminados){
        if (producto.id === id) {
            if (estaEnElCarrito(id)){
                badgeCarrito()
                renderCarrito();
            }else{
                carrito.push(producto);
                guardarCarrito(carrito);
                badgeCarrito()
                renderCarrito();
            }
            return
        }
    }
}

const precioProductosTotal = () =>{
    const carrito = importarCarrito ()
    return carrito.reduce((acumulador, elemento) => acumulador += (elemento.precio * elemento.cantidad), 0)
}

const comprarCarrito = () =>{
    localStorage.removeItem('carrito')
    Swal.fire({
        position: 'center',
        icon: 'success',
        title: '¡Gracias por tu compra!',
        showConfirmButton: false,
        timer: 2500
    })
    badgeCarrito()
    renderCarrito()
}

renderCarrito()