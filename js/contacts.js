let contacts = [];

function init(){
    includeHTML();
    renderContacts();
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
//   contacts.push(newContact);
  localStorage.setItem("Contact", JSON.stringify(newContact));
  closeAddContact();
}

function renderContacts() {
  
  for (let i = 0; i < contacts.length; i++) {
    let contact = contacts[i];

    document.getElementById("conctactMemberField").innerHTML += /*html*/ `
            <div class="contact">
            ${contact.name}
            ${contact.email}
            ${contact.phone}
            </div>
        `;
  }
}
