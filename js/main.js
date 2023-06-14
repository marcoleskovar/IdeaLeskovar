//Boton hamburguesa
const hamburger = document.querySelector ('.index-header__right--hamburger')
const navbar = document.querySelector ('.index-header__navbar')
const subpagesListElements = document.querySelectorAll ('.index-header__navbar--subpages--list--elements')

hamburger.onclick = () =>{
    hamburger.classList.toggle('active')
    navbar.classList.toggle('active')
}
    subpagesListElements.forEach(n  => {
    n.onclick = () =>{
        hamburger.classList.remove('active')
        navbar.classList.remove('active')
    }
})

//EVENTOS DEL SCROLL

//Parallex main-text || Subpages cambiacolor
window.onscroll = () =>{
    const posicionScroll = window.scrollY
    const metanoiaTexto = document.querySelector('.index-main__div--text')
    const metanoiaMariposa = document.querySelector('.index-main__div--img')
    const velocidadTexto = 0.4
    const velocidadImagen = 0.1
    metanoiaTexto.style.transform = `translateY(${posicionScroll * velocidadTexto}px)`
    metanoiaMariposa.style.transform = `translateY(${posicionScroll * velocidadImagen}px)`
  };

//Header appear
  let logoEsVisible = false
  window.addEventListener('scroll', ()=>{
    let divLogoHeader = document.getElementById ('divLogoHeader')
    let logoHeader = document.getElementById ('logoHeader')
    let scroll = window.scrollY
    if (scroll >= 630 && !logoEsVisible){
        divLogoHeader.classList.add('appear')
        logoHeader.classList.add('appear')
        logoEsVisible = true
    }else if (scroll < 630 && logoEsVisible){
        divLogoHeader.classList.remove('appear')
        logoHeader.classList.remove('appear')
        logoEsVisible = false
    }
  })