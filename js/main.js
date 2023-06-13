const hamburger = document.querySelector ('.index-header__right--hamburger')
const supagesList = document.querySelector ('.index-header__navbar')
const subpagesListElements = document.querySelectorAll ('.index-header__navbar--subpages--list--elements')

hamburger.onclick = () =>{
    hamburger.classList.toggle('active');
    supagesList.classList.toggle('active')
}

document.querySelectorAll(".index-header__navbar--subpages--list--elements").forEach(n  => n.onclick = () =>{
    hamburger.classList.remove('active')
    supagesList.classList.remove('active')
})

window.onscroll = () =>{
    const posicionScroll = window.scrollY;
    const metanoiaTexto = document.querySelector('.index-main__div--text');
    const metanoiaMariposa = document.querySelector('.index-main__div--img');
    const velocidadTexto = 0.6;
    const velocidadImagen = 0.1;
    metanoiaTexto.style.transform = `translateY(${posicionScroll * velocidadTexto}px)`;
    metanoiaMariposa.style.transform = `translateY(${posicionScroll * velocidadImagen}px)`;
  };