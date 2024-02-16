let iconColors = [];
let newAddTask = [];



async function init() {
  await includeHTML();
  await loadPreviousMember();
  await loadCurrentUserData();
  await renderContacts();
  includeHTML();
  prioMediumOnLoad();
  futureDate();
  renderUserInitial();
}

async function renderContacts() {
  contacts = value[0].contacts;
  document.getElementById("MemberField").innerHTML = "";
  contacts.sort((a, b) => a.name.localeCompare(b.name));
  generateIconColors();
  for (let i = 0; i < contacts.length; i++) {
    let contact = contacts[i];
    document.getElementById('MemberField').innerHTML += `
            <div id="holeContact${i}" class="hole_contact" onclick="changeCheckBox(${i})"> 
                <div id="name_icon${i}" class="name_icon" style="background-color: ${iconColors[i]}"></div>  
                <div class="contact">
                    <h4> ${contact.name}</h4>
                </div>
                <input type="checkbox" id="checkBox${i}">
            </div>`;
  }
  changeIconColor();
  addNameLetters();
}

function filterContacts() {
  let searchField = document.getElementById('searchField');
  let filter = searchField.value.toUpperCase();
  let contactsDiv = document.getElementById('MemberField');
  let contacts = contactsDiv.getElementsByClassName('hole_contact');

  for (let i = 0; i < contacts.length; i++) {
    let contactName = contacts[i].getElementsByTagName('h4')[0];
    if (contactName) {
      let txtValue = contactName.textContent || contactName.innerText;
      if (txtValue.toUpperCase().indexOf(filter) > -1) {
        contacts[i].style.display = "";
      } else {
        contacts[i].style.display = "none";
      }
    }
  }
}

function changeCheckBox(i) {
  if (document.getElementById(`checkBox${i}`).checked == false) {
    document.getElementById(`checkBox${i}`).checked = true;
    changeColorClickContact(i);
  } else {
    document.getElementById(`checkBox${i}`).checked = false;
    document
      .getElementById(`holeContact${i}`)
      .classList.remove("active_contact");
    document.getElementById(`holeContact${i}`).classList.add("hole_contact");
  }
  renderActiveMemberIcons();
}

