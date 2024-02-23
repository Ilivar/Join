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

async function createSampleTasks() {
  let sampleTasks = {
    id: 0,
    title: "Sample Task",
    description: "have a nice day!",
    assigned_to: "",
    due_date: "2033-02-22",
    prio: "Urgent",
    category: "User Story",
    subtasks: "",
    status: "drag_in_progress",
  };
  addSampleToData(sampleTasks);
}

async function addSampleToData(sampleTasks) {
  let valueLength = (value.length)-1;
  value[valueLength].newAddTask = [];
  value[valueLength].newAddTask.push(sampleTasks);
  addNewSampleContact(valueLength);
}

function addSampleContactToUserData(newContact, valueLength) {
  if (!value[valueLength].contacts) {
    value[valueLength].contacts = [];
  }
  value[valueLength].contacts.push(newContact);
  updateItem("users", value);
}

function addNewSampleContact(valueLength) {
  const newContact = {
    name: value[valueLength].name,
    email: value[valueLength].email,
    phone: "-",
  };
  addSampleContactToUserData(newContact , valueLength);
}

async function isUserNew(user, email) {
  let emailExists = value.some((existingUser) => existingUser.email === email);
  if (emailExists) {
    document
      .getElementById("already_in_use")
      .setAttribute("style", "display: block;");
  } else {
    value.push(user);
    setItem("users", value);
    signInSuccess();
  }
}

function signInSuccess() {
  document.getElementById("overlay").style.display = "flex";
  setTimeout(function () {
    window.location.href = "index.html";
  }, 2000);
}
