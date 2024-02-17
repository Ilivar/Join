let currentDraggedElement;
let currentStatusValue;

let todos = [];

let iconColors = [];

function updateToDoArray() {
  todos = value[0].newAddTask;
}

async function init() {
  await includeHTML();
  await loadPreviousMember();
  await loadCurrentUserData();
  updateToDoArray();
  updateHTML();
  renderUserInitial();
}

function openAddTask() {
  document.getElementById("overlayAddTask").style.display = "flex";
}

function updateHTML() {
  // Definiere alle "drag" Spalten
  const dragColumns = ["drag_to_do", "drag_in_progress", "drag_await_feedback", "drag_done"];

  // Iteriere über jede "drag" Spalte
  for (const column of dragColumns) {
    // Filtere Todos entsprechend dem Status der aktuellen Spalte
    const filteredTodos = todos.filter((t) => t["status"] === column);
    // Hole das entsprechende DOM-Element für die aktuelle Spalte
    const columnElement = document.getElementById(column);
    // Leere den HTML-Inhalt der aktuellen Spalte
    columnElement.innerHTML = "";

    // Iteriere über jedes gefilterte Todo in der aktuellen Spalte
    for (let index = 0; index < filteredTodos.length; index++) {
      // Hole das aktuelle Todo
      const element = filteredTodos[index];
      // Berechne den Index basierend auf dem Gesamtindex im Todos-Array
      const i = todos.findIndex(todo => todo === element);

      // Füge das HTML des Todos in die aktuelle Spalte ein
      columnElement.innerHTML += generateTodoHTML(element, i);

      // Handle member icons
      const contactsboard = element.assigned_to;
      let contactHTMLIcons = document.getElementById('member_icons_card' + i)?.innerHTML || '';

      // Iteriere durch die zugewiesenen Mitglieder und generiere das HTML für die Icons
      for (let j = 0; j < contactsboard.length; j++) {
        const contact = contactsboard[j];
        contactHTMLIcons += `
          <div id="holeContact${j}${i}" class="hole_contact">        
            <div id="name_icon${j}${i}" class="name_icon"></div>  
            <div class="contact"></div>
          </div>
        `;
      }

      // Füge das HTML für die Icons in das entsprechende Element ein
      if (document.getElementById('member_icons_card' + i)) {
        document.getElementById('member_icons_card' + i).innerHTML = contactHTMLIcons;
      }

      // Generiere Farben für die Icons und wende andere Funktionen an
      const iconColors = generateIconColors(contactsboard, i);
      changeIconColor(contactsboard, i);
      addNameLetters(contactsboard, i);
    }
  }
}

function startDragging(id) {
  currentDraggedElement = id;
}

function generateTodoHTML(element, i) {
  return /*html*/ `
  <div draggable="true" ondragstart="startDragging(${element['id']})">
  <div class="task_content" onclick="openDialog(${element['id']})">

    <div class="card_content">

      <div class="category">${element["category"]}</div>
        <p class="invis">${element["id"]}</p>
         <div class="title_description">
           <div class="title">${element["title"]}</div>
           <div class="description">${element["description"]}</div>
         </div>
      <div class="additional-text">

        <div>${element["due_date"]}</div>
        <div>${element["prio"]}</div>
        <div>${element["assigned_to"]}</div>
        <div>${element["subtasks"]}</div>

      </div>

        <div class="over_progressbar">
            <div class="progress-bar-container ">
              <div class="progress-bar"></div>
             </div>
                <span class="progressbar_text">1/2 Subtasks</span>
        </div>

                <div class=profile_content>
                     <div id="member_icons_card${i}" class="over_profile_badge">
                     </div>

                       <div>
                        <img src="../assets/img/priority_medium.svg" alt="">
                       </div>

                </div>
    </div>
</div>`;
}

function changeStatus(id, status) {
  if (currentDraggedElement != null) {
    let currentStatusArray = value[0].newAddTask;
    let foundIndex = currentStatusArray.findIndex((item) => item.id === id);
    let formFix = value;
    let updatedArray = [...currentStatusArray];

    if (foundIndex !== -1) {
      currentStatusArray[foundIndex].status = status;
    } else {
      console.error("ID:", id, "didnt exist!");
      return;
    }

    value[0].newAddTask = [];

    for (let i = 0; i < updatedArray.length; i++) {
      value[0].newAddTask.push(updatedArray[i]);
    }

    formFix[0].newAddTask = [];
    formFix[0].newAddTask = currentStatusArray;
    setItem("users", formFix);
  } else {
    console.log("currentDraggedElement is null");
  }
}

function setStatusValue(updateValue) {
  currentStatusValue = updateValue;
  changeStatus(currentDraggedElement, currentStatusValue)
}

function allowDrop(ev) {
  ev.preventDefault();
}

function moveTo(category) {
  todos[currentDraggedElement]["status"] = category;
  updateHTML();
}

