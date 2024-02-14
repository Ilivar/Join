let currentDraggedElement;

let todos = [];

let iconColors = [];

function updateToDoArray() {
  todos = value[0].newAddTask;
}


async function init() {
  await loadPreviousMember();
  await loadCurrentUserData();
  includeHTML();
  updateToDoArray();
  updateHTML();
}



function updateHTML() {
  let drag_to_do = todos.filter(t => t['status'] == 'drag_to_do');

  document.getElementById('drag_to_do').innerHTML = '';

  for (let index = 0; index < drag_to_do.length; index++) {
    const element = drag_to_do[index];
    document.getElementById('drag_to_do').innerHTML += generateTodoHTML(element);
  }

 
  let drag_in_progress = todos.filter(t => t['status'] == 'drag_in_progress');

  document.getElementById('drag_in_progress').innerHTML = '';

  for (let index = 0; index < drag_in_progress.length; index++) {
    const element = drag_in_progress[index];
    document.getElementById('drag_in_progress').innerHTML += generateTodoHTML(element);

  }

  let drag_await_feedback = todos.filter(t => t['status'] == 'drag_await_feedback');

  document.getElementById('drag_await_feedback').innerHTML = '';

  for (let index = 0; index < drag_await_feedback.length; index++) {
    const element = drag_await_feedback[index];
    document.getElementById('drag_await_feedback').innerHTML += generateTodoHTML(element);

  }

  let drag_done = todos.filter(t => t['status'] == 'drag_done');

  document.getElementById('drag_done').innerHTML = '';

  for (let index = 0; index < drag_done.length; index++) {
    const element = drag_done[index];
    document.getElementById('drag_done').innerHTML += generateTodoHTML(element);

  }

}



function startDragging(id) {
  currentDraggedElement = id;
}

function generateTodoHTML(element) {
  return /*html*/`
  <div draggable="true" ondragstart="startDragging(${element['id']})">
  <div class="task_content" onclick="openDialog(${element['id']})">

    <div class="card_content">

      <div class="category">${element['category']}</div>

         <div class="title_description">
           <div class="title">${element['title']}</div>
           <div class="description">${element['description']}</div>
         </div>
      <div class="additional-text">

        <div>${element['due_date']}</div>
        <div>${element['prio']}</div>
        <div>${element['assigned_to']}</div>
        <div>${element['subtasks']}</div>

      </div>

        <div class="over_progressbar">
            <div class="progress-bar-container ">
              <div class="progress-bar"></div>
             </div>
                <span class="progressbar_text">1/2 Subtasks</span>
        </div>

                <div class=profile_content>
                     <div class="over_profile_badge">
                           <div class="profile_badge2"><span>AM</span></div>
                           <div class="profile_badge1"><span>EM</span></div>
                           <div class="profile_badge"><span>MB</span></div>
                       </div>

                       <div>
                        <img src="../assets/img/priority_medium.svg" alt="">
                       </div>

                </div>
    </div>
</div>`;
}

function allowDrop(ev) {
  ev.preventDefault();
}

function moveTo(category) {
  todos[currentDraggedElement]['status'] = category;
  updateHTML();
}

function highlight(id) {
  document.getElementById(id).classList.add('drag-area-highlight');
}

function removeHighlight(id) {
  document.getElementById(id).classList.remove('drag-area-highlight');
}


function openDialog(todoIndex) {
  const todo = todos[todoIndex];
  contactsboard = todos[11].assigned_to;

// document.getElementById('member_icons_names').innerHTML = ``;






  
  document.getElementById('todo_HTML').style.display = 'flex';

  document.getElementById('todo_HTML').innerHTML = /*html*/`
    <div class="dialog_content" id="close_dialog">
    
    
      <div class="category_x">
        <div class="category_dialog">${todo['category']}</div>
        <button class="close_button" onclick="closeDialog()"><img src="../assets/img/close.svg" alt=""></button>
      </div>
    
      <div class="title_dialog">${todo['title']}</div>
      <div class="description_dialog">${todo['description']}</div>
    
    
      <div class="date_dialog">${todo['due_date']}</div>
      <div class="prio_dialog">${todo['prio']} Medium
        <div>
          <img src="../assets/img/priority_medium.svg" alt="">
        </div>
      </div>
      <div id="member_icons_names"></div>
    
      
      <div>
          <div>${todo['subtasks']}</div>
          <div class="subtasks_dialog">
            <div class="subtasks_dialog_text">
          <img src="../assets/img/check_button.svg" alt="">Implement Recipe Recommendation 
          </div>
          <div class="subtasks_dialog_text">
          <img src="../assets/img/empty_check_button.svg" alt="">Start page Layout
          </div>
          </div>

          
      </div>

      <div class="dialog_delete_edit">
             <div><img src="../assets/img/property_1=delete.svg" alt="">delete</div>
               <img src="../assets/img/vector_delete_edit.svg" alt="">
             <div><img src="../assets/img/property_1=edit.svg" alt="">edit</div>
      </div>
    </div>
    `;


// Leere zuerst das Element, um sicherzustellen, dass keine vorherigen Inhalte vorhanden sind
document.getElementById('member_icons_names').innerHTML = '';

// Iteriere durch das contactsboard-Array
for (let i = 0; i < contactsboard.length; i++) {
  // Greife auf das aktuelle Element im Array zu
  const contact = contactsboard[i];
  
  // Generiere den HTML-Code für das aktuelle Kontakt-Element
  const contactHTML = `
    <div id="holeContact${i}" class="hole_contact">        
      <div id="name_icon${i}" class="name_icon" style="background-color: ${iconColors[i]}"></div>  
      <div class="contact">
        <h4>${contact.name}</h4>
      </div>
    </div>
  `;
  
  // Füge das generierte HTML dem Element mit der ID 'member_icons_names' hinzu
  document.getElementById('member_icons_names').innerHTML += contactHTML;
}



generateIconColors();
  changeIconColor();
  addNameLetters();
}

