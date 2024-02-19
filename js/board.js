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

async function openAddTask() {
  document.getElementById("overlayAddTask").style.display = "flex";

  contacts = value[0].contacts;
  await renderContacts();
  prioMediumOnLoad();
  futureDate();
}

function closeAddTask() {
  document.getElementById("overlayAddTask").style.display = "none";
}

function AddTaskToDo(drag_to_do) {
  currentStatus = "drag_to_do";
  openAddTask();
  updateHTML();
}

function AddTaskProgress(drag_in_progress) {
  currentStatus = "drag_in_progress";
  openAddTask();
  updateHTML();
}

function AddTaskAwaitFeedback(drag_await_feedback) {
  currentStatus = "drag_await_feedback";
  openAddTask();
  updateHTML();
}

function updateHTML() {
  // Definiere alle "drag" Spalten
  const dragColumns = [
    "drag_to_do",
    "drag_in_progress",
    "drag_await_feedback",
    "drag_done",
  ];

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
      const i = todos.findIndex((todo) => todo === element);

      // Füge das HTML des Todos in die aktuelle Spalte ein
      columnElement.innerHTML += generateTodoHTML(element, i);

      // Handle member icons
      const contactsboard = element.assigned_to;
      let contactHTMLIcons =
        document.getElementById("member_icons_card" + i)?.innerHTML || "";

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
      if (document.getElementById("member_icons_card" + i)) {
        document.getElementById("member_icons_card" + i).innerHTML =
          contactHTMLIcons;
      }

      // Generiere Farben für die Icons und wende andere Funktionen an
      const iconColors = generateIconColors(contactsboard, i);
      changeIconColor(contactsboard, i);
      addNameLetters(contactsboard, i);
    }
  }
  initRenderProgressBar();
}

function initRenderProgressBar() {
  for (let i = 0; i < value[0].newAddTask.length; i++) {
    renderProgressBar(i);
  }
}

function startDragging(id) {
  currentDraggedElement = id;
}

function generateTodoHTML(element, i) {
  const prioImage = displayImagePrio(element["prio"]); // Hier wird die Funktion aufgerufen, um das entsprechende Bild zu erhalten
  const categoryBackgroundColor = backgroundColorCategory(element.category);

  return /*html*/ `
  <div draggable="true" ondragstart="startDragging(${element["id"]})">
  <div class="task_content" onclick="openDialog(${i})">

    <div class="card_content">

      <div class="category" style="background-color: ${categoryBackgroundColor};">${element["category"]}</div>
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

        <div id="over_progressbar${i}" class="over_progressbar">
            <div class="progress-bar-container ">
              <div id="progress_bar${i}" class="progress-bar"></div>
             </div>
                <span id="progress_text${i}" class="progressbar_text">1/2 Subtasks</span>
        </div>

                <div class=profile_content>
                     <div id="member_icons_card${i}" class="over_profile_badge">
                     </div>

                       <div>
                       <img src="${prioImage}" alt="Priority" class="priority_image">
                       </div>

                </div>
    </div>
</div>`;
}

