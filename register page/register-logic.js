/*


Bugs and need to improvement

- ClientText and sellerText have bugs
- responsive design 

- validation (fixed)

*/



//let foucsLine = document.querySelector(".selectedOption")

let clientForm = document.forms[0];
let sellerForm = document.forms[1];
// register style animation 

let clientText = document.getElementById("clC");
let sellerText = document.getElementById("slC");


let line = document.getElementById("line")
function expandClientContainer() {
    sellerText.classList.remove("selectedOption")
    clientText.classList.add("selectedOption")


    // remove line 
    
    line.style.right = "45%"
    line.style.left = "15%"

    let sellerContainer = document.querySelector(".sellerReg");
    let clientContainer = document.querySelector(".clientReg");
    sellerContainer.style.cssText =
        `
        opacity: 0;
        visibility: hidden;
        height:0
        transition: opacity 1.2s, height .6s, width 1.2s ease-out ;

    `
    clientContainer.style.cssText = `
        opacity: 1;
        visibility: visible;
        height: 32rem;
        transition: opacity 1.2s,height .6s, width 1.2s ease-out ;
    `

}

function expandSellerContainer() {

    clientText.classList.remove("selectedOption")
    sellerText.classList.add("selectedOption")

    let line = document.getElementById("line")
    line.style.right = "0%"
    line.style.left = "55%"
    // when seller selected the available categories data come from api
    showCatWithData()

    let sellerContainer = document.querySelector(".sellerReg");
    let clientContainer = document.querySelector(".clientReg");

    clientContainer.style.cssText =
        `
        opacity: 0;
        visibility: hidden;
        height: 0;
        transition: opacity 1.2s,height .6s,  width 1.2s ease-in-out ;
    `
    sellerContainer.style.cssText = `
        opacity: 1;
        visibility: visible;
        height: 32rem;
        transition: opacity 1.2s,height .6s,  width 1.2s ease-out ;
    `





}

////////////////////////////////////////////////////////////////////////////////////////////////////////////////

let clientUserName = clientForm["clientName"];
let clientEmail = clientForm["clientEmail"];

// validation function if email and username met the regular expression

function validationChecker(username, email) {

    const nameExp = /^([a-z|A-Z])/ig;
    const emailExp = new RegExp('[a-zA-Z0-9]+@+[a-z]+.com')



    if (nameExp.test(username) === false) {
        alert("User name can't contain number or symbols")
        return false

    }

    else if (emailExp.test(email) === false) {
        alert("Wrong email")
        return false
    }
    else {
        return true

    }

}
//check if password and confirm password inputs are the same and if not return the confirm password to empty string
function passwordValidation(clientConfirmPass, clientPass, targetForm) {

    if (clientConfirmPass === clientPass) {
        return true;
    }

    else {
        alert("Confirm password don't match password")

        clientConfirmPass = targetForm["confirmPassword"].value = "";
        return false;
    }

}
// to create id to client users
function createId() {
    let x = 0;
    return x++;
}

// to create id to sellers 
function createIdForSeller() {
    let x = 0;
    return Math.random();
}


//adding client data to local storage
function pushClientData(val1, val2, val3) {
    let userSchema = {
        id: createId(),
        name: val1,
        email: val2,
        password: val3,
        type: "client",
        loggedIn: true
    }

    sessionStorage.setItem("logInUser", JSON.stringify(userSchema))
    alert("Saved")
}

// adding seller data to local storage
function pushSellerData(val1, val2, val3) {
    let sellerSchema = {
        id: createIdForSeller(),
        name: val1,
        email: val2,
        password: val3,
        type: "seller",
        category: categoryID,
        loggedIn: true
    }

    sessionStorage.setItem("logInSeller", JSON.stringify(sellerSchema))
    alert("Saved")
}
//get data from categories api to the seller selected category

function showCatWithData() {
    let req = new XMLHttpRequest()
    req.open("GET", "https://retail.amit-learning.com/api/categories")

    req.addEventListener("readystatechange", function () {
        if (req.status === 200 && req.readyState === 4) {
            //console.log(req.response)
            let test = JSON.parse(req.response)

            //console.log(test.categories[0].name)

            insertDataToCategoryOption(test.categories)
        }
    })
    req.send()
}


let category = document.getElementById("cat")

// insert categories data to select element
function insertDataToCategoryOption(value) {
    for (let index = 0; index < value.length; index++) {
        category.innerHTML += `<option onclick="getID(${value[index].id})" class="catOption" id="${value[index].id}" value="${value[index].id}"> <span>${value[index].name}</span></option>`
    }



}

// to get categories id from categories select element
let categoryID = 0;
category.addEventListener('change', function (e) {
    categoryID = e.target.value
})
//submit form for clients
clientForm.addEventListener('submit', (e) => {
    e.preventDefault()
    let clientName = clientForm["clientName"]
    let clientemail = clientForm["clientEmail"]
    let clientPassword = clientForm["clientPassword"]
    let clientConfirmPassword = clientForm["confirmPassword"]

    if (validationChecker(clientName.value, clientemail.value) && passwordValidation(clientPassword.value, clientConfirmPassword.value, clientForm)) {

        pushClientData(clientName.value, clientemail.value, clientPassword.value)
       window.location.replace("../Home.html")
    }
})


// submit form for sellers

sellerForm.addEventListener('submit', (e) => {
    e.preventDefault()
    let sellerName = sellerForm["sellerName"]
    let selleremail = sellerForm["sellerEmail"]
    let sellerPassword = sellerForm["sellerPassword"]
    let sellerConfirmPassword = sellerForm["sellerConfirmPassword"]

    if (validationChecker(sellerName.value, selleremail.value) && passwordValidation(sellerPassword.value, sellerConfirmPassword.value, sellerForm)) {

        pushSellerData(sellerName.value, selleremail.value, sellerPassword.value)
    }
})