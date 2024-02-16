async function init() {
  await loadPreviousMember();
  await loadCurrentUserData();
}


async function createNewMember(event) {
  event.preventDefault();
  let name = document.getElementById("input_name").value;
  let email = document.getElementById("input_mail").value;
  let password = document.getElementById("input_password").value;
  let confirm = document.getElementById("input_confirm").value;

  if (password !== confirm) {
    document
      .getElementById("msg_dont_match")
      .setAttribute("style", "display: block;");
  } else {
    document
      .getElementById("msg_dont_match")
      .setAttribute("style", "display: none;");
    let user = {
      name: name,
      email: email,
      password: password,
    };
    await loadPreviousMember();
    isUserNew(user, email);
    createSampleTasks(user);
  }
}

async function createSampleTasks(user) {
  let sampleTasks = {
    id: 0,
    title: "Sample Task",
    description: "have a nice day!",
    assigned_to: user.name,
    due_date: "2033-02-22",
    prio: "Urgent",
    category: "User Story",
    subtasks: "",
    status: "drag_in_progress"
  }
  addSampleToData(sampleTasks);
}

async function addSampleToData(sampleTasks) {
  loadPreviousMember();
  loadCurrentUserData();
  if (!value[0].newAddTask) {
    value[0].newAddTask = [];
  }
  value[0].newAddTask.push(sampleTasks);
  setItem("users", currentUserData);
}

async function isUserNew(user, email) {
  let emailExists = value.some((existingUser) => existingUser.email === email);
  if (emailExists) {
    document
      .getElementById("already_in_use")
      .setAttribute("style", "display: block;");
  } else {
    value.push(user);
    await setItem(key, value);
    signInSuccess();
  }
}

function signInSuccess() {
  document.getElementById("overlay").style.display = "flex";
  setTimeout(function () {
    window.location.href = "index.html";
  }, 2000);
}

