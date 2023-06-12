const hamburger = document.querySelector (".index-header__div--hamburger")
const supagesList = document.querySelector (".index-header__navbar")

hamburger.onclick = () =>{
    hamburger.classList.toggle('active');
    supagesList.classList.toggle('active')
}

document.querySelectorAll(".index-header__navbar--subpages--list--elements").forEach(n  => n.onclick = () =>{
    hamburger.classList.remove('active')
    supagesList.classList.remove('active')
})