
// to hide / show password
var hidy = false;
function toggle() {
    if (hidy) {
        document.getElementById("password").setAttribute("type", "password");
        hidy = false;
    }
    else {
        document.getElementById("password").setAttribute("type", "text");
        hidy = true;
    }
}

document.forms['login-form'].addEventListener('submit', (e) => {
    e.preventDefault()
    let name = document.forms['login-form']["username"]
    let pass = document.forms['login-form']["password"]
    let rememberMe = document.forms['login-form']["remember_me"].checked;
    //get data from session storage
    let client = sessionStorage.getItem("logInUser")
   // let seller = localStorage.getItem("logInSeller")

    let clientData = JSON.parse(client)
    let username = clientData.name;
    let password = clientData.password

    // check if the input values matches the data from local storage if not found then it will re direct to register page
    if(name.value != username){
        confirm("There is no user name with name "+username+", if you dont have a account ,Press okay to create new one.")
    }
    else if(pass.value != password){
        alert("Wrong password. try again")
        pass.value = ""
    }

    else{
        let id =0

        let logInObject={
            id: id++,
            name:username,
            email:clientData.email,
            password:clientData.password,
            type:clientData.type,
            loggedIn: rememberMe

        }
        if(rememberMe){
            sessionStorage.setItem("logInUser", JSON.stringify(logInObject))

        }

        window.location.replace("../../Home.html")
    }
    console.log(username,password)

})
