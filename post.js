let newEntries = [];

function readInputs() {
  let newEntry = {
    title: titlePost.value,
    city: cityPost.value,
    country: countryPost.value,
    date: datePost.value,
    description: descriptionNewPost.value,
  };
  newEntries.push(newEntry);
  document.forms[0].reset();
}

function fillList() {
  let lis = "";
  for (let i = 0; i < newEntries.length; i++) {
    // Deconstruct object inside the i position of the array.
    const { title, city, country, date, description } = newEntries[i];
    lis += `<li>${title}, ${city}, ${country}, ${date}, ${description}<button data-pos="${i}">Delete</button><button data-pos="${i}">Edit</button>`;
  }

  newEntriesList.innerHTML = lis;
}

function save() {
  const newPost = JSON.stringify(newEntries);
  localStorage.setItem("newPost", newPost);
}

function load() {
  const newPost = localStorage.getItem("newPost");
  newEntries = JSON.parse(newPost);
}

const titlePost = document.querySelector("#titlePost");
const cityPost = document.querySelector("#cityPost");
const countryPost = document.querySelector("#countryPost");
const datePost = document.querySelector("#datePost");
const descriptionNewPost = document.querySelector("#descriptionNewPost");
const newEntriesList = document.querySelector("#newEntriesList");
const submitPost = document.querySelector("#submitPost");
const cancelPost = document.querySelector("#cancelPost");

submitPost.addEventListener("click", function () {
  readInputs();
  fillList();
  save();
});

cancelPost.addEventListener("click", document.forms[0].reset());

newEntriesList.addEventListener("click", function (event) {
  if (event.target.tagName !== "BUTTON") {
    return;
  }

  const button = event.target;
  const index = button.dataset.pos;

  if (button.textContent === "Delete") {
    const result = confirm("Really?");
    if (result) {
      newEntries.splice(index, 1);
    }
  } else if (button.textContent === "Edit") {
    newEntriesList.contentEditable = true;
  } /* else if (button.textContent === "Submit") {
    confirm("Really?");
  } */

  fillList();
  save();
});

load();
fillList();
