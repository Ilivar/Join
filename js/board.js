let todos = [{
    'id': 0,
    'title': 'Putzen',
    'category': 'drag_to_do'
}, {
    'id': 1,
    'title': 'Kochen',
    'category': 'drag_in_progress'
}, {
    'id': 2,
    'title': 'Einkaufen',
    'category': 'drag_await_feedback'
}, {
    'id': 3,
    'title': 'bezahlen',
    'category': 'drag_done'
}];

let currentDraggedElement;

function init() {
    includeHTML();
    updateHTML();
}

function updateHTML() {
    let drag_to_do = todos.filter(t => t['category'] == 'drag_to_do');

    document.getElementById('drag_to_do').innerHTML = '';

    for (let index = 0; index < drag_to_do.length; index++) {
        const element = drag_to_do[index];
        document.getElementById('drag_to_do').innerHTML += generateTodoHTML(element);
    }

    let drag_in_progress = todos.filter(t => t['category'] == 'drag_in_progress');

    document.getElementById('drag_in_progress').innerHTML = '';

    for (let index = 0; index < drag_in_progress.length; index++) {
        const element = drag_in_progress[index];
        document.getElementById('drag_in_progress').innerHTML += generateTodoHTML(element);
    }

    let drag_await_feedback = todos.filter(t => t['category'] == 'drag_await_feedback');

    document.getElementById('drag_await_feedback').innerHTML = '';

    for (let index = 0; index < drag_await_feedback.length; index++) {
        const element = drag_await_feedback[index];
        document.getElementById('drag_await_feedback').innerHTML += generateTodoHTML(element);
    }

    let drag_done = todos.filter(t => t['category'] == 'drag_done');

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
    return `<div draggable="true" ondragstart="startDragging(${element['id']})" class="todo">${element['title']}</div>`;
}

function allowDrop(ev) {
    ev.preventDefault();
}

function moveTo(category) {
    todos[currentDraggedElement]['category'] = category;
    updateHTML();
}

function highlight(id) {
    document.getElementById(id).classList.add('drag-area-highlight');
}

function removeHighlight(id) {
    document.getElementById(id).classList.remove('drag-area-highlight');
}