function generateIconColors() {
  for (let i = 0; i < contacts.length; i++) {
    iconColors.push(`var(--${i + 1})`);
  }
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

function changeColorClickContact(i) {
  if ((document.getElementById(`checkBox${i}`).checked = true)) {
    document.getElementById(`holeContact${i}`).classList.add("active_contact");
    document.getElementById(`holeContact${i}`).classList.remove("hole_contact");
  }
}

async function renderActiveMemberIcons() {
  const activeMemberIconsDiv = document.getElementById("aktiveMemberIcons");
  if (!activeMemberIconsDiv) {
    console.error("später abchecken - aber funcktioniert erstmal");
    return; // Beende die Funktion, wenn das Element nicht gefunden wurde
  }
  activeMemberIconsDiv.innerHTML = "";
  const selectedContacts = [];

  for (let i = 0; i < contacts.length; i++) {
    if (document.getElementById(`checkBox${i}`).checked) {
      const contact = contacts[i];
      
      // Überprüfe, ob der Kontakt bereits im Array enthalten ist
      if (!selectedContacts.includes(contact)) {
        const nameIcon = document.getElementById(`name_icon${i}`).innerHTML;
        const iconColor = iconColors[i];
        const activeContactElement = document.createElement("div");
        activeContactElement.innerHTML = `
                    <div class="name_icon" style="background-color: ${iconColor}">${nameIcon}</div>
                    `;
        activeMemberIconsDiv.appendChild(activeContactElement);
        selectedContacts.push(contact); 
      }
    }
  }   
  return selectedContacts;
}


document.addEventListener("DOMContentLoaded", function () {
  let acc = document.getElementById("accordion");
  if (acc) {
    acc.addEventListener("click", function () {
      this.classList.toggle("active");
      let panel = this.nextElementSibling;
      if (panel.style.display === "block") {
        panel.style.display = "none";
      } else {
        panel.style.display = "block";
      }
    });
  }
});

function toggleAccordion(element) {
  let content = element.nextElementSibling;
  if (content.style.display === "block") {
    content.style.display = "none";
  } else {
    content.style.display = "block";
  }
}

function futureDate() {
  let today = new Date();
  let dd = String(today.getDate()).padStart(2, "0");
  let mm = String(today.getMonth() + 1).padStart(2, "0"); //January is 0!
  let yyyy = today.getFullYear();

  today = yyyy + "-" + mm + "-" + dd;
  document.getElementById("input_date").setAttribute("min", today);
}

// für später

// function checkFutureDate() {
//     let inputDate = document.getElementById('input_date').value;
//     let currentDate = new Date();
//     let inputDateArray = inputDate.split('/');
//     let inputDateObject = new Date(inputDateArray[2], inputDateArray[1] - 1, inputDateArray[0]);

//     if (inputDateObject > currentDate) {
//         alert('Das eingegebene Datum liegt in der Zukunft!');
//     } else {
//         alert('Das eingegebene Datum liegt nicht in der Zukunft.');
//     }
// }

let activeButton = null;

function setActiveButton(buttonId, imgSrc, bgColor) {
  if (activeButton) {
    document.getElementById(activeButton).style.background = "";
    document.getElementById(activeButton).style.color = "";
    document.getElementById(activeButton).classList.remove("active");
    if (activeButton === "buttonUrgent") {
      document.getElementById("buttonUrgent").style.background = "";
      document.getElementById("buttonUrgent").style.color = "";
      document.getElementById("prioImg").src = "../assets/img/Prio up.svg";
    } else if (activeButton === "buttonMedium") {
      document.getElementById("buttonMedium").style.background = "";
      document.getElementById("buttonMedium").style.color = "";
      document.getElementById("mediumImg").src = "../assets/img/Prio media.svg";
    } else if (activeButton === "buttonLow") {
      document.getElementById("buttonLow").style.background = "";
      document.getElementById("buttonLow").style.color = "";
      document.getElementById("lowImg").src = "../assets/img/Prio down.svg";
    }
  }
  document.getElementById(buttonId).style.background = bgColor;
  document.getElementById(buttonId).style.color = "white";
  document.getElementById(buttonId).classList.add("active");
  if (imgSrc && buttonId === "buttonUrgent") {
    document.getElementById("prioImg").src = imgSrc;
  } else if (imgSrc && buttonId === "buttonMedium") {
    document.getElementById("mediumImg").src = imgSrc;
  } else if (imgSrc && buttonId === "buttonLow") {
    document.getElementById("lowImg").src = imgSrc;
  }
  activeButton = buttonId;
}

function prioMediumOnLoad() {
  setActiveButton(
    "buttonMedium",
    "../assets/img/Prio media white.svg",
    "orange"
  );
}

function buttonUrgent() {
  setActiveButton(
    "buttonUrgent",
    "../assets/img/prio alta.svg",
    "rgba(255, 61, 0, 1)"
  );
}

function buttonMedium() {
  setActiveButton(
    "buttonMedium",
    "../assets/img/prio media white.svg",
    "rgba(255, 168, 0, 1)"
  );
}

function buttonLow() {
  setActiveButton(
    "buttonLow",
    "../assets/img/Prio baja.svg",
    "rgba(122, 226, 41, 1)"
  );
}

function replaceToTechnicalTask() {
  let heading = document.querySelector(".head_arccordion_category p");
  heading.textContent = "Technical Task";
}

function replaceToUserStory() {
  let heading = document.querySelector(".head_arccordion_category p");
  heading.textContent = "User Story";
}

let taskId = -1;

async function addNewAddTask() {
  const selectedContacts = await renderActiveMemberIcons();
  let button  = activeButton.replace("button", "");
  let title = document.getElementById("input_title").value;
  let description = document.getElementById("description").value;
  let assigned = selectedContacts;
  let dueDate = document.getElementById("input_date").value;
  let prio = button;
  let category = document.getElementById('user_category').innerHTML;
  let subtasks = inputValues; 
  let status = "drag_to_do";

  const newAddTask = {
    id: taskId,
    title: title,
    description: description,
    assigned_to: assigned,
    due_date: dueDate,
    prio: prio,
    category: category,
    subtasks: subtasks,
    status: status,
  };

  try {
    let latestEntry = currentUserData[0].newAddTask[currentUserData[0].newAddTask.length-1].id;
    taskId = latestEntry;
    addAddTaskToUserData(newAddTask);
  } catch (error) {
    addAddTaskToUserData(newAddTask);
  }

  // addAddTaskToUserData(newAddTask);
}

function addAddTaskToUserData(newAddTask) {
  if (!currentUserData[0].newAddTask) {
    currentUserData[0].newAddTask = []; // Wenn newAddTask noch nicht existiert, erstelle ein neues Array
  }
  newAddTask.id = taskId+1;
  currentUserData[0].newAddTask.push(newAddTask);
  setItem("users", currentUserData);
}

function clickInputSubTask() {
  document.getElementById("sub_task_image_area").innerHTML = `
    <img src="../assets/img/close.svg" onclick="closeInputSubTask()">
    <img src="../assets/img/check.svg" onclick="checkInputSubTask()">`;
}

function closeInputSubTask() {
  document.getElementById("input_subtask").value = ``;
}

let inputValues = []; // Leeres Array zum Speichern der Werte

function checkInputSubTask() {
  let input = document.getElementById("input_subtask").value;
  let i = inputValues.length + 1;

  // Füge den eingegebenen Wert dem Array hinzu
  inputValues.push(input);

  // Erstelle ein div-Element als Container für das Listenelement und das Bild
  let container = document.createElement('div');
  container.classList.add('subtask_area'); // Füge der Klasse hinzu
  
  let listItem = document.createElement('li');
  listItem.classList.add('list_subtask');
  listItem.id = `sub_task${i}`;
  listItem.textContent = input;
  listItem.onclick = function() {
    editSubTask(`sub_task${i}`);
  };

  let deleteIcon = document.createElement('img');
  deleteIcon.src = "../assets/img/delete.svg";
  deleteIcon.onclick = function() {
    deleteSubTask(`sub_task${i}`);
  };

  container.appendChild(listItem);
  container.appendChild(deleteIcon);

  document.getElementById("sub_task_listelements").appendChild(container);
}

function editSubTask(id) {
  let listItem = document.getElementById(id);
  let index = parseInt(id.replace('sub_task', '')) - 1;
  let newValue = prompt("Bearbeite die Teilaufgabe:", listItem.textContent);
  
  if (newValue) {
      listItem.textContent = newValue;
      inputValues[index] = newValue; // Aktualisiere den Wert im Array
  }
}

function deleteSubTask(id) {
  let listItem = document.getElementById(id);
  let index = parseInt(id.replace('sub_task', '')) - 1;
  console.log("Index zu löschenden Elements:", index);
  console.log("Zu löschender Wert:", inputValues[index]);

  listItem.parentNode.remove(); // Lösche den übergeordneten Container
  inputValues.splice(index, 1); // Entferne den Wert aus dem Array
  console.log("Array nach Löschen:", inputValues);

  // Leere die aktuelle Liste
  document.getElementById("sub_task_listelements").innerHTML = '';

  // Rendere die Liste neu basierend auf den aktuellen inputValues
  inputValues.forEach((value, idx) => {
    let itemId = `sub_task${idx + 1}`;
    let container = document.createElement('div');
    container.classList.add('subtask_area');

    let listItem = document.createElement('li');
    listItem.classList.add('list_subtask');
    listItem.id = itemId;
    listItem.textContent = value;
    listItem.onclick = function() {
      editSubTask(itemId);
    };

    let deleteIcon = document.createElement('img');
    deleteIcon.src = "../assets/img/delete.svg";
    deleteIcon.onclick = function() {
      deleteSubTask(itemId);
    };

    container.appendChild(listItem);
    container.appendChild(deleteIcon);
    document.getElementById("sub_task_listelements").appendChild(container);
  });
}







