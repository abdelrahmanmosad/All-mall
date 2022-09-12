//scroll controller

let progressBar = document.querySelector(".progressBar");
let catContainer = document.querySelector(".categoriesContainer");

window.addEventListener("scroll", (e) => {
  let currentPosition = window.scrollY;
  let valueOfScrolling =
    (currentPosition /
      (document.documentElement.scrollHeight -
        document.documentElement.clientHeight)) *
    100;

  progressBar.style.width = valueOfScrolling + "%";
});


// name of the user
let usernameH1 = document.getElementsByClassName("username")
let c = sessionStorage.getItem("logInUser")
let userName = JSON.parse(c)

for (let index = 0; index < usernameH1.length; index++) {
  usernameH1[index].innerHTML = userName.name
}





//get data from api https://retail.amit-learning.com/api/categories

function showCatWithData() {
  let req = new XMLHttpRequest();
  req.open("GET", "https://retail.amit-learning.com/api/categories");

  req.addEventListener("readystatechange", function () {
    if (req.status === 200 && req.readyState === 4) {
      //console.log(req.response)
      let test = JSON.parse(req.response);

      //console.log(test.categories[0].name)

      insertDataToHtmlBody(test.categories);
    }
  });
  req.send();
}
let categoriesContainer = document.querySelector(".categoriesContainer");
let categoriesBody = document.querySelector(".categoriesUL");

function insertDataToHtmlBody(listOfCategories) {
  // if there is no element inside categories body add the categories from api
  if (!categoriesBody.contains(document.getElementById("1"))) {
    for (let index = 0; index < listOfCategories.length; index++) {
      categoriesContainer.style.display = "flex";

      categoriesContainer.style.opacity = 1;
      categoriesContainer.style.transform = "scale(1)";
      categoriesContainer.style.transition =
        "ease-in-out opacity .6s ease,ease-in-out .6s ease-in-out";

      categoriesBody.innerHTML += `<li onclick="sendIdToProducts(${listOfCategories[index].id})" id="${listOfCategories[index].id}"><a href="#">${listOfCategories[index].name}</a></li>`;
    }
  } else {
    categoriesContainer.style.opacity = 0;
    categoriesContainer.style.transform = "scale(0)";
    categoriesContainer.style.transition =
      "ease-in-out opacity .6s,ease-in-out transform .6s ";
    categoriesBody.innerHTML = "";

    categoriesContainer.style.display = "none";
  }
}

// open and close profile popup contianer
function openProfilePopup() {
  profilePopup.style.opacity = "1";
  profilePopup.style.visibility = "visible";
  profilePopup.style.transition = "opacity .6s ease-in-out";
}
let profilePopup = document.getElementById("cont");
function closeProfilePopup() {
  profilePopup.style.opacity = "0";
  profilePopup.style.visibility = "none";
  profilePopup.style.transition = "opacity .3s ease-in-out";
}

// log out by cleaning the log in session storage
function logOutConfirm() {
  let conf = confirm("Do you want to log-out?");
  if (conf) {
    // get data from the user and edit it to make the loggedIn key = false

    let user = JSON.parse(sessionStorage.getItem("logInUser"))
    let userObj = {
      id: user.id,
      name: user.name,
      email: user.email,
      password: user.password,
      type: "user",
      isLoggedIn: false
    }
    sessionStorage.setItem("logInUser", JSON.stringify(userObj))

    window.location.replace("./Login/Login/logo.html")
  }
}

// send request to get the products from products api to be shown in the body  https://retail.amit-learning.com/api/products
function sendIdToProducts(val) {

  getData(val);
}

/********************************************* */
async function getData(val) {
  try {
    var response = await fetch("https://retail.amit-learning.com/api/products");
    var products = await response.json();
    console.log(products);
    var allProducts = products.products;
    console.log(allProducts);
    document.getElementById(
      "productSpace"
    ).innerHTML += `<div class ="container"> <img class="proImg" src="${allProducts.avatar}" alt="product2" />
        <p class="proName">${allProducts.title}</p>
        <p class="proPrice">${allProducts.price_final} EGP</p>
        <button class="addToCart" onclick = "addToCart()">+ Cart</button></div>`;
    var productOfCategory = allProducts.filter((item) => {
      return item.category_id === val; // elly gy mn category shady
    });
    console.log(productOfCategory);
    var con = (document.getElementById("productSpace").innerHTML = "");
    for (var i = 0; i < productOfCategory.length; i++) {
      document.getElementById(
        "productSpace"
      ).innerHTML += `<div class ="container"> <img class="proImg ${i}" src="${productOfCategory[i].avatar}" alt="product2" />
          <p class="proName ${i}">${productOfCategory[i].title}</p>
          <p class="proPrice ${i}">${productOfCategory[i].price_final} EGP</p>
          <button class="addToCart ${i}" onclick = "addToCart(${i})">+ Cart</button></div>`;
    }
  } catch (e) {


    console.log(e);
  }
}
async function catData(val) {
  try {
    var response = await fetch("https://retail.amit-learning.com/api/products");
    var products = await response.json();
    console.log(products);
    var allProducts = products.products;
    console.log(allProducts);
    for (var j = 0; j < allProducts.length; j++) {
      document.getElementById(
        "productSpace"
      ).innerHTML += `<div class ="container"> <img class="proImg ${j}" src="${allProducts[j].avatar}" alt="product2" />
        <p class="proName ${j}">${allProducts[j].title}</p>
        <p class="proPrice ${j}">${allProducts[j].price_final} EGP</p>
        <button class="addToCart ${j}" onclick = "addToCart(${j})">+ Cart</button></div>`;
    }
  } catch (e) {
    console.log(e);
  }
}
catData()
var cartItems = document.getElementById("noOfItems");
cartItems.value = localStorage.length;

function addToCart(evt) {

  var cartItemQuatntity = parseInt(cartItems.value);
  cartItemQuatntity++;
  cartItems.value = localStorage.length + 1;
  var x = document.getElementsByClassName(evt);
  console.log(x)
  let productObject = {
    productImage: x[0].src,
    productName: x[1].innerHTML,
    productPrice: x[2].innerHTML
  }
  var k = Math.random()
  localStorage.setItem(`Product${k}`, JSON.stringify(productObject))
  // document.querySelector('.addToCart').setAttribute("style","pointer-events: none;")
  // document.querySelectorAll('.addToCart')[0].style.pointerevents='none';

  //    pointer-events: none;


}
