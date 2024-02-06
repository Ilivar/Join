let boards = [
    {
        'category': 'User Story',
        'title': 'Kochwelt Page & Recipe recommender',
        'description': 'Build start page with recipe recommendation.',
        'due date': 'Due date: 10/05/2023',
        'prio': 'Priority: Medium =',
        'assigned to': 'assigned to: Emmanuel Mauer, Marcel Bauer, Anton Mayer',
        'subtasks': 'Subtasks: Implement Recipe Recommendation Start page Layout'
    },
    {
        'category': 'Technical task',
        'title': 'CSS Architecture Planning',
        'description': 'Define CSS naming conventions and structure.',
        'due date': 'Due date: 02/09/2023',
        'prio': 'Priority: Urgent ^^',
        'assigned to': 'assigned to: Sofia Müller (You) Benedikt Ziegler',
        'subtasks': 'Subtasks: Establish CSS Methodology Setup Base Styles'
    },
    {
        'category': 'Technical task',
        'title': 'CSS Architecture Planning',
        'description': 'Define CSS naming conventions and structure.',
        'due date': 'Due date: 02/09/2023',
        'prio': 'Priority: Urgent ^^',
        'assigned to': 'assigned to: Sofia Müller (You) Benedikt Ziegler',
        'subtasks': 'Subtasks: Establish CSS Methodology Setup Base Styles'
    },
    {
        'category': 'Technical task',
        'title': 'CSS Architecture Planning',
        'description': 'Define CSS naming conventions and structure.',
        'due date': 'Due date: 02/09/2023',
        'prio': 'Priority: Urgent ^^',
        'assigned to': 'assigned to: Sofia Müller (You) Benedikt Ziegler',
        'subtasks': 'Subtasks: Establish CSS Methodology Setup Base Styles'
    }

]


function init() {
    boardTasks();
    includeHTML();
    setProgress(progress);
}

function boardTasks() {
    let tasksContainer = document.getElementById('tasksBoard');
    tasksContainer.innerHTML = ''; //

    boards.forEach(board => {
        tasksContainer.innerHTML += /*html*/`
        <div class="task_content"> 
            <div class="category">${board['category']}</div>
            <div class="title">${board['title']}</div>
            <div class="description">${board['description']}</div>
            <div>${board['due date']}</div>
            <div>${board['prio']}</div>
            <div>${board['assigned to']}</div>
            <div>${board['subtasks']}</div>
           
        </div>

        <div class="progress-bar-container">
            <div class="progress-bar"></div>
            </div>
        `;
    });
}

// Annahme: progress ist ein Wert zwischen 0 und 100
function setProgress(progress) {
    var progressBar = document.querySelector('.progress-bar');
    progressBar.style.width = progress + '%';
  }
  
  // Beispielaufruf
  setProgress(70); // Setzt den Fortschritt auf 70%
