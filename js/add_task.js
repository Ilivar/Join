// let contacts = [];
let iconColors = [];

async function init() {
  includeHTML();
  await loadPreviousMember();
  await loadCurrentUserData();
  await renderContacts();
  }
  
  async function renderContacts() {
    contacts = value[0].contacts;
    document.getElementById("MemberField").innerHTML = "";
    contacts.sort((a, b) => a.name.localeCompare(b.name));
    generateIconColors();
    for (let i = 0; i < contacts.length; i++) {
        let contact = contacts[i];
        document.getElementById("MemberField").innerHTML += `
            <div id="holeContact${i}" class="hole_contact" onclick="changeCheckBox(${i})"> 
                <div id="name_icon${i}" class="name_icon" style="background-color: ${iconColors[i]}"></div>  
                <div class="contact">
                    <h4> ${contact.name}</h4>
                </div>
                <input type="checkbox" id="checkBox${i}">
            </div>`;}
    changeIconColor(); 
    addNameLetters();
}

function changeCheckBox(i) {
    if (document.getElementById(`checkBox${i}`).checked == false) { 
        document.getElementById(`checkBox${i}`).checked = true;
        changeColorClickContact(i);
        }
        else {
            document.getElementById(`checkBox${i}`).checked = false;
            document.getElementById(`holeContact${i}`).classList.remove('active_contact');
            document.getElementById(`holeContact${i}`).classList.add('hole_contact');
            }
        renderActiveMemberIcons();
}

function generateIconColors() {
    for (let i = 0; i < contacts.length; i++) {
        iconColors.push(`var(--${i+1})`);
    }
}

function changeColorClickContact(i) {
    if (document.getElementById(`checkBox${i}`).checked = true) {
    document.getElementById(`holeContact${i}`).classList.add('active_contact');
    document.getElementById(`holeContact${i}`).classList.remove('hole_contact');}
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
    
  async function renderActiveMemberIcons() {
    const activeMemberIconsDiv = document.getElementById("aktiveMemberIcons");
    activeMemberIconsDiv.innerHTML = ""; 
    for (let i = 0; i < contacts.length; i++) {
        if (document.getElementById(`checkBox${i}`).checked) {
            const contact = contacts[i];
            const nameIcon = document.getElementById(`name_icon${i}`).innerHTML; 
            const iconColor = iconColors[i]; 
            const activeContactElement = document.createElement('div');
            activeContactElement.innerHTML = `
                <div class="name_icon" style="background-color: ${iconColor}">${nameIcon}</div>
                `;
            activeMemberIconsDiv.appendChild(activeContactElement);
        }
    }
}

document.addEventListener("DOMContentLoaded", function() {
    let acc = document.getElementById('accordion');
    if (acc) {
        acc.addEventListener("click", function() {
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
    var content = element.nextElementSibling;
    if (content.style.display === "block") {
      content.style.display = "none";
    } else {
      content.style.display = "block";
    }
  }

function futureDate() {
    let today = new Date();
    let dd = String(today.getDate()).padStart(2, '0');
    let mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
    let yyyy = today.getFullYear();

    today = yyyy + '-' + mm + '-' + dd;
    document.getElementById("input_date").setAttribute("min", today);
};

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
        if (activeButton === 'buttonUrgent') {
            document.getElementById('buttonUrgent').style.background = "";
            document.getElementById('buttonUrgent').style.color = "";
            document.getElementById('prioImg').src = "../assets/img/Prio up.svg"; 
        } else if (activeButton === 'buttonMedium') {
            document.getElementById('buttonMedium').style.background = "";
            document.getElementById('buttonMedium').style.color = "";
            document.getElementById('mediumImg').src = "../assets/img/Prio media.svg"; 
        } else if (activeButton === 'buttonLow') {
            document.getElementById('buttonLow').style.background = "";
            document.getElementById('buttonLow').style.color = "";
            document.getElementById('lowImg').src = "../assets/img/Prio down.svg"; 
        }
    }
    document.getElementById(buttonId).style.background = bgColor;
    document.getElementById(buttonId).style.color = "white";
    document.getElementById(buttonId).classList.add("active");
    if (imgSrc && buttonId === 'buttonUrgent') {
        document.getElementById('prioImg').src = imgSrc; 
    } else if (imgSrc && buttonId === 'buttonMedium') {
        document.getElementById('mediumImg').src = imgSrc; 
    } else if (imgSrc && buttonId === 'buttonLow') {
        document.getElementById('lowImg').src = imgSrc; 
    }
    activeButton = buttonId;
}

function prioMediumOnLoad() {
    setActiveButton('buttonMedium', '../assets/img/Prio media white.svg', 'orange');
}

function buttonUrgent() {
    setActiveButton('buttonUrgent', "../assets/img/prio alta.svg", "rgba(255, 61, 0, 1)");
}

function buttonMedium() {
    setActiveButton('buttonMedium', "../assets/img/prio media white.svg", "rgba(255, 168, 0, 1)");
}

function buttonLow() {
    setActiveButton('buttonLow', "../assets/img/Prio baja.svg", "rgba(122, 226, 41, 1)");
}

function replaceToTechnicalTask() {
    let heading = document.querySelector('.head_arccordion_category p');
    heading.textContent = "Technical Task";
}

function replaceToUserStory() {
    let heading = document.querySelector('.head_arccordion_category p');
    heading.textContent = "User Story";
}


function addNewAddTask() {
    let title = document.getElementById("input_title").value;
    let description = document.getElementById("description").value;
    let assigned = document.getElementById("input_date").value; //// Nachbessern
    let dueDate = document.getElementById("input_date").value;
    let prio = document.getElementById("input_date").value; /// Nachbessern
    let category = document.getElementById("input_date").value; /// Nachbessern
    let subtasks = document.getElementById("input_date").value; /// Nachbessern

    const newAddTask = {
      title: title,
      description: description,
      assigned: assigned,
      dueDate: dueDate,
      prio: prio,
      category: category,
      subtasks: subtasks,
    };
    addAddTaskToUserData(newAddTask);
  }

  function addAddTaskToUserData(newAddTask) {
    currentUserData[0].newAddTask.push(newAddTask);
  
    setItem("users", currentUserData);
  }

//   function addContactToUserData(newContact) {
//     if (!currentUserData[0].contacts) {
//       currentUserData[0].contacts = [];
//     }
//     currentUserData[0].contacts.push(newContact);
//     setItem("users", currentUserData);
//   }


