
function showCartData() {
    let total = 0;
    for (var i = 0; i < localStorage.length; i++) {
        var productData = JSON.parse(localStorage.getItem(localStorage.key(i)))
        console.log(productData)
        var intPrice = parseFloat(productData.productPrice).toFixed(2)
        console.log(typeof intPrice)
        document.getElementById("main").innerHTML += `
     <div class="parentrow">
        <div class="imag">
            <img id ="productImg" src="${productData.productImage}"alt="product">
        </div>
         <div class="col">
            <span class="remove" onclick="localStorage.removeItem('${localStorage.key(i)}'),RemoveItem(this)">Remove Item</span>
            <h3 id = "productTitle">${productData.productName}</h3>
             <div class="row" onclick="change(event.target,this)">
             
                <h4><span id ="productPrice" title="${intPrice}">${intPrice}</span> L.E</h4><!-- id = proID -->
               
                <i  id="increas" class="fa-solid fa-square-plus"></i>
                <input id="quantaty" type="text" value=1 readonly>
                <i id="decreas" class="fa-solid fa-square-minus"></i>
             
            </div>
         </div>
    </div>`
        total = eval(intPrice) + total
    }
    document.getElementById('total').innerHTML = total

}


function change(ele, _this) {
    var plus = _this.getElementsByTagName('i')[0]
    var minus = _this.getElementsByTagName('i')[1]
    var priceTag = _this.getElementsByTagName('span')[0]
    var price = _this.getElementsByTagName('span')[0].title
    var quantitytag = _this.getElementsByTagName('input')[0]
    var quantity = parseInt(quantitytag.value);
    if (ele == plus) {
        increas(priceTag, quantitytag, quantity, price)
    }
    else if (ele == minus) {
        decreas(priceTag, quantitytag, quantity, price)
    }
}

function increas(_priceTag, _quantitytag, _quantity, _price) {
    _quantity++
    _quantitytag.value = _quantity;
    _priceTag.innerHTML = (_price * _quantity).toFixed(2);
    console.log(eval(document.getElementById('total').innerHTML))
    newtotal = eval(document.getElementById('total').innerHTML) + eval(_price)
    document.getElementById('total').innerHTML = newtotal
}

function decreas(_priceTag, _quantitytag, _quantity, _price) {
    if (_quantity > 0) {
        _quantity--;
        _quantitytag.value = _quantity;
        _priceTag.innerHTML = (_price * _quantity).toFixed(2);
        newtotal = eval(document.getElementById('total').innerHTML) - eval(_price)
        document.getElementById('total').innerHTML = newtotal
    }
    else {
        _quantitytag.value = 0;

    }
}

showCartData();

function RemoveItem(ele) {

    ele.parentElement.parentElement.style.display = 'none';
    // var removeditem = (ele.parentElement).getElementById('productPrice').innerHTML;
    var removeditem = (ele.parentElement).children[2].children[0].children[0].innerHTML;
    console.log(removeditem)
    newtotal = eval(document.getElementById('total').innerHTML) - eval(removeditem)
    document.getElementById('total').innerHTML = newtotal
}


