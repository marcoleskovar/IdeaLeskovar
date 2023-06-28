window.onscroll = () =>{
    const posicionScroll = window.scrollY
    const metanoiaTexto = document.querySelector('.index-main__div--text')
    const metanoiaMariposa = document.querySelector('.index-main__div--img')
    const velocidadTexto = 0.4
    const velocidadImagen = 0.1
    metanoiaTexto.style.transform = `translateY(${posicionScroll * velocidadTexto}px)`
    metanoiaMariposa.style.transform = `translateY(${posicionScroll * velocidadImagen}px)`
};

let logoEsVisible = false
window.addEventListener('scroll', ()=>{
    const divLogoHeader = document.getElementById ('divLogoHeader')
    const logoHeader = document.getElementById ('logoHeader')
    const scroll = window.scrollY
    if(location.pathname.endsWith('/index.html')){
        if (scroll >= 630 && !logoEsVisible){
            divLogoHeader.style.transition = 'all 0.7s'
            logoHeader.style.transition = 'all 0.4s'
            divLogoHeader.classList.add('appear')
            logoHeader.classList.add('appear')
            logoEsVisible = true
        }else if (scroll < 630 && logoEsVisible){
            divLogoHeader.classList.remove('appear')
            logoHeader.classList.remove('appear')
            logoEsVisible = false
        }
    }
})