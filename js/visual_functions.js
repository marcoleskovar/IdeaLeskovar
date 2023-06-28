const hamburger = document.querySelector ('.index-header__right--hamburger')
const navbar = document.querySelector ('.index-header__navbar')
const subpagesListElements = document.querySelectorAll ('.index-header__navbar--subpages--list--elements')

hamburger.onclick = () =>{
    hamburger.classList.toggle('active')
    navbar.classList.toggle('active')
}
subpagesListElements.forEach( n =>{
    n.onclick = () =>{
        hamburger.classList.remove('active')
        navbar.classList.remove('active')
    }
})