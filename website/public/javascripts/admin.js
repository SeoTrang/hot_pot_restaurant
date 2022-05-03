var sidebar_chind = document.querySelectorAll("#sidebar .sidebar-chind");
var sidebar_chind2 ;
var icon_down = document.querySelectorAll("#sidebar .icon-down");
var icon_up = document.querySelectorAll("#sidebar .icon-up");

var icon_down1,icon_up1;
for (let index = 0; index < sidebar_chind.length; index++) {
    sidebar_chind[index].onclick = function show_sidebar_chind2() {
        // console.log(sidebar_chind[index]);
        sidebar_chind2 = sidebar_chind[index].getElementsByTagName("ul")[0];
        icon_down1 = sidebar_chind[index].querySelectorAll("#sidebar .icon-down")[0];
        icon_up1 = sidebar_chind[index].querySelectorAll("#sidebar .icon-up")[0];
        

        icon_down1.style.display = "none";
        icon_up1.style.display = "block";
        sidebar_chind2.style.display = "block";

    }

    // icon_up[index].onclick = function hiden_sidebar_chind2(params) {
    //     sidebar_chind2 = sidebar_chind[index].getElementsByTagName("ul")[0];
    //     // console.log(icon_down);
    //     // console.log(icon_up);
    //     icon_down.style.display = "block";
    //     icon_up.style.display = "none";
    //     sidebar_chind2.style.display = "none";
    // }
    

}

// set color in home admin

var color_home = ['#17a2b8', '#28a745','#ffc107','#dc3545','#007bff','#007bff','#6A5ACD','#FF33FF'];
var element = document.querySelectorAll("#home-admin .content ul li");




// console.log(random, color_home[random]);
console.log(element.length);

for (let index = 0; index < element.length; index++) {
    const random = Math.floor(Math.random() * color_home.length);
    
    console.log(element[index]);
    var color = color_home[random];
    console.log(color);
    element[index].style.backgroundColor = color;
    
}



// set disable chechbox add-new-order page
// function set_disable_Checkbox_Add_NewOrder() {
//     var checkbox_add_new_order = document.querySelectorAll("#add-new-order .check-box1");
//     for (let index = 0; index < checkbox_add_new_order.length; index++) {
//         checkbox_add_new_order[index].checked = true;
//         checkbox_add_new_order[index].disabled = true;
        
//     }
    

// }

// set_disable_Checkbox_Add_NewOrder();


// add new product

// them truong nhap
const ingredients = document.querySelector("#addProduct .ingredients ul");
const add_ingredients =  document.querySelector("#addProduct .ingredients .add-form-input");
// console.log(form_ingredients_li.length)

var ingredients_chind ;

// console.log(add_ingredients);
add_ingredients.addEventListener("click",add_ingredient);

function add_ingredient() {
    
    
    let form_ingredients_li =  document.querySelectorAll("#addProduct .ingredients ul li");
    let len = form_ingredients_li.length + 1;

    // ingredients_chind = '<li>'+
    // '<div class="add-ingredient">'+
    //     '<label for="add-ingredient">Nguyên Liệu '+len+'</label>'+
    //     '<div class="form-input">'+

    //         '<input type="text" placeholder="Nguyên liệu '+len+'.." id="add-ingredient" name="ingredients">'+
    //     '</div>'+
    // '</div>'+

    // '</li>'
    ingredients_chind = document.createElement('li');
    ingredients_chind.innerHTML = `<div class="add-ingredient">
                                        <label for="add-ingredient">Nguyên Liệu ${len}</label>
                                        <div class="form-input">

                                            <input type="text" placeholder="Nguyên liệu ${len}.." id="add-ingredient" name="ingredients">
                                        </div>
                                    </div>`
   
    ingredients.appendChild(ingredients_chind);
    console.log(form_ingredients_li.length)

}


// add form input more info

var more_info = document.querySelector("#addProduct .info-chind ul");

const add_more_info = document.querySelector("#addProduct .more-info .info-chind .add-form-input");
let img_more_info = document.querySelector("#addProduct .info-chind ul li");

var node_img;



function addMoreInfo() {
    node_img = node_img = document.createElement('li');
    node_img.innerHTML = `<div class="add-img-info">
                                <div class="img-frame">
                                    <div class="icon">
                                        <i class="fa-solid fa-cloud-arrow-up"></i>
                                    </div>
                                    <div class="img-chind">
                                        <img src="" alt="">
                                    </div>
                                </div>

                                <div class="upload">
                                    <span>
                                        <label for="img-info">

                                            Chọn ảnh
                                            
                                        </label>
                                        <input type="file" accept="image/*" name="img" id="img-info" multiple>
                                    </span>
                                </div>
                            </div>`;

   
    more_info.appendChild(node_img);
    console.log(node_img)
}

add_more_info.addEventListener("click",addMoreInfo);