function updateSubtaskStatus(subtaskIndex, isChecked) {
  if (subtaskIndex >= 0 && subtaskIndex < subtasks.length) {
    subtasks[subtaskIndex].completed = isChecked;

    let completedSubtasksCount = subtasks.filter(
      (subtask) => subtask.completed
    ).length;
    let totalSubtasksCount = subtasks.length;
    let overallProgress = (completedSubtasksCount / totalSubtasksCount) * 100;

    updateProgressBar(overallProgress);
  }
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
  changeStatus(currentDraggedElement, currentStatusValue);
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

  console.log("contactsboard-Daten:", contactsboard);

  // Anzeige des Dialogfelds
  document.getElementById("todo_HTML").style.display = "flex";
  const prioImage = displayImagePrio(todo["prio"]); // Hier wird die Funktion aufgerufen, um das entsprechende Bild zu erhalten
  const categoryBackgroundColor = backgroundColorCategory(todo.category);

  // Aufbau des HTML-Inhalts für das Dialogfeld
  document.getElementById("todo_HTML").innerHTML = `
  <div class="edit_dialog_content" id="edit_dialog"></div>
    <div class="dialog_content" id="close_dialog">
      <div class="category_x">
        <div class="category_dialog" style="background-color: ${categoryBackgroundColor};">${todo["category"]}</div>
        <button class="close_button" onclick="closeDialog()">
          <img src="../assets/img/close.svg" alt="">
        </button>
      </div>
      <div class="title_dialog">${todo.title}</div>
      <div class="description_dialog">${todo.description}</div>
      <div class="date_dialog">Due Date: ${todo.due_date}</div>
      <div class="prio_dialog">Priority: ${todo.prio}
        <div>
        <img src="${prioImage}" alt="Priority" class="priority_image">
        </div>
      </div>
      
      <div id="member_icons_names_${todoIndex}"></div>
      <p>Subtasks:</p>
      <div id="subtask_list"> </div>
      
      <div class="dialog_delete_edit">
        <div><img src="../assets/img/property_1=delete.svg" alt="" onclick="deleteTodo(${todo.id})">delete</div> 
        <img src="../assets/img/vector_delete_edit.svg" alt="" >
        <div><img src="../assets/img/property_1=edit.svg" alt="">edit</div>
    </div>
  `;

  // Leere das Element, um sicherzustellen, dass keine vorherigen Inhalte vorhanden sind
  document.getElementById(`member_icons_names_${todoIndex}`).innerHTML = "";

  // Iteriere durch das contactsboard-Array und baue das HTML für die Kontakte auf
  let contactHTMLIcons = ""; // HTML für die Icons
  for (let i = 0; i < contactsboard.length; i++) {
    const contact = contactsboard[i];
    contactHTMLIcons += `
      <div id="contact_dialog${i}_${todoIndex}" class="hole_contact">        
        <div id="name_icon_dialog${i}_${todoIndex}" class="name_icon"></div>  
        <div class="contact">
          <h4>${contact.name}</h4>
        </div>
      </div>
    `;
  }

  // Füge das HTML für die Icons in das entsprechende Element ein
  document.getElementById(`member_icons_names_${todoIndex}`).innerHTML =
    contactHTMLIcons;

  // Update der Mitglieder-Icons im Dialogfeld
  updateMemberIconsForDialog(contactsboard, todoIndex);

  // Generiere Farben für die Icons im Dialogfeld
  generateIconColorsForDialog(contactsboard, todoIndex);

  // Ändere die Icon-Farben im Dialogfeld
  changeIconColorForDialog(contactsboard, todoIndex);

  // Füge Buchstaben hinzu im Dialogfeld
  addNameLettersForDialog(contactsboard, todoIndex);
  renderSubtasks(todoIndex);
}

////////////////////////////////////////////////

/////////////////////////////////////////////

