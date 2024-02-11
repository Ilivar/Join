let urgentTasks = [];

async function init() {
  includeHTML();
  await loadPreviousMember();
  await loadCurrentUserData();
  setCardValues();
}

function setCardValues() {
  setName();
  setToDos();
  setTaskInBoard();
  setDones();
  setInProgress();
  setAwaiting()
  setUrgentTasks();
}

function setName() {
  document.getElementById("greet_name").innerHTML = value[0].name;
}

function setToDos() {
  document.getElementById("todoNumber").innerHTML = countOccurences("todo");
}

function setDones() {
    document.getElementById("doneNumber").innerHTML = countOccurences("done");
}

function setTaskInBoard() {
    document.getElementById("task_in_board").innerHTML = value[0].newAddTask.length;
}

function setInProgress() {
    document.getElementById("in_progress").innerHTML = countOccurences("progress");
}

function setAwaiting() {
    document.getElementById("awaiting").innerHTML = countOccurences("awaiting");
}

function setUrgentTasks() {
    findUrgentTasks();
    document.getElementById("urgent_tasks").innerHTML = urgentTasks.length;
}

function countOccurences(status) {
    let count = 0;
    for (let i = 0; i < value[0].newAddTask.length; i++) {
        if (value[0].newAddTask[i].status === status) {
            count++;
        }
    }
    return count;
}

function findUrgentTasks() {
    value.forEach(value => {
        if (value.newAddTask) {
            value.newAddTask.forEach(task => {
                if (task.prio === 'buttonUrgent') {
                    urgentTasks.push(task);
                }
            });
        }
    });
    return urgentTasks;
}


// Funktion zum Ändern des Bilds und beim Hover
function changeImageCheck(element) {
  element = document.getElementById("check").src =
    "../assets/img/check_img_white.svg";
  text = document.getElementById("doneText");
  text.style.backgroundColor = "#2A3647";
  text.style.color = "white";
  number = document.getElementById("doneNumber");
  number.style.backgroundColor = "#2A3647";
  number.style.color = "white";
}

// Funktion zum Wiederherstellen des ursprünglichen Bilds und text nach dem Verlassen des Hovers
function restoreImageCheck(element) {
  element = document.getElementById("check").src =
    "../assets/img/check_img_dark.svg";
  text = document.getElementById("doneText");
  text.style.backgroundColor = "initial";
  text.style.color = "initial";
  number = document.getElementById("doneNumber");
  number.style.backgroundColor = "initial";
  number.style.color = "initial";
}

// Funktion zum Ändern des Bilds beim Hover
function changeImagePen(element) {
  element = document.getElementById("pen").src =
    "../assets/img/pen_img_white.svg";
  text = document.getElementById("todoText");
  text.style.backgroundColor = "#2A3647";
  text.style.color = "white";
  number = document.getElementById("todoNumber");
  number.style.backgroundColor = "#2A3647";
  number.style.color = "white";
}

// Funktion zum Wiederherstellen des ursprünglichen Bilds nach dem Verlassen des Hovers
function restoreImagePen(element) {
  element = document.getElementById("pen").src =
    "../assets/img/pen_img_black.svg";
  text = document.getElementById("todoText");
  text.style.backgroundColor = "initial";
  text.style.color = "initial";
  number = document.getElementById("todoNumber");
  number.style.backgroundColor = "initial";
  number.style.color = "initial";
}

function changeTextUrgent() {
  // Alle Elemente mit der Klasse "urgent_text" auswählen
  let urgentTextElements = document.querySelectorAll(".urgent_color");

  // Für jedes dieser Elemente den Stil ändern
  urgentTextElements.forEach(function (element) {
    // Ändern der Hintergrundfarbe
    element.style.backgroundColor = "#2A3647";
    // Ändern der Schriftfarbe
    element.style.color = "white";
  });
}

// Funktion zum Zurücksetzen des Stils nach dem Verlassen des Hovers
function restoreTextUrgent() {
  // Alle Elemente mit der Klasse "urgent_text" auswählen
  var urgentTextElements = document.querySelectorAll(".urgent_color");

  // Für jedes dieser Elemente den ursprünglichen Stil wiederherstellen
  urgentTextElements.forEach(function (element) {
    // Zurücksetzen der Hintergrundfarbe
    element.style.backgroundColor = "";
    // Zurücksetzen der Schriftfarbe
    element.style.color = "";
  });
}

function changeTextTaskBoard() {
  // Alle Elemente mit der Klasse "urgent_text" auswählen
  let urgentTextElements = document.querySelectorAll(".task_board_color");

  // Für jedes dieser Elemente den Stil ändern
  urgentTextElements.forEach(function (element) {
    // Ändern der Hintergrundfarbe
    element.style.backgroundColor = "#2A3647";
    // Ändern der Schriftfarbe
    element.style.color = "white";
  });
}

// Funktion zum Zurücksetzen des Stils nach dem Verlassen des Hovers
function restoreTextcolorBoard() {
  // Alle Elemente mit der Klasse "urgent_text" auswählen
  var urgentTextElements = document.querySelectorAll(".task_board_color");

  // Für jedes dieser Elemente den ursprünglichen Stil wiederherstellen
  urgentTextElements.forEach(function (element) {
    // Zurücksetzen der Hintergrundfarbe
    element.style.backgroundColor = "";
    // Zurücksetzen der Schriftfarbe
    element.style.color = "";
  });
}

function changeTextTaskProgress() {
  // Alle Elemente mit der Klasse "urgent_text" auswählen
  let urgentTextElements = document.querySelectorAll(".task_progress_color");

  // Für jedes dieser Elemente den Stil ändern
  urgentTextElements.forEach(function (element) {
    // Ändern der Hintergrundfarbe
    element.style.backgroundColor = "#2A3647";
    // Ändern der Schriftfarbe
    element.style.color = "white";
  });
}

// Funktion zum Zurücksetzen des Stils nach dem Verlassen des Hovers
function restoreTextcolorProgress() {
  // Alle Elemente mit der Klasse "urgent_text" auswählen
  var urgentTextElements = document.querySelectorAll(".task_progress_color");

  // Für jedes dieser Elemente den ursprünglichen Stil wiederherstellen
  urgentTextElements.forEach(function (element) {
    // Zurücksetzen der Hintergrundfarbe
    element.style.backgroundColor = "";
    // Zurücksetzen der Schriftfarbe
    element.style.color = "";
  });
}

function changeTextTaskFeedback() {
  // Alle Elemente mit der Klasse "urgent_text" auswählen
  let urgentTextElements = document.querySelectorAll(
    ".awaiting_feedback_color"
  );

  // Für jedes dieser Elemente den Stil ändern
  urgentTextElements.forEach(function (element) {
    // Ändern der Hintergrundfarbe
    element.style.backgroundColor = "#2A3647";
    // Ändern der Schriftfarbe
    element.style.color = "white";
  });
}

// Funktion zum Zurücksetzen des Stils nach dem Verlassen des Hovers
function restoreTextcolorFeedback() {
  // Alle Elemente mit der Klasse "urgent_text" auswählen
  var urgentTextElements = document.querySelectorAll(
    ".awaiting_feedback_color"
  );

  // Für jedes dieser Elemente den ursprünglichen Stil wiederherstellen
  urgentTextElements.forEach(function (element) {
    // Zurücksetzen der Hintergrundfarbe
    element.style.backgroundColor = "";
    // Zurücksetzen der Schriftfarbe
    element.style.color = "";
  });
}
