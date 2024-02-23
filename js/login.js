let username;

function init() {
  loadPreviousMember();
  loadFromLocalStorage();
}

function login() {
  let email = document.getElementById("inputMail").value;
  let password = document.getElementById("inputPassword").value;

  for (let user of value) {
    if (user.email === email && user.password === password) {
      username = user.name;
      setCurrentUser(user.email);
      setUserNumber(value, user.email);
      rememberMe();
      window.location.href = "../html/summary.html";
    } else {
      document
        .getElementById("wrong_data")
        .setAttribute("style", "display: block;");
    }
  }
}

function setUserNumber(value, userEmail) {
  for (let i = 0; i < value.length; i++) {
    if (value[i].email === userEmail) {
      localStorage.setItem("currentUserNumber", i);
      console.log(i);
      return;
    }
  }
}

function rememberMe() {
  let currentMail = document.getElementById("inputMail").value;
  if (document.getElementById("remember_check").checked) {
    localStorage.setItem("email", currentMail);
  } else {
    document.getElementById("inputMail").value = "";
    localStorage.removeItem("email");
  }
}

function loadFromLocalStorage() {
  let inputMail = localStorage.getItem("email");
  if (inputMail) {
    document.getElementById("remember_check").checked = true;
    document.getElementById("inputMail").value = inputMail;
  }
}

function setCurrentUser(currentMail) {
  localStorage.setItem("user", currentMail, username);
}

document.addEventListener("DOMContentLoaded", function () {
  var mobileAnimation = document.getElementById("mobile_animation");

  mobileAnimation.addEventListener("animationend", function () {
    mobileAnimation.style.display = "none";
  });
});