async function openDialogEdit(todoIndex) {
  const todo = todos[todoIndex];
  // const contactsboard = todo.assigned_to;
  let title = todos[todoIndex].title;
  let description = todos[todoIndex].description;
  let due_date = todos[todoIndex].due_date;
  let prio = todos[todoIndex].prio;
  let assigned_to = todos[todoIndex].assigned_to;
  let subtask = todos[todoIndex].subtask;

  document.getElementById("todo_HTML").style.display = "none";
  document.getElementById("edit_dialog").style.display = "flex";
  document.getElementById("edit_dialog").innerHTML = /*html*/ `
    
  <div class="column">
    <div class="right">
        <button class="close_button" onclick="closeDialog()">
          <img src="../assets/img/close.svg" alt="">
        </button>
    </div>

  
    <div class="title_area">
      <h4> Title</h4>
      <input class="input_field" id="input_title" type="text" placeholder="Enter a title" required/>
    </div>
    
    <div class="description_area">
      <h4> Description</h4>
      <textarea class="textarea_field" id="description"  rows="4" cols="50" placeholder="Enter a Description"></textarea>
    </div>

    <h4> Due date *</h4>
    <input class="input_field_date" id="input_date" type="date" min="" required/>
  	
    <h4> Prio </h4>
        <div class="prio_area">
            <div id="buttonUrgent" class="prio" onclick="buttonUrgent()">
                <h4>Urgent</h4>
                <img id="prioImg" src="../assets/img/Prio up.svg">
            </div>
            <div id="buttonMedium" class="prio_orange" onclick="buttonMedium()">
                <h4>Medium</h4>
                <img id="mediumImg" src="../assets/img/Prio media.svg">
            </div>
            <div id="buttonLow" class="prio" onclick="buttonLow()">
                <h4>Low</h4>
                <img id="lowImg" src="../assets/img/Prio down.svg">
            </div>
        </div>

        <div class="assi_area">
            <h4>Assigned to</h4>
            <div class="accordion">
                <div class="head_arccordion" onclick="toggleAccordion(this)">
                    <div id="search_area"><p>Select contacts to assign</p></div>
                    <img src="../assets/img/arrow_drop_downaa.svg">
                </div>
                <div class="accordion-content">
                    <div id="MemberFiel_Search"></div>
                    <div id="MemberField" class="column">
                    </div>
                </div>
            </div>
            <div id="aktiveMemberIcons"></div>
        </div>

        <h4>Subtasks</h4>
          <div class="assigned_area">
              <input class="input_field_subtask" id="input_subtask" type="text" placeholder="Add new subtask" onclick="clickInputSubTask()"/>
              <div id="sub_task_image_area"><img src="../assets/img/plus icon.svg"></div>
          </div>
          <div id="sub_task_listelements"></div>

          <button type="submit" class="create_task" > 
              <p> Ok</p>
              <!-- <img src="../assets/img/check.svg"> -->
          </button>

  </div>
  `;

  document.getElementById("input_title").value = title;
  document.getElementById("description").value = description;
  document.getElementById("input_date").value = due_date;

  contacts = value[0].contacts;
  await renderContacts();
  prioMediumOnLoad();
  futureDate();

  // Leere das Element, um sicherzustellen, dass keine vorherigen Inhalte vorhanden sind
}

//////////DELETE FUNKTION ANGEFANGEN!!!!

function deleteTodo(todoId) {
  const index = todos.findIndex((todo) => todo.id === todoId);
  if (index !== -1) {
    todos.splice(index, 1); // Entferne das Todo aus dem Array
    updateHTML(); // Aktualisiere die Anzeige
  }
}

////////DELETE FUNKTION ENDE!!!!!!

function renderSubtasks(todoIndex) {
  const subtaskList = document.getElementById("subtask_list");
  subtaskList.innerHTML = "";

  for (let i = 0; i < todos[todoIndex].subtasks.length; i++) {
    const subtask = todos[todoIndex].subtasks[i];
    const subtaskCheckboxId = `subtask_checkbox_${todoIndex}_${i}`;
    const isChecked = subtask.completed ? "checked" : "";

    const subtaskHTML = `
      <div class="subtask_container">
        <input type="checkbox" id="${subtaskCheckboxId}" onclick="updateSubtaskStatus(${todoIndex}, ${i}, this.checked)" ${isChecked}>
        <span>${subtask.title}</span>
      </div>
    `;
    subtaskList.innerHTML += subtaskHTML;
  }
}

function renderProgressBar(todoIndex) {
  try {
    const totalSubtasks = todos[todoIndex].subtasks.length;
    let completedSubtasks = 0;

    todos[todoIndex].subtasks.forEach((subtask) => {
      if (subtask.completed) {
        completedSubtasks++;
      }
    });

    const progressPercentage = Math.floor(
      (completedSubtasks / totalSubtasks) * 100
    );

    const progressBar = document.getElementById("progress_bar" + todoIndex);
    progressBar.style.width = `${progressPercentage}%`;

    const progressText = document.getElementById("progress_text" + todoIndex);
    progressText.textContent = `${completedSubtasks}/${totalSubtasks} Subtask`;
  } catch {
    document.getElementById("over_progressbar" + todoIndex).style.display =
      "none";
  }
}

function updateSubtaskStatus(todoIndex, subtaskIndex, isChecked) {
  let holeValue = value[0];
  holeValue.newAddTask[todoIndex].subtasks[subtaskIndex].completed = isChecked;
  setItem("users", value);
  renderProgressBar(todoIndex);
}

function closeDialog() {
  document.getElementById("close_dialog").innerHTML = "";
  document.getElementById("todo_HTML").style.display = "none";
}

