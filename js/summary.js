let urgentTasks = [];

async function init() {
  await getCurrentUserNumber();
  await includeHTML();
  await loadPreviousMember();
  await loadCurrentUserData();
  greetUser();
  getNearestTask();
  setCardValues();
  await renderUserInitial();
  await openBurgerMenu();
  await openBurgerMenuMobile();
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
  document.getElementById("greet_name").innerHTML =
    value[currentUserNumber].name;
}

function setToDos() {
  document.getElementById("todoNumber").innerHTML =
    countOccurences("drag_to_do");
}

function setDones() {
  document.getElementById("doneNumber").innerHTML =
    countOccurences("drag_done");
}

function setTaskInBoard() {
  document.getElementById("task_in_board").innerHTML =
    value[currentUserNumber].newAddTask.length;
}

function setInProgress() {
  document.getElementById("in_progress").innerHTML =
    countOccurences("drag_in_progress");
}

function setAwaiting() {
  document.getElementById("awaiting").innerHTML = countOccurences(
    "drag_await_feedback"
  );
}

function setUrgentTasks() {
  findUrgentTasks();
  document.getElementById("urgent_tasks").innerHTML = urgentTasks.length;
}

function countOccurences(status) {
  let count = 0;
  for (let i = 0; i < value[currentUserNumber].newAddTask.length; i++) {
    if (value[currentUserNumber].newAddTask[i].status === status) {
      count++;
    }
  }
  return count;
}

function findUrgentTasks() {
  try {
    let currentValue = value[currentUserNumber];
    if (currentValue && currentValue.newAddTask) {
      currentValue.newAddTask.forEach((task) => {
        if (task.prio === "Urgent") {
          urgentTasks.push(task);
        }
      });
    }
    return urgentTasks;
  } catch {
    console.log("No tasks yet!");
  }
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
  try {
    const tasks = value[currentUserNumber].newAddTask;

    tasks.sort((a, b) => {
      if (a.due_date < b.due_date) return -1;
      if (a.due_date > b.due_date) return 1;
      return 0;
    });

    const nearestTaskDate = formatDate(tasks[0].due_date);
    document.getElementById("nearest_task").innerHTML = nearestTaskDate;
  } catch {
    document.getElementById("nearest_task").innerHTML = "No tasks yet!";
  }
}

function formatDate(inputDate) {
  const months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];
  const parts = inputDate.split("-");
  const year = parts[0];
  const month = months[parseInt(parts[1]) - 1]; // Monatsindex beginnt bei 0
  const day = parts[2];

  return `${month} ${parseInt(day)}, ${year}`;
}

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
  let urgentTextElements = document.querySelectorAll(".urgent_color");
  urgentTextElements.forEach(function (element) {
    element.style.backgroundColor = "#2A3647";
    element.style.color = "white";
  });
}

function restoreTextUrgent() {
  var urgentTextElements = document.querySelectorAll(".urgent_color");
  urgentTextElements.forEach(function (element) {
    element.style.backgroundColor = "";
    element.style.color = "";
  });
}

function changeTextTaskBoard() {
  let urgentTextElements = document.querySelectorAll(".task_board_color");
  urgentTextElements.forEach(function (element) {
    element.style.backgroundColor = "#2A3647";
    element.style.color = "white";
  });
}

function restoreTextcolorBoard() {
  var urgentTextElements = document.querySelectorAll(".task_board_color");
  urgentTextElements.forEach(function (element) {
    element.style.backgroundColor = "";
    element.style.color = "";
  });
}

function changeTextTaskProgress() {
  let urgentTextElements = document.querySelectorAll(".task_progress_color");
  urgentTextElements.forEach(function (element) {
    element.style.backgroundColor = "#2A3647";
    element.style.color = "white";
  });
}

function restoreTextcolorProgress() {
  var urgentTextElements = document.querySelectorAll(".task_progress_color");
  urgentTextElements.forEach(function (element) {
    element.style.backgroundColor = "";
    element.style.color = "";
  });
}

function changeTextTaskFeedback() {
  let urgentTextElements = document.querySelectorAll(
  );
  urgentTextElements.forEach(function (element) {
    element.style.backgroundColor = "#2A3647";
    element.style.color = "white";
  });
}

function restoreTextcolorFeedback() {
  var urgentTextElements = document.querySelectorAll(
    ".awaiting_feedback_color"
  );
  urgentTextElements.forEach(function (element) {
    element.style.backgroundColor = "";
    element.style.color = "";
  });
}
