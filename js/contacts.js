let contacts = [];

async function init() {
  includeHTML();
  await loadPreviousMember();
  await loadCurrentUserData();
  await renderContacts();
}

function openNewContact() {
  document.getElementById("overlayAddContact").style.display = "flex";
}

function closeAddContact() {
  document.getElementById("overlayAddContact").style.display = "none";
}

function openEditContact() {
  document.getElementById("editContact").style.display = "flex";
}

function closeEditContact() {
  document.getElementById("editContact").style.display = "none";
}

function addNewContact() {
  let name = document.getElementById("input_name").value;
  let email = document.getElementById("input_email").value;
  let phone = document.getElementById("input_phone").value;

  const newContact = {
    name: name,
    email: email,
    phone: phone,
  };
  addContactToUserData(newContact);
  closeAddContact();
  renderContacts();
}

// function renderContacts() {

//   for (let i = 0; i < contacts.length; i++) {
//     let contact = contacts[i];

//     document.getElementById("conctactMemberField").innerHTML += /*html*/ `
//             <div class="contact">
//             ${contact.name}
//             ${contact.email}
//             ${contact.phone}
//             </div>
//         `;
//   }
// }

async function renderContacts() {
  contacts = value[0].contacts;
  document.getElementById("conctactMemberField").innerHTML = "";
  contacts.sort((a, b) => a.name.localeCompare(b.name));

  let currentLetter = "";
  let contactHTML = "";

  for (let i = 0; i < contacts.length; i++) {
    let contact = contacts[i];
    let firstLetter = contact.name.charAt(0).toUpperCase();

    // Überprüfe, ob ein neuer Buchstabe erreicht wurde
    if (firstLetter !== currentLetter) {
      // Wenn ja, füge einen neuen Container für den Buchstaben hinzu
      if (contactHTML !== "") {
        document.getElementById("conctactMemberField").innerHTML += contactHTML;
      }
      contactHTML = `<div class="contact-group">
                        <h2>${firstLetter}</h2>
                          <img src="../assets/img/seperater_contacts.svg" alt="">
                        <div class="contact">`;
      currentLetter = firstLetter;
    }

    // Füge den Kontakt zum aktuellen Container hinzu
    contactHTML += `
     <div class= "hole_contact"> 
            
          <div class="contact">
               <h3> ${contact.name}</h3>
                <a href="#">${contact.email}</a>
          </div>
      </div>
        `;
  }

  // Füge den letzten Container hinzu
  if (contactHTML !== "") {
    document.getElementById("conctactMemberField").innerHTML +=
      contactHTML + `</div></div>`;
  }
}

function addContactToUserData(newContact) {
  if (!currentUserData[0].contacts) {
    currentUserData[0].contacts = [];
  }

  currentUserData[0].contacts.push(newContact);

  setItem("users", currentUserData);
}

function addNewContact() {
  let name = document.getElementById("input_name").value;
  let email = document.getElementById("input_email").value;
  let phone = document.getElementById("input_phone").value;

  const newContact = {
    name: name,
    email: email,
    phone: phone,
  };
  addContactToUserData(newContact);
  closeAddContact();
  renderContacts();
}
