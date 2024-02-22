let urgentTasks = [];

async function init() {
  await includeHTML();
  await loadPreviousMember();
  await loadCurrentUserData();
  greetUser();
  getNearestTask();
  setCardValues();
  renderUserInitial();
  openBurgerMenu();
  openBurgerMenuMobile();
}

function setCardValues() {
  setName();
  setToDos();
  setTaskInBoard();
  setDones();
  setInProgress();
  setAwaiting();
  setUrgentTasks();
}

function setName() {
  document.getElementById("greet_name").innerHTML = value[0].name;
}

function setToDos() {
  document.getElementById("todoNumber").innerHTML = countOccurences("drag_to_do");
}

function setDones() {
  document.getElementById("doneNumber").innerHTML = countOccurences("drag_done");
}

function setTaskInBoard() {
  document.getElementById("task_in_board").innerHTML =
    value[0].newAddTask.length;
}

function setInProgress() {
  document.getElementById("in_progress").innerHTML =
    countOccurences("drag_in_progress");
}

function setAwaiting() {
  document.getElementById("awaiting").innerHTML = countOccurences("drag_await_feedback");
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
  value.forEach((value) => {
    if (value.newAddTask) {
      value.newAddTask.forEach((task) => {
        if (task.prio === "Urgent") {
          urgentTasks.push(task);
        }
      });
    }
  });
  return urgentTasks;
}

function greetUser() {
  let now = new Date();
  let hour = now.getHours();

  if (hour >= 5 && hour < 12) {
    document.getElementById("greeting_user").innerHTML = "Good morning, ";
  } else if (hour >= 12 && hour < 18) {
    document.getElementById("greeting_user").innerHTML = "Good afternoon, ";
  } else {
    document.getElementById("greeting_user").innerHTML = "Good evening, ";
  }
}

function getNearestTask() {
  const tasks = value[0].newAddTask;

  tasks.sort((a, b) => {
    if (a.due_date < b.due_date) return -1;
    if (a.due_date > b.due_date) return 1;
    return 0;
  });

  const nearestTaskDate = formatDate(tasks[0].due_date);
  document.getElementById("nearest_task").innerHTML = nearestTaskDate;
}

function formatDate(inputDate) {
  const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
  const parts = inputDate.split("-");
  const year = parts[0];
  const month = months[parseInt(parts[1]) - 1]; // Monatsindex beginnt bei 0
  const day = parts[2];

  return `${month} ${parseInt(day)}, ${year}`;
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
