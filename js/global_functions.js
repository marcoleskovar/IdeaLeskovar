
const guardarProducto = () =>{
    localStorage.setItem('productos', JSON.stringify(productos));
}

const cargarProducto = () =>{
    return JSON.parse(localStorage.getItem('productos'))
}

const guardarCarrito = (carrito) =>{
    localStorage.setItem('carrito', JSON.stringify(carrito))
}

const importarCarrito = () =>{
    return JSON.parse(localStorage.getItem('carrito')) || []
}

const cantidadProductosTotal = () =>{
    const carrito = importarCarrito ()
    return carrito.reduce((acumulador, item) => acumulador += item.cantidad, 0)
}

const actualizarCantidad = (id) => {
    const carrito = importarCarrito();
    const posicion = carrito.findIndex((item) => item.id === id);
    const inputValue = document.getElementById(`inputCantidad-${id}`)
    carrito[posicion].cantidad = parseInt(inputValue.value);
    guardarCarrito(carrito);
    renderCarrito();
};

const badgeCarrito = (total) =>{
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
    if(cantidadProductosTotal()>= 100){
        contenido = `<span class="badge">+99</span>
        <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" class="bi bi-cart2" viewBox="0 0 16 16">
        <path d="M0 2.5A.5.5 0 0 1 .5 2H2a.5.5 0 0 1 .485.379L2.89 4H14.5a.5.5 0 0 1 .485.621l-1.5 6A.5.5 0 0 1 13 11H4a.5.5 0 0 1-.485-.379L1.61 3H.5a.5.5 0 0 1-.5-.5zM3.14 5l1.25 5h8.22l1.25-5H3.14zM5 13a1 1 0 1 0 0 2 1 1 0 0 0 0-2zm-2 1a2 2 0 1 1 4 0 2 2 0 0 1-4 0zm9-1a1 1 0 1 0 0 2 1 1 0 0 0 0-2zm-2 1a2 2 0 1 1 4 0 2 2 0 0 1-4 0z"/>
        </svg>`
    }
    return badge.innerHTML = contenido
}
badgeCarrito()