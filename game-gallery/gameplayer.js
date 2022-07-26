const gameImg = document.querySelectorAll("#game-card");
const splash = document.getElementById("splash");
const gameWindow = document.getElementById("game-window");
const min_width = 960;
const path = "./gallery.json";
const games = ["next", "hollow", "felpudo", "futuman", "gunslinger"];



var cardWidth = gameImg[0].clientWidth;
var windowWidth = window.innerWidth;

var is_sidebar = windowWidth >= min_width ? true : false;

var gallery = null;
var galleryLoaded = false;



init();
gallery_select();

window.addEventListener("resize", function () {
  is_sidebar = windowWidth <= min_width ? true : false;
  windowWidth = window.innerWidth;
  if (is_sidebar) {
    cardWidth = gameImg[0].clientWidth;
  } else {
    cardWidth = gameImg[0].clientHeight;
  }
});



function init(){
  fetch(path)
  .then(response => response.json())
  .then(json => {
    gallery = json;
    galleryLoaded = true;
  });
}

function gallery_select() {
  gameImg.forEach((el) => {
    el.addEventListener("mouseover", function (e) {
      if (isSelected(el)) return;
      expand(el);
    });

    el.addEventListener("mouseleave", function (e) {
      if (isSelected(el)) return;
      collapse(el);
    });

    el.addEventListener("click", function (e) {
      e.preventDefault();

      if(galleryLoaded == false) return;
      if(isSelected(el)) return;

      games.forEach(title => {
          if(el.classList.contains(title)){
            splash.style.display = 'none';
            //Load the game
            gallery.forEach(item => {
              if(item.title == title.toString())
              {
                gameWindow.setAttribute("src", `${item.url}`);
              }
            });
          }
      });

      gameImg.forEach((el) => {
        deselect(el);
      });

      select(el);
    });
  });
}

function isSelected(el) {
  if(el.getAttribute('data-select') == "true"){
    return true;
  }else{
    return false;
  }
}

function select(element) {
  var cd = element.childNodes[5];

  cd.removeAttribute("hidden");
  element.setAttribute("data-select", true);
  element.classList.add("select");

  expand(element);
}
function deselect(element) {
  var cd = element.childNodes[5];

  cd.setAttribute("hidden", true);
  element.setAttribute("data-select", false);
  element.classList.remove("select");

  collapse(element);
}
function expand(element) {
  var title = element.childNodes[3];
  title.style.bottom = "0";
}

function collapse(element) {
  var title = element.childNodes[3];
  title.style.bottom = "-50px";
}
