document.addEventListener("DOMContentLoaded", function() {
    let acc = document.getElementById('accordion');
acc.addEventListener("click", function() {
  this.classList.toggle("active");
  let panel = this.nextElementSibling;
  if (panel.style.display === "block") {
    panel.style.display = "none";
  } else {
    panel.style.display = "block";
  }
});
});

function buttonUrgent() {
    document.getElementById('buttonUrgent').style.background = "rgba(255, 61, 0, 1)";
    document.getElementById('buttonUrgent').style.color = "white";
    document.getElementById('prioImg').src = "../assets/img/prio alta.svg";
}

function buttonMedium() {
    document.getElementById('buttonMedium').style.background = "rgba(255, 168, 0, 1)";
    document.getElementById('buttonMedium').style.color = "white";
    document.getElementById('mediumImg').src = "../assets/img/prio media white.svg";
}

function buttonLow() {
    document.getElementById('buttonLow').style.background = "rgba(122, 226, 41, 1)";
    document.getElementById('buttonLow').style.color = "white";
    document.getElementById('lowImg').src = "../assets/img/Prio baja.svg";
}