function closeDialog() {
  document.getElementById('close_dialog').innerHTML = '';
  document.getElementById('todo_HTML').style.display = 'none';
}

// function delTask() {
//   let task = document.getElementById("details_email").innerHTML;
//   let taskIndex = contacts.findIndex((c) => c.email === contact);
//   contacts.splice(contactIndex, 1);
//   setItem("users", currentUserData);
//   closeEditContact();
//   renderContacts();
//   document.getElementById("details_container").innerHTML = "";
// }

// function editTask() {
//   let contact = document.getElementById("details_email").innerHTML;
//   let contactIndex = contacts.findIndex((c) => c.email === contact);
//   let contactToEdit = contacts[contactIndex];
//   contactToEdit.name = document.getElementById("edit_input_name").value;
//   contactToEdit.email = document.getElementById("edit_input_email").value;
//   contactToEdit.phone = document.getElementById("edit_input_phone").value;
//   document.getElementById("details_container").innerHTML = "";
//   setItem("users", currentUserData);
//   closeEditContact();
//   renderContacts();
// }








function filterTodosTitle() {
  let searchText = document.getElementById('filter_input').value.trim().toLowerCase();

  // Filtern der Todos, deren Titel die ersten drei Buchstaben mit dem Suchtext übereinstimmen
  let filteredTodos = separatedTodo.filter(t => t['title'].toLowerCase().startsWith(searchText));

  // Leeren Sie die Inhalte aller Spalten
  document.getElementById('drag_to_do').innerHTML = '';
  document.getElementById('drag_in_progress').innerHTML = '';
  document.getElementById('drag_await_feedback').innerHTML = '';
  document.getElementById('drag_done').innerHTML = '';

  // Durchlaufen Sie die gefilterten Todos und fügen Sie sie nur in die entsprechende Spalte ein
  for (let index = 0; index < filteredTodos.length; index++) {
    let element = filteredTodos[index];
    if (element.category === 'User Story') {
      document.getElementById('drag_to_do').innerHTML += generateTodoHTML(element);
    } else if (element.category === 'Technical Task') {
      if (element.status === 'drag_in_progress') {
        document.getElementById('drag_in_progress').innerHTML += generateTodoHTML(element);
      } else if (element.status === 'drag_await_feedback') {
        document.getElementById('drag_await_feedback').innerHTML += generateTodoHTML(element);
      } else if (element.status === 'drag_done') {
        document.getElementById('drag_done').innerHTML += generateTodoHTML(element);
      }
    }
  }
}





// async function renderContacts() {
//   contacts = value[0].contacts;
//   document.getElementById("MemberField").innerHTML = "";
//   contacts.sort((a, b) => a.name.localeCompare(b.name));
//   generateIconColors();
//   for (let i = 0; i < contacts.length; i++) {
//     let contact = contacts[i];
//     document.getElementById("MemberField").innerHTML += 
//             <div id="holeContact${i}" class="hole_contact" onclick="changeCheckBox(${i})"> 
//                 <div id="name_icon${i}" class="name_icon" style="background-color: ${iconColors[i]}"></div>  
//                 <div class="contact">
//                     <h4> ${contact.name}</h4>
//                 </div>
//                 <input type="checkbox" id="checkBox${i}">
//             </div>;
//   }
//   changeIconColor();
//   addNameLetters();
// }



function generateIconColors() {
  for (let i = 0; i < contactsboard.length; i++) {
    iconColors.push(`var(--${i + 1})`);
  }
}


function changeIconColor() {
  for (let i = 0; i < contactsboard.length; i++) {
    let icon = document.getElementById("name_icon" + i);
    icon.style.backgroundColor = `var(--${i + 1})`;
  }
}

function addNameLetters() {
  for (let i = 0; i < contactsboard.length; i++) {
    const contact = contactsboard[i];
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

