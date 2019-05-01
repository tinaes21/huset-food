let burgerMenu = document.querySelector("#burgermenu");
let mobileMenu= document.querySelector("#menuMobile");
let crossMenu = document.querySelector("#cross");

burgerMenu.addEventListener("click", openMenu);

function openMenu(){
    mobileMenu.style.display="block";

    crossMenu.addEventListener("click", closeMenu);
}

function closeMenu(){
    mobileMenu.style.display="none";
}
