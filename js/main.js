var prodectName = document.getElementById("proname");
var prodectCategory = document.getElementById("procategory");
var prodectPrice = document.getElementById("proprice");
var prodectDescription = document.getElementById("prodescription");
var addBtn = document.getElementById("addbtn");
var inputs = document.getElementsByClassName("form-control");
var searchInputs = document.getElementById("searchInputs");
var alertMsg = document.getElementById("prodAlertMsg");
var cateAlertMsg = document.getElementById("cateAlertMsg");
var prodectLists;
var currentIndex;

alertMsg.classList.add("d-none");
cateAlertMsg.classList.add("d-none");
priceAlertMsg.classList.add("d-none");

// ---- Start Validation Functions ----

prodectName.onkeyup = function () {
    var rejex = /^[a-zA-Z]{4,10}$/;
    var textInput = rejex.test(prodectName.value);
    if (!textInput) {
        addBtn.disabled = "true";
        prodectName.classList.add("is-invalid");
        prodectName.classList.remove("is-valid");
        alertMsg.classList.remove("d-none");
    }
    else {
        addBtn.removeAttribute("disabled");
        prodectName.classList.add("is-valid");
        prodectName.classList.remove("is-invalid");
        alertMsg.classList.add("d-none");

    }
}

prodectCategory.onkeyup = function () {
    var rejex = /[^(!@#$%^&*()-_=+*/)]/;
    var textInput = rejex.test(prodectCategory.value);
    if (!textInput) {
        addBtn.disabled = "true";
        prodectCategory.classList.add("is-invalid");
        prodectCategory.classList.remove("is-valid");
        cateAlertMsg.classList.remove("d-none");
    }
    else {
        addBtn.removeAttribute("disabled");
        prodectCategory.classList.add("is-valid");
        prodectCategory.classList.remove("is-invalid");
        cateAlertMsg.classList.add("d-none");

    }
}

prodectPrice.onkeyup = function () {
    var rejex = /^[1-9][0-9][0-9][0-9]$/;
    var textInput = rejex.test(prodectPrice.value);
    if (!textInput) {
        addBtn.disabled = "true";
        prodectPrice.classList.add("is-invalid");
        prodectPrice.classList.remove("is-valid");
        priceAlertMsg.classList.remove("d-none");
    }
    else {
        addBtn.removeAttribute("disabled");
        prodectPrice.classList.add("is-valid");
        prodectPrice.classList.remove("is-invalid");
        priceAlertMsg.classList.add("d-none");

    }
}

// ---- End Validation Functions ----

if (localStorage.getItem("prodectsDetalis") == null) {
    var prodectLists = [];

}
else {
    prodectLists = JSON.parse(localStorage.getItem("prodectsDetalis"));
    displayProdects();

}

addBtn.onclick = function () {

    if (addBtn.innerHTML == "Add Prodect") {
        AddProdect();

    }

    else {
        EditProduct();
        addBtn.innerHTML = "Add Prodect";

    }

    localStorage.setItem("prodectsDetalis", JSON.stringify(prodectLists));
    displayProdects();
    clearFiled();

}

function displayProdects() {
    var prodects = "";
    for (var i = 0; i < prodectLists.length; i++) {
        prodects +=
            `<tr>
        <td>${i}</td>
        <td>${prodectLists[i].name}</td>
        <td>${prodectLists[i].categ}</td>
        <td>${prodectLists[i].price}</td>
        <td>${prodectLists[i].descp}</td>
        <td><buttom onclick="update(${i})" class=" btn btn-outline-warning">Update</buttom></td>
        <td><buttom onclick="deleteProdect(${i})" class=" btn btn-outline-danger">Delete</buttom></td>
        </tr>`

    }

    document.getElementById("tablebody").innerHTML = prodects;
}

function clearFiled() {

    for (var i = 0; i < inputs.length; i++) {
        inputs[i].value = "";
    }
}

function checkInputs() {

    for (var i = 0; i < inputs.length; i++) {
        if (inputs[i].value != "") {
            return true;
        }
        else {
            return false;
        }

    }
}

function AddProdect() {
    if (checkInputs() == true) {
        var prodects =
        {
            name: prodectName.value,
            categ: prodectCategory.value,
            price: prodectPrice.value,
            descp: prodectDescription.value
        }
        prodectLists.push(prodects);
        removeValidation();
    }
    else {
        window.alert(' Sorry , All Fields Is Requied ')
    }
}

searchInputs.onkeydown = function () {
    var val = searchInputs.value;
    var prodects = "";

    for (var i = 0; i < prodectLists.length; i++) {
        if (prodectLists[i].name.toLowerCase().includes(val.toLowerCase()) || prodectLists[i].categ.toLowerCase().includes(val.toLowerCase())) {
            prodects +=
                `<tr>
        <td>${i}</td>
        <td>${prodectLists[i].name}</td>
        <td>${prodectLists[i].categ}</td>
        <td>${prodectLists[i].price}</td>
        <td>${prodectLists[i].descp}</td>
        <td><buttom class=" btn btn-outline-warning">Update</buttom></td>
        <td><buttom onclick="deleteProdect(${i})" class=" btn btn-outline-danger">Delete</buttom></td>
        </tr>`
        }
    }

    document.getElementById("tablebody").innerHTML = prodects;
}

function deleteProdect(index) {
    prodectLists.splice(index, 1);
    localStorage.setItem("prodectsDetalis", JSON.stringify(prodectLists));
    displayProdects();

}

function update(index) {
    var currentProdect = prodectLists[index];

    prodectName.value = currentProdect.name;
    prodectCategory.value = currentProdect.categ;
    prodectPrice.value = currentProdect.price;
    prodectDescription.value = currentProdect.descp;
    addBtn.innerHTML = "Edit Prodect";
    currentIndex = index;

}

function EditProduct() {

    if (checkInputs() == true) {
        var prodects =
        {
            name: prodectName.value,
            categ: prodectCategory.value,
            price: prodectPrice.value,
            descp: prodectDescription.value
        }

        prodectLists[currentIndex] = prodects;
    }
    else {
        window.alert(' Sorry , All Fields Is Requied ')
    }


}

function removeValidation() {
    prodectPrice.classList.remove("is-valid");
    prodectCategory.classList.remove("is-valid");
    prodectName.classList.remove("is-valid");
}