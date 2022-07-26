import { setTheme } from "./index.js";
const terminal = document.getElementById("console");
const consoleInput = document.getElementById("consoleInput");
const consoleOutput = document.getElementById("consoleOutput");
const openConsole = document.getElementById("openConsole");
const scrollArea = document.getElementById("consoleOutputArea");
const path = "../commands.json";
var isActive = false;

const wppURL = "https://api.whatsapp.com/send?phone=5521965597809&text=";
const githubURL = "https://github.com/willianlouza";
const linkedinURL = "https://www.linkedin.com/in/willian-louza/";

const commands = [
  "help",
  "dark",
  "light",
  "clear",
  "quit",
  "games",
  "wpp",
  "github",
  "lkdin",
  "cv",
];



dragElement(terminal);




function cleanString(str) {
  let result = str.replace(/"/g, "");
  result = result.replace("{", "");
  result = result.replace("}", "");
  result = result.replace(/:/g, " \t");
  result = result.replace(/,/g, " \n");
  return result;
}
openConsole.addEventListener("click", (_) => {
  _.preventDefault();
  if (isActive) {
    isActive = false;
    closeTerminal();
  } else {
    isActive = true;
    openTerminal();
  }
});
function openTerminal() {
  terminal.style.display = "block";
  consoleOutput.innerHTML = "Digite help para ver a lista de comandos.";
  openConsole.style.transform = "scale(1.1)";
}
function closeTerminal() {
  terminal.style.display = "none";
  openConsole.style.transform = "scale(1.0)";
}
function print(text) {
  consoleOutput.innerHTML += "\n" + text;
}
function loadJSON(json) {
  return fetch(json).then(function (response) {
    return response.json();
  });
}
consoleInput.addEventListener("input", (_) => {
  _.preventDefault();
  consoleInput.style.color = "white";
  validateCommand();
});
consoleInput.addEventListener("change", (_) => {
  _.preventDefault();
  validateCommandWhitCallback((command) => {
    if (command === "err") {
      print("Commando Inválido");
    } else {
      print(command);
      run(command);
    }
  });
  consoleInput.style.color = "white";
  consoleInput.value = "";
  autoScroll();
});
function run(command) {
  switch (command) {
    case "help":
      help();
      break;
    case "clear":
      clear();
      break;
    case "quit":
      quit();
      break;
    case "dark":
      setTheme('dark');
      break;
      case "light":
        setTheme('light')
        break;
    case "games":
      games();
      break;
    case "wpp":
      wpp();
      break;
    case "github":
      github();
      break;
    case "lkdin":
      lkdin();
      break;
    case "cv":
      cv();
      break;
  }
}
function autoScroll() {
  scrollArea.scrollTop = scrollArea.scrollHeight;
}
function validateCommand() {
  let value = consoleInput.value;
  commands.forEach((com) => {
    if (com === value) {
      consoleInput.style.color = "rgb(2, 255, 99)";
    }
  });
}
function validateCommandWhitCallback(callback) {
  let value = consoleInput.value;
  let validate = false;
  let command = "";
  commands.forEach((com) => {
    if (com === value) {
      validate = true;
      command = com;
    }
  });
  if (validate) {
    callback(command);
  } else {
    callback("err");
  }
}
function help() {
  loadJSON(path).then((result) => {
    let str = JSON.stringify(result);
    consoleOutput.innerHTML += "\n" + cleanString(str);
  });
}
function clear() {
  consoleOutput.innerHTML = "";
}
function quit() {
  closeTerminal();
}
function games() {
  window.open("../game-gallery/gameplayer.html", "_blank").focus();
}
function wpp() {
  window.open(wppURL, "_blank").focus();
}
function github() {
  window.open(githubURL, "_blank").focus();
}
function lkdin() {
  window.open(linkedinURL, "_blank").focus();
}
function cv() {
  window.open("../assets/CV.pdf", "_blank").focus();
}
function dragElement(el) {
  var pos1 = 0,
    pos2 = 0,
    pos3 = 0,
    pos4 = 0;
  if (document.getElementById(el.id + "-header")) {
    // if present, the header is where you move the DIV from:
    document.getElementById(el.id + "-header").onmousedown = dragMouseDown;
  } else {
    // otherwise, move the DIV from anywhere inside the DIV:
    el.onmousedown = dragMouseDown;
  }

  function dragMouseDown(e) {
    e = e || window.event;
    e.preventDefault();
    // get the mouse cursor position at startup:
    pos3 = e.clientX;
    pos4 = e.clientY;
    document.onmouseup = closeDragElement;
    // call a function whenever the cursor moves:
    document.onmousemove = elementDrag;
  }

  function elementDrag(e) {
    e = e || window.event;
    e.preventDefault();
    // calculate the new cursor position:
    pos1 = pos3 - e.clientX;
    pos2 = pos4 - e.clientY;
    pos3 = e.clientX;
    pos4 = e.clientY;
    // set the element's new position:
    el.style.top = el.offsetTop - pos2 + "px";
    el.style.left = el.offsetLeft - pos1 + "px";
  }

  function closeDragElement() {
    // stop moving when mouse button is released:
    document.onmouseup = null;
    document.onmousemove = null;
  }
}
