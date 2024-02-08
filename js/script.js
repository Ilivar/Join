const STORAGE_TOKEN = "AA65OLXVENV8TLEMXUEAWFYRV3L5SLIL9GP66L8H";
const STORAGE_URL = "https://remote-storage.developerakademie.org/item";
let value = [];
let key = "users";

let currentUser;
let currentUserData = [];

// Template -> Header Sidebar //

function includeHTML() {
  var z, i, elmnt, file, xhttp;
  /* Loop through a collection of all HTML elements: */
  z = document.getElementsByTagName("*");
  for (i = 0; i < z.length; i++) {
    elmnt = z[i];
    /*search for elements with a certain atrribute:*/
    file = elmnt.getAttribute("w3-include-html");
    if (file) {
      /* Make an HTTP request using the attribute value as the file name: */
      xhttp = new XMLHttpRequest();
      xhttp.onreadystatechange = function () {
        if (this.readyState == 4) {
          if (this.status == 200) {
            elmnt.innerHTML = this.responseText;
          }
          if (this.status == 404) {
            elmnt.innerHTML = "Page not found.";
          }
          /* Remove the attribute, and call this function once more: */
          elmnt.removeAttribute("w3-include-html");
          includeHTML();
        }
      };
      xhttp.open("GET", file, true);
      xhttp.send();
      /* Exit the function: */
      return;
    }
  }
}

async function setItem(key, value) {
  const payload = { key, value, token: STORAGE_TOKEN };
  return fetch(STORAGE_URL, {
    method: "POST",
    body: JSON.stringify(payload),
  }).then((res) => res.json());
}

async function getItem() {
  const url = `${STORAGE_URL}?key=${key}&token=${STORAGE_TOKEN}`;
  return fetch(url).then((res) => res.json());
}

async function loadPreviousMember() {
  let previousMember = await getItem();
  value = JSON.parse(previousMember.data.value);
}

function clearAllMembers() {
  value = [];
  setItem(key, value);
}

async function loadCurrentUser() {
  currentUser = localStorage.getItem("user");
}

async function loadCurrentUserData() {
  loadCurrentUser();
  findUserByEmail(currentUser);
}

async function findUserByEmail(emailToFind) {
  for (let i = 0; i < value.length; i++) {
    if (value[i].email === emailToFind) {
      currentUserData.push(value[i]);
      break;
    }
  }
}
