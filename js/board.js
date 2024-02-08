let todos = [{
    'id': 0,
    'category': 'User Story',
    'title': 'Kochwelt Page & Recipe Recommender',
    'description': 'Build start page with recipe recommendation.',
    'due date': 'Due date: 10/05/2023',
    'prio': 'Priority: Medium =',
    'assigned to': 'assigned to: Emmanuel Mauer, Marcel Bauer, Anton Mayer',
    'subtasks': 'Subtasks: Implement Recipe Recommendation Start page Layout',
    'name': 'drag_to_do'
}, {
    'id': 1,
    'category': 'Technical Task',
    'title': 'CSS Architecture Planning',
    'description': 'Define CSS naming conventions and structure.',
    'due date': 'Due date: 02/09/2023',
    'prio': 'Priority: Urgent ^^',
    'assigned to': 'assigned to: Sofia Müller (You) Benedikt Ziegler',
    'subtasks': 'Subtasks: Establish CSS Methodology Setup Base Styles',
    'name': 'drag_in_progress'
}, {
    'id': 2,
    'category': 'Technical Task',
    'title': 'CSS Architecture Planning',
    'description': 'Define CSS naming conventions and structure.',
    'due date': 'Due date: 02/09/2023',
    'prio': 'Priority: Urgent ^^',
    'assigned to': 'assigned to: Sofia Müller (You) Benedikt Ziegler',
    'subtasks': 'Subtasks: Establish CSS Methodology Setup Base Styles',
    'name': 'drag_await_feedback'
}, {
    'id': 3,
    'category': 'Technical Task',
    'title': 'CSS Architecture Planning',
    'description': 'Define CSS naming conventions and structure.',
    'due date': 'Due date: 02/09/2023',
    'prio': 'Priority: Urgent ^^',
    'assigned to': 'assigned to: Sofia Müller (You) Benedikt Ziegler',
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
  <div class="task_content">

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

                       <div></div>

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