let contacts = [];

async function init() {
  await getCurrentUserNumber();
  await includeHTML();
  await loadPreviousMember();
  await loadCurrentUserData();
  await renderContacts();
  renderCurrentUserDataBlock();
  await renderUserInitial();
  await openBurgerMenu();
  await openBurgerMenuMobile();
}

function openNewContact() {
  document.getElementById("overlayAddContact").style.display = "flex";
  setTimeout(slideIn, 0.1);
}

function closeAddContact() {
  document.getElementById("overlayAddContact").style.display = "none";
  let overlay = document.getElementById("overlay_card_add");
  overlay.style.right = "-100%";
}

function openEditContact() {
  document.getElementById("editContact").style.display = "flex";
  setTimeout(slideInEdit, 0.1);
  fillWithCurrentData();
}

function closeEditContact() {
  document.getElementById("editContact").style.display = "none";
  let overlay = document.getElementById("overlay_card_edit");
  overlay.style.right = "-100%";
}

function fillWithCurrentData() {
  edit_input_name.value = details_name.innerHTML;
  edit_input_email.value = details_email.innerHTML;
  edit_input_phone.value = details_phone.innerHTML;
}

function renderCurrentUserDataBlock() {
  document.getElementById("current_user_name").innerHTML = value[currentUserNumber].name+" (me)";
  document.getElementById("current_unser_email").innerHTML = value[currentUserNumber].email;
}

async function renderContacts() {
  contacts = value[currentUserNumber].contacts;
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

  updateItem("users", currentUserData);
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

function changeTargetOfDetails() {
  if (window.innerWidth < 1000) {
    let detail_info = document.getElementById("right_content");
    detail_info.style.display = "flex";
    detail_info.style.position = "absolute";
    detail_info.style.top = "0";
    detail_info.style.right = "0";
    detail_info.style.width = "300px";
    detail_info.style.zIndex = "100";
  }
}

function openDetails(i) {
  document.getElementById("right_content").style.display = "block";
  let currentInfoName = document.getElementById("piked_name" + i).innerHTML;
  let currentInfoEmail = document.getElementById("piked_email" + i).innerHTML;
  let currentInfoPhone = document.getElementById("piked_phone" + i).innerHTML;
  
  if (window.innerWidth < 1000) {}
  document.getElementById("details_container").innerHTML = /*html*/ `
    <div id="contacts_icon_mobile_block">
    <img id="contacts_icon_mobile" src="../assets/img/Frame 208.svg" alt="">
    <img id="contacts_icon_mobile_arrow" src="../assets/img/arrow-left-line.svg" onclick="closeDetailMobile()" alt="">
    </div>
    <div id="details_name_area">
                  <div id="details_name_icon"></div>
                  <div>
                    <p id="details_name">${currentInfoName}</p>
                    <div id="edit_buttons">
                      <button id="edit_button" onclick="openEditContact()" ><img src="../assets/img/edit.svg" alt="">Edit</button>
                      <button id="del_button" onclick="delContact()"><img src="../assets/img/delete.svg" alt="">Delete</button>
                    </div>                 
                  </div>
                </div>
                <div id="contact_info">
                  <span>Contact Information</span>
                  <div id="detail_info">
                    <p>Email</p>
                    <a id="details_email" href="mailto:${currentInfoEmail}">${currentInfoEmail}</a>
                    <p>Phone</p>
                    <a id="details_phone" href="tel:${currentInfoPhone}">${currentInfoPhone}</a> 
                  
                  </div>
                </div>
  `;
  changeDetailIconColor(i);
  fillDetailIcon(i);
}

function closeDetailMobile() {
  document.getElementById("details_container").innerHTML = "";
  document.getElementById("right_content").style.display = "none";
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
  updateItem("users", currentUserData);
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
  updateItem("users", currentUserData);
  closeEditContact();
  renderContacts();
  closeDetailMobile();
}

function slideIn(){
  let overlay = document.getElementById("overlay_card_add");
  overlay.style.right = "50%";
  overlay.style.transform = "translate(50%, 0%)"
}

function slideInEdit(){
  let overlay = document.getElementById("overlay_card_edit");
  overlay.style.right = "50%";
  overlay.style.transform = "translate(50%, 0%)"
}

function setOverlayPath() {
  var overlayDiv = document.getElementById('overlay_card_add');
  if (window.innerWidth > 1000) {
      overlayDiv.setAttribute('w3-include-html', '../assets/templates/add_contact_overlay.html');
  } else {
      overlayDiv.setAttribute('w3-include-html', '../assets/templates/mobile_add_contact_overlay.html');
  }
}

window.addEventListener('resize', setOverlayPath);
document.addEventListener('DOMContentLoaded', function() {
  setOverlayPath();
});


function setOverlayPathEdit() {
  var overlayDiv = document.getElementById('overlay_card_edit');
  if (window.innerWidth > 1000) {
      overlayDiv.setAttribute('w3-include-html', '../assets/templates/edit_contact.html');
  } else {
      overlayDiv.setAttribute('w3-include-html', '../assets/templates/mobile_edit_contact.html');
  }
}

window.addEventListener('resize', setOverlayPathEdit);
document.addEventListener('DOMContentLoaded', function() {
  setOverlayPathEdit();
});
