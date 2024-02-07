
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
  }
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
