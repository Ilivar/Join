let todos = [{
    'id': 0,
    'category': 'User Story',
    'title': 'Kochwelt Page & Recipe Recommender',
    'description': 'Build start page with recipe recommendation.',
    'due date': 'Due date: 10/05/2023',
    'prio': 'Priority:',
    'assigned to': 'assigned to:',
    'subtasks': 'Subtasks: ',
    'name': 'drag_to_do'
}, {
    'id': 1,
    'category': 'Technical Task',
    'title': 'CSS Architecture Planning',
    'description': 'Define CSS naming conventions and structure.',
    'due date': 'Due date: 02/09/2023',
    'prio': 'Priority: Urgent ^^',
    'assigned to': 'assigned to:',
    'subtasks': 'Subtasks: Establish CSS Methodology Setup Base Styles',
    'name': 'drag_in_progress'
}, {
    'id': 2,
    'category': 'Technical Task',
    'title': 'CSS Architecture Planning',
    'description': 'Define CSS naming conventions and structure.',
    'due date': 'Due date: 02/09/2023',
    'prio': 'Priority: Urgent ^^',
    'assigned to': 'assigned to:',
    'subtasks': 'Subtasks: Establish CSS Methodology Setup Base Styles',
    'name': 'drag_await_feedback'
}, {
    'id': 3,
    'category': 'Technical Task',
    'title': 'CSS Architecture Planning',
    'description': 'Define CSS naming conventions and structure.',
    'due date': 'Due date: 02/09/2023',
    'prio': 'Priority: Urgent ^^',
    'assigned to': 'assigned to: ',
    'subtasks': 'Subtasks: Establish CSS Methodology Setup Base Styles',
    'name': 'drag_done'
}];

let currentDraggedElement;

function init() {
    includeHTML();
    updateHTML();
}

function updateHTML() {
    let drag_to_do = todos.filter(t => t['name'] == 'drag_to_do');

    document.getElementById('drag_to_do').innerHTML = '';

    for (let index = 0; index < drag_to_do.length; index++) {
        const element = drag_to_do[index];
        document.getElementById('drag_to_do').innerHTML += generateTodoHTML(element);
    }

    let drag_in_progress = todos.filter(t => t['name'] == 'drag_in_progress');

    document.getElementById('drag_in_progress').innerHTML = '';

    for (let index = 0; index < drag_in_progress.length; index++) {
        const element = drag_in_progress[index];
        document.getElementById('drag_in_progress').innerHTML += generateTodoHTML(element);
        
    }

    let drag_await_feedback = todos.filter(t => t['name'] == 'drag_await_feedback');

    document.getElementById('drag_await_feedback').innerHTML = '';

    for (let index = 0; index < drag_await_feedback.length; index++) {
        const element = drag_await_feedback[index];
        document.getElementById('drag_await_feedback').innerHTML += generateTodoHTML(element);
        
    }

    let drag_done = todos.filter(t => t['name'] == 'drag_done');

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
    todos[currentDraggedElement]['name'] = category;
    updateHTML();
}

function highlight(id) {
    document.getElementById(id).classList.add('drag-area-highlight');
}

function removeHighlight(id) {
    document.getElementById(id).classList.remove('drag-area-highlight');
}


function openDialog(todoIndex){
    const todo = todos[todoIndex];
    document.getElementById('todo_HTML').style.display = 'flex';
    
    document.getElementById('todo_HTML').innerHTML = /*html*/`
    <div class="dialog_content" id="close_dialog">
    
    
      <div class="category_x">
        <div class="category_dialog">${todo['category']}</div>
        <button class="close_button" onclick ="closeDialog()" ><img src="../assets/img/close.svg" alt=""></button>
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

function closeDialog(){
    document.getElementById('close_dialog').innerHTML = '';
<<<<<<< Updated upstream
    document.getElementById('todo_HTML').style.display = 'none';
=======
    document.getElementById('close_dialog').style.display = 'none';
>>>>>>> Stashed changes
}