function generateIconColors(contactsboard, index) {
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
    const nameIconElement = document.getElementById("name_icon" + i + index);
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

  // Leeren Sie den HTML-Inhalt aller Spalten
  const dragColumns = [
    "drag_to_do",
    "drag_in_progress",
    "drag_await_feedback",
    "drag_done",
  ];
  for (const column of dragColumns) {
    const columnElement = document.getElementById(column);
    columnElement.innerHTML = "";
  }

  // Iteriere über jedes Todo und überprüfe, ob der Titel den Suchbegriff enthält
  for (const todo of todos) {
    if (todo.title.toLowerCase().includes(searchText)) {
      // Generiere das HTML für das Todo
      const i = todos.findIndex((t) => t === todo);
      const todoHTML = generateTodoHTML(todo, i);

      // Füge das Todo in die entsprechende Spalte ein
      const columnElement = document.getElementById(todo.status);
      if (columnElement) {
        columnElement.innerHTML += todoHTML;

        // Handle member icons
        const contactsboard = todo.assigned_to;
        let contactHTMLIcons =
          document.getElementById("member_icons_card" + i)?.innerHTML || "";

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
        if (document.getElementById("member_icons_card" + i)) {
          document.getElementById("member_icons_card" + i).innerHTML =
            contactHTMLIcons;
        }

        // Generiere Farben für die Icons und wende andere Funktionen an
        const iconColors = generateIconColors(contactsboard, i);
        changeIconColor(contactsboard, i);
        addNameLetters(contactsboard, i);
      }
    }
  }
}

function generateMemberIconsForDialog(contactsboard, todoIndex) {
  let contactHTMLIcons = "";
  for (let i = 0; i < contactsboard.length; i++) {
    const contact = contactsboard[i];
    contactHTMLIcons += `
      <div class="hole_contact">        
        <div class="name_icon"></div>  
        <div class="contact">
          <h4>${contact.name}</h4>
        </div>
      </div>
    `;
  }
  return contactHTMLIcons;
}

function updateMemberIconsForDialog(contactsboard, todoIndex) {
  const contactHTMLIcons = generateMemberIconsForDialog(
    contactsboard,
    todoIndex
  );
  document.getElementById(`member_icons_names_${todoIndex}`).innerHTML =
    contactHTMLIcons;
}

function generateIconColorsForDialog(contactsboard, todoIndex) {
  const iconColors = [];
  for (let i = 0; i < contactsboard.length; i++) {
    iconColors.push(`var(--${i + 1})`);
  }
  return iconColors;
}

function changeIconColorForDialog(contactsboard, todoIndex) {
  for (let i = 0; i < contactsboard.length; i++) {
    let icon = document.querySelector(
      `#member_icons_names_${todoIndex} .name_icon:nth-child(${i + 1})`
    );
    if (icon) {
      icon.style.backgroundColor = `var(--${i + 1})`;
    }
  }
}

function addNameLettersForDialog(contactsboard, todoIndex) {
  const nameIconElements = document.querySelectorAll(
    `#member_icons_names_${todoIndex} .name_icon`
  );
  nameIconElements.forEach((nameIconElement, i) => {
    const contact = contactsboard[i];
    if (contact) {
      const names = contact.name.split(" ");
      let initials = "";
      names.forEach((name) => {
        initials += name.charAt(0).toUpperCase();
      });
      nameIconElement.innerHTML = initials;
      nameIconElement.style.backgroundColor = `var(--${i + 1})`; // Setze die Hintergrundfarbe für jedes Icon
    }
  });
}

function displayImagePrio(prio) {
  if (prio === "Urgent") {
    return "../assets/img/priority_Urgent.svg";
  } else if (prio === "Medium") {
    return "../assets/img/priority_medium.svg";
  } else if (prio === "Low") {
    return "../assets/img/priority_Low.svg";
  } else {
    console.error("Ungültige Priorität");
    return ""; // Rückgabe eines leeren Strings im Falle einer ungültigen Priorität
  }
}

function backgroundColorCategory(category) {
  if (category === "User Story") {
    return "#0038FF"; // Hintergrundfarbe für die Kategorie "User Story"
  } else if (category === "Technical Task") {
    return "#1FD7C1"; // Hintergrundfarbe für die Kategorie "Technical Task"
  } else {
    return ""; // Falls keine Übereinstimmung gefunden wurde, wird eine leere Zeichenfolge zurückgegeben
  }
}
