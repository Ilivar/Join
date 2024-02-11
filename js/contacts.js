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
     <div class= "hole_contact" id="contact_card${i}" onclick="openDetails(${i})"> 
          <div id="name_icon${i}" class="name_icon"></div>  
          <div class="contact">
               <h2 id="piked_name${i}"> ${contact.name}</h2>
                <a id="piked_email${i}"href="#">${contact.email}</a>
                <p id="piked_phone${i}"class="invis">${contact.phone}</p>
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
    icon.style.backgroundColor = `var(--${i + 1})`;
  }
}

function addNameLetters() {
  for (let i = 0; i < contacts.length; i++) {
    const contact = contacts[i];
    const names = contact.name.split(" ");

    let initials = "";

    names.forEach((name) => {
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

function openDetails(i) {
  let currentInfoName = document.getElementById("piked_name" + i).innerHTML;
  let currentInfoEmail = document.getElementById("piked_email" + i).innerHTML;
  let currentInfoPhone = document.getElementById("piked_phone" + i).innerHTML;

  document.getElementById("details_container").innerHTML = /*html*/ `
    <div id="details_name_area">
                  <div id="details_name_icon"></div>
                  <div>
                    <p id="details_name">${currentInfoName}</p>
                    <div id="edit_buttons">
                      <button onclick="openEditContact()" >Edit</button>
                      <button onclick="delContact()">Delete</button>
                    </div>                 
                  </div>
                </div>
                <div id="contact_info">
                  <span>Contact Inforamtion</span>
                  <div id="detail_info">
                    <p>Email</p>
                    <a id="details_email" href="mailto:${currentInfoEmail}">${currentInfoEmail}</a>
                    <p>Phone</p>
                    <a href="tel:${currentInfoPhone}">${currentInfoPhone}</a> 
                  
                  </div>
                </div>
  `;
  changeDetailIconColor(i);
  fillDetailIcon(i);
}

function changeDetailIconColor(i) {
  let currentUserColor = document.getElementById("name_icon" + i).style
    .backgroundColor;
  document.getElementById("details_name_icon").style.backgroundColor =
    currentUserColor;
    document.getElementById("edit_name_icon").style.backgroundColor =
    currentUserColor;
}

function fillDetailIcon(i) {
  let currentUserLetters = document.getElementById("name_icon" + i).innerHTML;
  document.getElementById("details_name_icon").innerHTML = currentUserLetters;
  document.getElementById("edit_name_icon").innerHTML = currentUserLetters;
}

function delContact() {
  let contact = document.getElementById("details_email").innerHTML;
  let contactIndex = contacts.findIndex((c) => c.email === contact);
  contacts.splice(contactIndex, 1);
  setItem("users", currentUserData);
  closeEditContact();
  renderContacts();
  document.getElementById("details_container").innerHTML = "";
}

function editContact() {
  let contact = document.getElementById("details_email").innerHTML;
  let contactIndex = contacts.findIndex((c) => c.email === contact);
  let contactToEdit = contacts[contactIndex];
  contactToEdit.name = document.getElementById("edit_input_name").value;
  contactToEdit.email = document.getElementById("edit_input_email").value;
  contactToEdit.phone = document.getElementById("edit_input_phone").value;
  document.getElementById("details_container").innerHTML = "";
  setItem("users", currentUserData);
  closeEditContact();
  renderContacts();
}
