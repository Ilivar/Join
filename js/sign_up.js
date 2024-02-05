const STORAGE_TOKEN = "AA65OLXVENV8TLEMXUEAWFYRV3L5SLIL9GP66L8H";
const STORAGE_URL = "https://remote-storage.developerakademie.org/item";
let value = [];
let key = "users";

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

async function createNewMember(event) {
  event.preventDefault();
  let name = document.getElementById("input_name").value;
  let email = document.getElementById("input_mail").value;
  let password = document.getElementById("input_password").value;
  let confirm = document.getElementById("input_confirm").value;

  if (password !== confirm) {
    document
      .getElementById("msg_dont_match")
      .setAttribute("style", "display: block;");
  } else {
    document
      .getElementById("msg_dont_match")
      .setAttribute("style", "display: none;");
    let user = {
      name: name,
      email: email,
      password: password,
    };
    await loadPreviousMember();
    isUserNew(user, email);
  }
}

async function isUserNew(user, email) {
  let emailExists = value.some((existingUser) => existingUser.email === email);
  if (emailExists) {
    document
      .getElementById("already_in_use")
      .setAttribute("style", "display: block;");
  } else {
    value.push(user);
    await setItem(key, value);
    signInSuccess();
  }
}

function signInSuccess() {
  document.getElementById("overlay").style.display = "flex";
  setTimeout(function () {
    window.location.href = "index.html";
  }, 2000);
}

function clearAllMembers() {
  value = [];
  setItem(key, value);
}