//Boton hamburguesa
const hamburger = document.querySelector ('.index-header__right--hamburger')
const supagesList = document.querySelector ('.index-header__navbar')
const subpagesListElements = document.querySelectorAll ('.index-header__navbar--subpages--list--elements')

hamburger.onclick = () =>{
    hamburger.classList.toggle('active')
    supagesList.classList.toggle('active')
}

document.querySelectorAll(".index-header__navbar--subpages--list--elements").forEach(n  => n.onclick = () =>{
    hamburger.classList.remove('active')
    supagesList.classList.remove('active')
})

//Parallex main-text
window.onscroll = () =>{
    const posicionScroll = window.scrollY
    const metanoiaTexto = document.querySelector('.index-main__div--text')
    const metanoiaMariposa = document.querySelector('.index-main__div--img')
    const velocidadTexto = 0.4
    const velocidadImagen = 0.1
    metanoiaTexto.style.transform = `translateY(${posicionScroll * velocidadTexto}px)`
    metanoiaMariposa.style.transform = `translateY(${posicionScroll * velocidadImagen}px)`
  };

  //Aparece y desaparece logo
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