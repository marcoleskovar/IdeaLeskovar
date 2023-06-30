const agregarPorCantidad = (id) =>{
    const inputCantidad = document.getElementById(`agregarPorCantidad-${id}`)
    const valorInput = parseInt(inputCantidad.textContent)
    return valorInput
}

const listaDeCantidadCrear = (id, cantidad) =>{
    const contenedor = document.getElementById(`listaAgregarCantidad-${id}`);
    let contenido = '';
    for (let i = 1; i <=5; i++){
        contenido += `<li class="selected-main__sect--info--lista--ul--li" id="elementoNumero${i}" onclick="seleccionarLaCantidad(${id}, ${i})">${i} unidad${i > 1 ? 'es' : ''}</li>`;
    }
    contenedor.innerHTML = contenido;
    const lista = document.getElementById(`listaCantidadProducto`)
    const botonCantidad = document.getElementById(`agregarPorCantidad-${id}`)
    const arrow = document.getElementById(`arrowCantidad`)
    botonCantidad.classList.toggle('active');
    lista.classList.toggle('active');
    arrow.classList.toggle('active')
}

const seleccionarLaCantidad = (id, cantidad) =>{
    const botonCantidad = document.getElementById(`agregarPorCantidad-${id}`)
    let arrowSVG= `<svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" class="selected-main__sect--info--cantidad--input--arrow bi bi-chevron-down" viewBox="0 0 16 16" id="arrowCantidad">
        <path fill-rule="evenodd" d="M1.646 4.646a.5.5 0 0 1 .708 0L8 10.293l5.646-5.647a.5.5 0 0 1 .708.708l-6 6a.5.5 0 0 1-.708 0l-6-6a.5.5 0 0 1 0-.708z"/>
    </svg>`
    botonCantidad.innerHTML = cantidad == 1 ? `${cantidad} unidad` + arrowSVG : `${cantidad} unidades` + arrowSVG;
    const lista = document.getElementById(`listaCantidadProducto`);
    lista.classList.remove('active');
    const arrow = document.getElementById(`arrowCantidad`)
    arrow.classList.remove('active')
}

const renderProduct = () =>{
    const seleccionado = JSON.parse(localStorage.getItem('seleccionado'))
    let contenido = `<div class="selected-main__sect--img">
    <img class="selected-main__sect--img--product" src="${seleccionado.imagen}">
    </div>
    <div class="selected-main__sect--info">
        <h1 class="selected-main__sect--info--name">${seleccionado.producto}</h1>
        <h2 class="selected-main__sect--info--price">${'$' + seleccionado.precio}</h2>
        <div class="selected-main__sect--info--cantidad">
            <button class="selected-main__sect--info--cantidad--input" id='agregarPorCantidad-${seleccionado.id}' onclick="listaDeCantidadCrear(${seleccionado.id}, 1)">1 unidad 
                <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" class="selected-main__sect--info--cantidad--input--arrow bi bi-chevron-down" viewBox="0 0 16 16" id="arrowCantidad">
                    <path fill-rule="evenodd" d="M1.646 4.646a.5.5 0 0 1 .708 0L8 10.293l5.646-5.647a.5.5 0 0 1 .708.708l-6 6a.5.5 0 0 1-.708 0l-6-6a.5.5 0 0 1 0-.708z"/>
                </svg>
            </button>
        </div>
        <div class="selected-main__sect--info--lista" id='listaCantidadProducto'>
            <ul class="selected-main__sect--info--lista--ul" id='listaAgregarCantidad-${seleccionado.id}'></ul>
        </div>
        <button class="selected-main__sect--info--add" onclick="agregarProducto(${seleccionado.id}, agregarPorCantidad(${seleccionado.id}))" id="agregarCarrito">
            Agregar al carrito
            <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" class="bi bi-cart2" viewBox="0 0 16 16">
                <path d="M0 2.5A.5.5 0 0 1 .5 2H2a.5.5 0 0 1 .485.379L2.89 4H14.5a.5.5 0 0 1 .485.621l-1.5 6A.5.5 0 0 1 13 11H4a.5.5 0 0 1-.485-.379L1.61 3H.5a.5.5 0 0 1-.5-.5zM3.14 5l1.25 5h8.22l1.25-5H3.14zM5 13a1 1 0 1 0 0 2 1 1 0 0 0 0-2zm-2 1a2 2 0 1 1 4 0 2 2 0 0 1-4 0zm9-1a1 1 0 1 0 0 2 1 1 0 0 0 0-2zm-2 1a2 2 0 1 1 4 0 2 2 0 0 1-4 0z"/>
            </svg>
        </button>
    </div>`
    document.getElementById('productoSeleccionado').innerHTML = contenido
}

const estaEnElCarrito = (id) =>{
    const carrito = importarCarrito ()
    return carrito.some ((elemento) =>elemento.id == id)
}

const agregarProducto = (id, cantidad) =>{
    const carrito = importarCarrito ()
    const productos = cargarProducto()
    if (estaEnElCarrito(id)){
        let posicion = carrito.findIndex((item) => item.id === id)
        carrito[posicion].cantidad += cantidad
    }else{
        const agregado = productos.find((elemento) => elemento.id == id)
        agregado.cantidad = cantidad
        carrito.push(agregado)
    }
    Toastify({
        text: "Guardado en el carrito!",
        duration: 1500,
        gravity: "top",
        position: "right",
        stopOnFocus: false,
        offset: {
            x: 0, // horizontal axis - can be a number or a string indicating unity. eg: '2em'
            y: 70 // vertical axis - can be a number or a string indicating unity. eg: '2em'
          },
        style:{
            cursor: 'default',
            background: "rgba(39, 131, 0, 0.8)",
        },
    }).showToast();
    guardarCarrito(carrito)
    badgeCarrito()
    console.log(agregado.cantidad);
}

renderProduct()