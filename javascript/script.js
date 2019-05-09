let burgerMenu = document.querySelector("#burgermenu");
let mobileMenu= document.querySelector("#menuMobile");
let crossMenu = document.querySelector(".cross");
let modal = document.querySelector("#modal");


burgerMenu.addEventListener("click", openMenu);

function openMenu(){
    mobileMenu.style.display="block";

    crossMenu.addEventListener("click", closeMenu);
}

function closeMenu(){
    mobileMenu.style.display="none";
}

//the fetching of data
let myLink = "http://paulamazik.com/wpv1/huset/wp-json/wp/v2/food?_embed";
const body = document.querySelector(".wrap");
const template = document.querySelector("template").content;


//menu by categories
let catLink = "http://paulamazik.com/wpv1/huset/wp-json/wp/v2/";

/*///fetch from the link
function loadCat(link){
    fetch(link + "categories").then(e=>e.json()).then(data => makeCatMenu(data));
}


//for each category fetched => create new a in html + add menu name + add href to the a element + add a element to menubar (nav)
function makeCatMenu(data){
    data.forEach( cat => {
         const newElement = document.createElement("a");
        newElement.textContent=cat.name;
        newElement.href="index.html?cat="+cat.id;
        menu.appendChild(newElement);
    })
}

//get one "parameter" from the link in searchbar (here search for the cat)
const urlParams = new URLSearchParams(window.location.search);
const catID = urlParams.get("cat");
console.log(catID); //display the category id

loadCat(catLink); //run the funtcion

//if a specific category is selected
if(catID){
    loadByCat(catID);
}
else{
    loadAll(myLink);
}

//take the baselink (catLink here) and add parameters to url to get the categories + embed to display data
function loadByCat(cat){
    fetch(catLink + "food?categories=" + cat + "&_embed").then(e =>e.json()).then(data =>showAll(data));
}*/

function loadAll(link){
    fetch(link).then(e =>e.json()).then(data =>showAll(data));
}

//display (many) data using the template
function showAll(data){
    data.forEach(post => {

    //cloning template
    const clone = template.cloneNode(true);
    const h1 = clone.querySelector("h1");
    const img = clone.querySelector(".foodpic");

    h1.textContent = post.food_title;
    img.src = post._embedded["wp:featuredmedia"][0].media_details.sizes.large.source_url;
    img.classList.add("pointer");

img.addEventListener("click", () => {
    fetch(catLink + "food/" + post.id + "?_embed").then(e=>e.json()).then(data => (showDetails(data)));
});
        //append to dom
    body.appendChild(clone);

    })
}

loadAll(myLink);

function showDetails(post) {
    modal.querySelector("h1").textContent = post.food_title;
    modal.querySelector("#pic").src=post._embedded["wp:featuredmedia"][0].media_details.sizes.large.source_url;
    modal.querySelector("#date").textContent=post.food_event_date;
    modal.querySelector("#ticket").textContent=post.food_event_ticket_price + " DKK";
    modal.querySelector("#description").innerHTML=post.content.rendered;

    modal.classList.remove("hide");


}

modal.querySelector(".cross").addEventListener("click", function (){
    modal.classList.add("hide");
})
