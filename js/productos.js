let productos = []
const spinner = document.getElementById(`spinnerContainer`)
fetch("../js/products.json")
    .then((response) => response.json())
    .then(data => {
        productos = data
        spinner.style.display='flex'
        setTimeout(() =>{
            spinner.style.display='none'
        },1000)
        cardCreator(productos);
        guardarProducto()
    })
    .catch((error) =>{
        console.log(error);
        spinner.style.display='flex'
    });