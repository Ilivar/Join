let todos = [{
  'id': 0,
  'category': 'User Story',
  'title': 'Kochwelt Page & Recipe Recommender',
  'description': 'Build start page with recipe recommendation.',
  'due date': 'Due date: 10/05/2023',
  'prio': 'Priority:',
  'assigned to': 'assigned to:',
  'subtasks': 'Subtasks: ',
  'status': 'drag_to_do'
}, {
  'id': 1,
  'category': 'Technical Task',
  'title': 'CSS Architecture Planning',
  'description': 'Define CSS naming conventions and structure.',
  'due date': 'Due date: 02/09/2023',
  'prio': 'Priority: Urgent ^^',
  'assigned to': 'assigned to:',
  'subtasks': 'Subtasks: Establish CSS Methodology Setup Base Styles',
  'status': 'drag_in_progress'
}, {
  'id': 2,
  'category': 'Technical Task',
  'title': 'CSS Architecture Planning',
  'description': 'Define CSS naming conventions and structure.',
  'due date': 'Due date: 02/09/2023',
  'prio': 'Priority: Urgent ^^',
  'assigned to': 'assigned to:',
  'subtasks': 'Subtasks: Establish CSS Methodology Setup Base Styles',
  'status': 'drag_await_feedback'
}, {
  'id': 3,
  'category': 'Technical Task',
  'title': 'CSS Architecture Planning',
  'description': 'Define CSS naming conventions and structure.',
  'due date': 'Due date: 02/09/2023',
  'prio': 'Priority: Urgent ^^',
  'assigned to': 'assigned to: ',
  'subtasks': 'Subtasks: Establish CSS Methodology Setup Base Styles',
  'status': 'drag_done'
}];

let separatedTodo = [];
let separatedProgress = [];
let separatedAwait = [];
let separatedDone = [];

let currentDraggedElement;

async function init() {
  await loadPreviousMember();
  await loadCurrentUserData();
  separateArrays();
  includeHTML();
  // updateHTML();
  updateHTMLBackend();
}

function updateHTMLBackend(){
  // document.getElementById('drag_to_do').innerHTML = '';
  for (let i = 0; i < separatedTodo.length; i++) {
    const element = separatedTodo[i];
    document.getElementById('drag_to_do').innerHTML += generateTodoHTML(element) ;
  }

  // document.getElementById('drag_in_progress').innerHTML = '';
  for (let i = 0; i < separatedProgress.length; i++) {
    const element = separatedProgress[i];
    document.getElementById('drag_in_progress').innerHTML += generateTodoHTML(element) ;
  }

  // document.getElementById('drag_await_feedback').innerHTML = '';
  for (let i = 0; i < separatedAwait.length; i++) {
    const element = separatedAwait[i];
    document.getElementById('drag_await_feedback').innerHTML += generateTodoHTML(element) ;
  }

  // document.getElementById('drag_done').innerHTML = '';
  for (let i = 0; i < separatedDone.length; i++) {
    const element = separatedDone[i];
    document.getElementById('drag_done').innerHTML += generateTodoHTML(element) ;
  }
  
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

        <div>${element['due date']}</div>
        <div>${element['prio']}</div>
        <div>${element['assigned to']}</div>
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
  document.getElementById('todo_HTML').style.display = 'flex';

  document.getElementById('todo_HTML').innerHTML = /*html*/`
    <div class="dialog_content" id="close_dialog">
    
    
      <div class="category_x">
        <div class="category_dialog">${todo['category']}</div>
        <button class="close_button" onclick="closeDialog()"><img src="../assets/img/close.svg" alt=""></button>
      </div>
    
      <div class="title_dialog">${todo['title']}</div>
      <div class="description_dialog">${todo['description']}</div>
    
    
      <div class="date_dialog">${todo['due date']}</div>
      <div class="prio_dialog">${todo['prio']} Medium
        <div>
          <img src="../assets/img/priority_medium.svg" alt="">
        </div>
      </div>
      <div>${todo['assigned to']}</div>
    
      <div class="">
        <div class="over_profile_badge_dialog">
          <div class="profile_badge2"><span>AM</span></div>Anton Mayer
        </div>
    
        <div class="over_profile_badge_dialog">
          <div class="profile_badge1"><span>EM</span></div>Emmanuel Mauer
        </div>
    
        <div class="over_profile_badge_dialog">
          <div class="profile_badge"><span>MB</span></div>Marcel Bauer
        </div>
      </div>
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
}

function closeDialog() {
  document.getElementById('close_dialog').innerHTML = '';
  document.getElementById('todo_HTML').style.display = 'none';
}


function searchTasks(query) {
  // Leeres Array für gefundene Aufgaben
  let results = [];

  // Durch alle Aufgaben iterieren
  todos.forEach(todo => {
    // Text in Titel und Beschreibung der Aufgabe suchen
    if (todo.title.toLowerCase().includes(query.toLowerCase()) || todo.description.toLowerCase().includes(query.toLowerCase())) {
      // Wenn ein Treffer gefunden wird, die Aufgabe zu den Ergebnissen hinzufügen
      results.push(todo);
    }
  });

  return results;
}

// Beispielaufruf der Suchfunktion mit dem Suchbegriff "CSS"
let searchResults = searchTasks("CSS");
console.log(searchResults);



function performSearch(query) {
  let searchResults = searchTasks(query);
  updateSearchResults(searchResults);
}

function updateSearchResults(results) {
  let searchResultsContainer = document.getElementById('searchResults');
  searchResultsContainer.innerHTML = '';

  results.forEach(result => {
    let resultElement = document.createElement('div');
    resultElement.textContent = result.title; // Anpassen, wie die Suchergebnisse angezeigt werden sollen
    searchResultsContainer.appendChild(resultElement);
  });
}


function delTask() {
  let task = document.getElementById("details_email").innerHTML;
  let taskIndex = contacts.findIndex((c) => c.email === contact);
  contacts.splice(contactIndex, 1);
  setItem("users", currentUserData);
  closeEditContact();
  renderContacts();
  document.getElementById("details_container").innerHTML = "";
}

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


function separateArrays(){
    value[0].newAddTask.forEach(task => {
        switch (task.status) {
            case 'todo':
                separatedTodo.push(task);
                break;
            case 'progress':
                separatedProgress.push(task);
                break;
            case 'await':
                separatedAwait.push(task);
                break;
            default:
                separatedDone.push(task);
                break;
        }
    });
}