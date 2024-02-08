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

function toggleAccordion(element) {
    var content = element.nextElementSibling;
    if (content.style.display === "block") {
      content.style.display = "none";
    } else {
      content.style.display = "block";
    }
  }

let activeButton = null;

function setActiveButton(buttonId, imgSrc, bgColor) {
    if (activeButton) {
        document.getElementById(activeButton).style.background = "";
        document.getElementById(activeButton).style.color = "";
        document.getElementById(activeButton).classList.remove("active");
        if (activeButton === 'buttonUrgent') {
            document.getElementById('buttonUrgent').style.background = "";
            document.getElementById('buttonUrgent').style.color = "";
            document.getElementById('prioImg').src = "../assets/img/Prio up.svg"; 
        } else if (activeButton === 'buttonMedium') {
            document.getElementById('buttonMedium').style.background = "";
            document.getElementById('buttonMedium').style.color = "";
            document.getElementById('mediumImg').src = "../assets/img/Prio media.svg"; 
        } else if (activeButton === 'buttonLow') {
            document.getElementById('buttonLow').style.background = "";
            document.getElementById('buttonLow').style.color = "";
            document.getElementById('lowImg').src = "../assets/img/Prio down.svg"; 
        }
    }
    document.getElementById(buttonId).style.background = bgColor;
    document.getElementById(buttonId).style.color = "white";
    document.getElementById(buttonId).classList.add("active");
    if (imgSrc && buttonId === 'buttonUrgent') {
        document.getElementById('prioImg').src = imgSrc; 
    } else if (imgSrc && buttonId === 'buttonMedium') {
        document.getElementById('mediumImg').src = imgSrc; 
    } else if (imgSrc && buttonId === 'buttonLow') {
        document.getElementById('lowImg').src = imgSrc; 
    }
    activeButton = buttonId;
}

function buttonUrgent() {
    setActiveButton('buttonUrgent', "../assets/img/prio alta.svg", "rgba(255, 61, 0, 1)");
}

function buttonMedium() {
    setActiveButton('buttonMedium', "../assets/img/prio media white.svg", "rgba(255, 168, 0, 1)");
}

function buttonLow() {
    setActiveButton('buttonLow', "../assets/img/Prio baja.svg", "rgba(122, 226, 41, 1)");
}



