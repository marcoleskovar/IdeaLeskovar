const productCards = document.querySelector('.productos-main__sect')
const cardCreator = (elementos) =>{
    let cards = ''
    elementos.forEach(producto =>{
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

const btnFiltrar = document.querySelector('.productos-main__filter--min-max--button');
const filtrarPrecio = () => {
    const minPrice = parseInt(document.getElementById('minPrice').value);
    const maxPrice = parseInt(document.getElementById('maxPrice').value);
    const error = document.getElementById('errorFilter');
    let productos = cargarProducto();
    let productosFiltrados;

    if (isNaN(minPrice) && isNaN(maxPrice)){
        error.innerHTML = 'No es válido, reingrese.';
        return;
    }
    if (!isNaN(minPrice) && isNaN(maxPrice)){
        error.innerHTML = '';
        productosFiltrados = productos.filter((producto) => {
          return producto.precio >= minPrice;
        });
    }else if (isNaN(minPrice) && !isNaN(maxPrice)){
        error.innerHTML = '';
        productosFiltrados = productos.filter((producto) => {
            return producto.precio <= maxPrice;
        });
    }else if (minPrice > maxPrice){
        error.innerHTML = 'El precio mínimo no puede ser mayor al precio máximo.';
        return;
    }else{
        productosFiltrados = productos.filter((producto) => {
            error.innerHTML= ''
            return producto.precio >= minPrice && producto.precio <= maxPrice;
        });
    }
    cardCreator(productosFiltrados);
};

const verProducto = (id) =>{
    let traerProducto = cargarProducto()
    let producto = traerProducto.find(item => item.id == id)
    localStorage.setItem('seleccionado', JSON.stringify(producto))
    location.href = '../views/selected_product.html'
}

btnFiltrar.onclick = filtrarPrecio;