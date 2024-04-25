//FOR ITEM SELECTING
let add = document.querySelector(".submit");
let input = document.querySelector("#input");
let clear = document.querySelector(".clear");
let parentDiv = document.querySelector(".book-container");
const parentDiv2 = document.querySelector(".book-list");
let aleart = document.querySelector(".aleart");
const form = document.querySelector(".form");
const bookLIst = document.querySelector(".book-list");
const bookName = document.querySelector(".book-name");

let edititem1 = false;
let item = "";
let editElement;
form.addEventListener("submit", addItem);
clear.addEventListener("click", clearItem);
window.addEventListener("DOMContentLoaded", setupItems);

//FOR FUNCTION

function addItem(e) {
  e.preventDefault();

  let value = input.value;
  console.log(value);
  const id = new Date().getTime().toString();

  if (!edititem1 && value !== "") {
    let bookItem = document.createElement("div");
    let bookattri = document.createAttribute("data-id");
    bookattri.value = id;
    bookItem.setAttributeNode(bookattri);
    bookItem.classList.add("book-item");
    bookItem.innerHTML += `<div class="book-name">
        ${input.value}</div>
      <div class="button-container">
        <button class="eddit">
          <i class="fa-regular fa-pen-to-square"></i></button
        ><button class="delete"><i class="fa-solid fa-trash"></i></button>
      </div>
    </div>`;

    let deleteIte = bookItem.querySelector(".delete");
    deleteIte.addEventListener("click", deleteItem);

    let edit = bookItem.querySelector(".eddit");
    edit.addEventListener("click", edititem);
    parentDiv2.appendChild(bookItem);
    displayAert("item added to the list", "succes");
    parentDiv.classList.add("show-container");
    setDefault();
  } else if (value !== "" && edititem1) {
    editElement.innerHTML = value;
    displayAert("value changed", "success");
    setDefault();
    console.log("edditing");
  } else {
    displayAert("please enter value", "red");
  }
}
function edititem(e) {
  const element = e.currentTarget.parentElement.parentElement;
  editElement = e.currentTarget.parentElement.previousElementSibling;
  console.log(editElement);
  input.value = editElement.innerHTML;
  edititem1 = true;
  item = element.dataset.id;
  add.textContent = "edit";
}

//aleart fucntion

function displayAert(text, action) {
  aleart.textContent = text;
  aleart.classList.add(`aleart-${action}`);
  setTimeout(function () {
    aleart.textContent = "";
    aleart.classList.remove(`aleart-${action}`);
  }, 1000);
}

//default fuction

function setDefault() {
  input.value = "";
  edititem1 = false;
  let item = "";
  add.textContent = "submit";
}

// delete button;
function deleteItem(e) {
  const element = e.currentTarget.parentElement.parentElement;
  const id = element.dataset.id;
  parentDiv2.removeChild(element);
  if (parentDiv2.children.length === 0) {
    parentDiv.classList.remove("show-container");
  }
  displayAert("empty list", "red");
  setDefault();
}

//clear item
function clearItem() {
  console.log("hi");
  const items = document.querySelectorAll(".book-item");
  if (items.length > 0) {
    items.forEach((item) => {
      parentDiv2.removeChild(item);
    });
  }
  parentDiv.classList.remove("show-container");
  displayAert("empty list", "red");
  setDefault();
}
