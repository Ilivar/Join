const STORAGE_TOKEN = "AA65OLXVENV8TLEMXUEAWFYRV3L5SLIL9GP66L8H";
const STORAGE_URL = "https://remote-storage.developerakademie.org/item";
let key = [];
let value = [];

async function setItem(key, value) {
  const payload = { key, value, token: STORAGE_TOKEN };
  return fetch(STORAGE_URL, {
    method: "POST",
    body: JSON.stringify(payload),
  }).then((res) => res.json());
}

// async function getItem(key) {
//   const url = `${STORAGE_URL}?key=${key}&token=${STORAGE_TOKEN}`;
//   return fetch(url).then((res) => res.json());
// }

async function getItem(key) {
    const url = `${STORAGE_URL}?key=${key}&token=${STORAGE_TOKEN}`;
    
    try {
      const response = await fetch(url);
      
      if (!response.ok) {
        throw new Error('Fehler beim Abrufen des Werts für den angegebenen Schlüssel');
      }
      
      const data = await response.json();
      return data.value;
    } catch (error) {
      console.error('Fehler:', error);
      return null;
    }
  }
  

function createNewMember() {
  let name = document.getElementById("input_name").value;
  let mail = document.getElementById("input_mail").value;
  let password = document.getElementById("input_password").value;
  let confirm = document.getElementById("input_confirm").value;

  if (password !== confirm) {
    alert("Passwords do not match!");
    return;
  } else {
    value.push(name, mail, password);
    key.push("name", "mail", "password");
  }

  console.log("Keys:", key);
  console.log("Values:", value);
  setItem(key, value);
}
