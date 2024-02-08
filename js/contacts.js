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


async function renderContacts() {
  contacts = value[0].contacts;
  document.getElementById("conctactMemberField").innerHTML = "";
  contacts.sort((a, b) => a.name.localeCompare(b.name));

  let currentLetter = "";
  let contactHTML = "";

  for (let i = 0; i < contacts.length; i++) {
    let contact = contacts[i];
    let firstLetter = contact.name.charAt(0).toUpperCase();

    if (firstLetter !== currentLetter) {
      if (contactHTML !== "") {
        document.getElementById("conctactMemberField").innerHTML += contactHTML;
      }
      contactHTML = `<div class="contact-group">
                        <h2>${firstLetter}</h2>
                          <img src="../assets/img/seperater_contacts.svg" alt="">
                        <div class="contact">`;
      currentLetter = firstLetter;
    }

    contactHTML += `
     <div class= "hole_contact"> 
          <div id="name_icon${i}" class="name_icon"></div>  
          <div class="contact">
               <h2> ${contact.name}</h2>
                <a href="#">${contact.email}</a>
          </div>
      </div>
        `;
  }

  if (contactHTML !== "") {
    document.getElementById("conctactMemberField").innerHTML +=
      contactHTML + `</div></div>`;
  }
  changeIconColor();
  addNameLetters();
}

function changeIconColor() {
  for (let i = 0; i < contacts.length; i++) {
    let icon = document.getElementById("name_icon" + i);
    icon.style.backgroundColor = `var(--${i+1})`;
  }
}

function addNameLetters() {
  for (let i = 0; i < contacts.length; i++) {
    const contact = contacts[i];
    const names = contact.name.split(" ");

    let initials = "";

    names.forEach(name => {
      initials += name.charAt(0).toUpperCase();
    });

    const nameIconElement = document.getElementById("name_icon" + i);
    if (nameIconElement) {
      nameIconElement.innerHTML = initials;
    }
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