function highlight(id) {
  document.getElementById(id).classList.add("drag-area-highlight");
}

function removeHighlight(id) {
  document.getElementById(id).classList.remove("drag-area-highlight");
}

function openDialog(todoIndex) {
  // Abrufen des entsprechenden Todos anhand des Index
  const todo = todos[todoIndex];

  // Extrahieren der assigned_to-Daten des Todos in die Variable contactsboard
  const contactsboard = todo.assigned_to;

  // Anzeige des Dialogfelds
  document.getElementById("todo_HTML").style.display = "flex";

  // Aufbau des HTML-Inhalts für das Dialogfeld
  document.getElementById("todo_HTML").innerHTML = `
    <div class="dialog_content" id="close_dialog">
      <div class="category_x">
        <div class="category_dialog">${todo.category}</div>
        <button class="close_button" onclick="closeDialog()">
          <img src="../assets/img/close.svg" alt="">
        </button>
      </div>
      <div class="title_dialog">${todo.title}</div>
      <div class="description_dialog">${todo.description}</div>
      <div class="date_dialog">Due Date: ${todo.due_date}</div>
      <div class="prio_dialog">Priority: ${todo.prio}
        <div>
          <img src="../assets/img/priority_medium.svg" alt="">
        </div>
      </div>
      <div id="member_icons_names"></div>
      <div>
        <div>Subtasks: ${todo.subtasks}</div>
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

  // Leere das Element, um sicherzustellen, dass keine vorherigen Inhalte vorhanden sind
  document.getElementById("member_icons_names").innerHTML = "";

  // Iteriere durch das contactsboard-Array und baue das HTML für die Kontakte auf
  for (let i = 0; i < contactsboard.length; i++) {
    const contact = contactsboard[i];
    const contactHTML = `
      <div id="contact_dialog${i}" class="hole_contact">        
        <div id="name_icon_dialog${i}" class="name_icon"></div>  
        <div class="contact">
          <h4>${contact.name}</h4>
        </div>
      </div>
    `;
    document.getElementById("member_icons_names").innerHTML += contactHTML;
  }

  // Generiere Farben für die Icons, ändere die Icon-Farben und füge Buchstaben hinzu
  generateIconColors(contactsboard);
  changeIconColor(contactsboard);
  addNameLetters(contactsboard);
}

function closeDialog() {
  document.getElementById("close_dialog").innerHTML = "";
  document.getElementById("todo_HTML").style.display = "none";
}

function generateIconColors(contactsboard) {
  const iconColors = [];
  for (let i = 0; i < contactsboard.length; i++) {
    iconColors.push(`var(--${i + 1})`);
  }
  return iconColors;
}

function changeIconColor(contactsboard, index) {
  for (let i = 0; i < contactsboard.length; i++) {
    let icon = document.getElementById("name_icon" + i + index);
    // document.getElementById("name_icon_dialog" + i + index);
    if (icon) {
      icon.style.backgroundColor = `var(--${i + 1})`;
    }
  }
}

function addNameLetters(contactsboard, index) {
  for (let i = 0; i < contactsboard.length; i++) {
    const contact = contactsboard[i];
    const names = contact.name.split(" ");
    let initials = "";
    names.forEach((name) => {
      initials += name.charAt(0).toUpperCase();
    });
    const nameIconElement = document.getElementById("name_icon" + i +index);
    // nameIconElement = document.getElementById("name_icon_dialog" + i +index);
    if (nameIconElement) {
      nameIconElement.innerHTML = initials;
    }
  }
}

function filterTodosTitle() {
  let searchText = document
    .getElementById("filter_input")
    .value.trim()
    .toLowerCase();

  // Filtern der Todos, deren Titel die ersten drei Buchstaben mit dem Suchtext übereinstimmen
  let filteredTodos = todos.filter((t) =>
    t["title"].toLowerCase().startsWith(searchText)
  );

  // Leeren Sie die Inhalte aller Spalten
  document.getElementById("drag_to_do").innerHTML = "";
  document.getElementById("drag_in_progress").innerHTML = "";
  document.getElementById("drag_await_feedback").innerHTML = "";
  document.getElementById("drag_done").innerHTML = "";

  // Durchlaufen Sie die gefilterten Todos und fügen Sie sie nur in die entsprechende Spalte ein
  for (let index = 0; index < filteredTodos.length; index++) {
    let element = filteredTodos[index];
    if (element.status === "drag_to_do") {
      document.getElementById("drag_to_do").innerHTML +=
        generateTodoHTML(element);
    } else if (element.status === "drag_in_progress") {
      document.getElementById("drag_in_progress").innerHTML +=
        generateTodoHTML(element);
    } else if (element.status === "drag_await_feedback") {
      document.getElementById("drag_await_feedback").innerHTML +=
        generateTodoHTML(element);
    } else if (element.status === "drag_done") {
      document.getElementById("drag_done").innerHTML +=
        generateTodoHTML(element);
    }
  }
}

