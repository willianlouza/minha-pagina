const body = document.body;
const header = document.getElementById("header");
const toggleColor = document.getElementById("toggleColor");
const eye = document.getElementById("eye");
const links = document.querySelectorAll("a");

const navBtns = document.querySelectorAll(".navBtn");
const gameBtn = document.getElementById("jogos");

const home = document.getElementById("cHome");
const sobre = document.getElementById("cSobre");
const habilidades = document.getElementById("cHabilidades");
const contato = document.getElementById("cContato");

const wppURL = "https://api.whatsapp.com/send?phone=5521965597809&text=";
const githubURL = "https://github.com/willianlouza";
const linkedinURL = "https://www.linkedin.com/in/willian-louza/";
const wppBtn = document.getElementById("wppBtn");
const githubBtn = document.getElementById("github");
const linkedinBtn = document.getElementById("linkedin");
const cvBtn = document.getElementById("getCV");

const colorIcons = [
  document.getElementById("html"),
  document.getElementById("css"),
  document.getElementById("js"),
  document.getElementById("unity"),
  document.getElementById("csharp"),
  document.getElementById("phone"),
  document.getElementById("email"),
  document.getElementById("linkedin"),
  document.getElementById("github"),
  document.getElementById("louza"),
];

let wasSelected = false;

applyTheme();

navigation();

toggleColor.addEventListener("click", (e) => {
  setTheme();
});

function applyTheme() {
  if (window.localStorage.getItem("theme") == "dark") {
    body.classList.add("dark_mode");
    header.classList.add("dark_mode");
    toggleElementsColor(true);
  } else {
    body.classList.remove("dark_mode");
    header.classList.remove("dark_mode");
    toggleElementsColor(false);
  }
}

export function setTheme(theme = "") {
  //Check the current theme
  if (theme === "") {
    if (window.localStorage.getItem("theme") == "dark") {
      //Become white
      body.classList.remove("dark_mode");
      header.classList.remove("dark_mode");
      toggleElementsColor(false);
      window.localStorage.setItem("theme", "light");
    } else {
      //Become dark
      body.classList.add("dark_mode");
      header.classList.add("dark_mode");
      toggleElementsColor(true);
      window.localStorage.setItem("theme", "dark");
    }
  } else if (theme === "dark") {
    body.classList.add("dark_mode");
    header.classList.add("dark_mode");
    toggleElementsColor(true);
    window.localStorage.setItem("theme", "dark");
  } else if (theme === "light") {
    body.classList.remove("dark_mode");
    header.classList.remove("dark_mode");
    toggleElementsColor(false);
    window.localStorage.setItem("theme", "light");
  }
}
function toggleElementsColor(value) {
  links.forEach((link) => {
    link.style.color = value ? "var(--light-color)" : "var(--dark-color)";
  });
  colorIcons.forEach((icon) => {
    icon.style.backgroundImage = value
      ? `url('../assets/img/Icons/${icon.id}-white.png')`
      : `url('../assets/img/Icons/${icon.id}-black.png')`;
  });
  toggleColor.style.backgroundImage = value
    ? "url('../assets/img/Icons/Light.png')"
    : "url('../assets/img/Icons/Dark.png')";
}

body.addEventListener("mousemove", function (e) {
  var x = eye.offsetLeft + eye.clientWidth / 2;
  var y = eye.offsetTop + eye.clientHeight / 2;
  var rad = Math.atan2(e.pageX - x, e.pageY - y);

  var rot = rad * (180 / Math.PI) * -1 + 180;
  eye.style.transform = `rotate(${rot}deg)`;
});

function navigation() {
  navBtns.forEach((btn) => {
    btn.onclick = () => {
      select(btn);
      wasSelected = true;
      setTimeout(() => {
        wasSelected = false;
      }, 500);
    };
  });
  gameBtn.onclick = (e) => {
    window.open("../game-gallery/gameplayer.html", "_blank").focus();
  };
}

function select(btn) {
  restore();
  btn.classList.add("select");
  function restore() {
    navBtns.forEach((btn) => {
      if (btn.classList.contains("select")) {
        btn.classList.remove("select");
      }
    });
  }
}

function isInViewport(element) {
  const rect = element.getBoundingClientRect();
  return (
    rect.top >= 0 &&
    rect.left >= 0 &&
    rect.bottom <=
      (window.innerHeight || document.documentElement.clientHeight) &&
    rect.right <= (window.innerWidth || document.documentElement.clientWidth)
  );
}

cvBtn.addEventListener("click", () => {
  window.open("../assets/CV.pdf", "_blank").focus();
});
wppBtn.addEventListener("click", () => {
  window.open(wppURL, "_blank").focus();
});
linkedinBtn.addEventListener("click", () => {
  window.open(linkedinURL, "_blank").focus();
});
githubBtn.addEventListener("click", () => {
  window.open(githubURL, "_blank").focus();
});
window.addEventListener("scroll", () => {
  if (wasSelected) return;

  if (isInViewport(home)) {
    select(navBtns[0]);
  }
  if (isInViewport(sobre)) {
    select(navBtns[1]);
  }
  if (isInViewport(habilidades)) {
    select(navBtns[2]);
  }
  if (isInViewport(contato)) {
    select(navBtns[3]);
  }
});
