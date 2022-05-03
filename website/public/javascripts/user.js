
// use wow framework
new WOW().init();



function setCookie(cname, cvalue, exdays) {
    const d = new Date();
    d.setTime(d.getTime() + (exdays * 24 * 60 * 60 * 1000));
    let expires = "expires="+d.toUTCString();
    document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
}

function setCookie(cname, cvalue, exdays) {
    const d = new Date();
    d.setTime(d.getTime() + (exdays * 24 * 60 * 60 * 1000));
    let expires = "expires="+d.toUTCString();
    document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
}

  
function getCookie(cname) {
    let name = cname + "=";
    let ca = document.cookie.split(';');
    for(let i = 0; i < ca.length; i++) {
        let c = ca[i];
        while (c.charAt(0) == ' ') {
        c = c.substring(1);
        }
        if (c.indexOf(name) == 0) {
        return c.substring(name.length, c.length);
        }
    }
    return "";
}




// add product
var productId = [];

function addProduct() {

    var data_id = document.querySelector("#detail .dataId");
    
    // setCookie("food_id",data_id.getAttribute('value'),1);
    // var names = [];
    // names[0] = "ma seo trang 1"
    // names[1] = "ma seo trang 2"
    // localStorage.setItem("names", JSON.stringify(names));
    var storedProductsId = localStorage.getItem("productsId") ? JSON.parse(localStorage.getItem("productsId")) : [];
    productId = storedProductsId;

    //...
    var flag = 1;
    for (let index = 0; index < productId.length; index++) {
        if(productId[index] == data_id.getAttribute('value')){
            flag = 0;
        }
    }

    if(flag == 1){
        productId.push(data_id.getAttribute('value'));
        localStorage.setItem("productsId",JSON.stringify(productId));
    }


}



function sendProductsIdToServer() {

    var storedProductsId = localStorage.getItem("productsId") ? JSON.parse(localStorage.getItem("productsId")) : [];
    var input;
    var form = document.querySelector('#sendProductsIdToServer .input');
    

    for (let index = 0; index < storedProductsId.length; index++) {
        var divContainerInput = document.createElement('div');
        input = `<input type="text" value="${storedProductsId[index]}" name="productsId">`;
        divContainerInput.innerHTML = input;
        form.append(divContainerInput);
    }
}

var storedProductsId = JSON.parse(localStorage.getItem("productsId"));
console.log(storedProductsId);


function deleteProduct() {
    var deleteProduct = document.querySelectorAll(".book .menu-products .deleteProduct");

    // console.log(deleteProduct);
    for (let index = 0; index < deleteProduct.length; index++) {
        deleteProduct[index].addEventListener('click',function deletep(){
            var storedProductsId = localStorage.getItem("productsId") ? JSON.parse(localStorage.getItem("productsId")) : [];
            if(storedProductsId.length != 0){
                storedProductsId.splice(index,1);
                localStorage.setItem("productsId",JSON.stringify(storedProductsId));
                window.location.href = '/check-table-status';
            }
        })
        
    }
}
deleteProduct();

// function test() {
//     alert('delete');
// }
// test();

function deleteAllProducts() {
    var url = location.href;
    var temp = url.split('=');
    var data = temp[1];
    if(data){
        if(data == 1){
            localStorage.removeItem("productsId");
        }
    }
}

deleteAllProducts();


