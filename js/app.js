/*GLOBAL VARIABLES */
const $navbar = document.querySelector(".navbar");
const $sections = document.querySelectorAll(".section");
const $navbarList = document.querySelector("#navbar-ul");
const fragment = document.createDocumentFragment();
const links = [];
const marginTop = 100;
let currentActive = 0;
/*Helper functions */
/* */
/*Main functions */

//CREATE NAVBAR
const createNavbar = (sections) => {
  sections.forEach((item) => {
    const sectionName = item.dataset.nav;
    const newElement = document.createElement("li");
    newElement.classList.add("navbar__item");
    newElement.innerHTML = `<a href="#${sectionName}" class="navbar__link">${sectionName}</a>`;
    links.push(newElement);

    fragment.appendChild(newElement);
  });
  $navbarList.appendChild(fragment);
};

// REMOVING ACTIVE FUNCTION
const removeActive = () =>
  [...links].map((link) => {
    link.classList.remove("active");
  });

// ADDING ACTIVE FUNCTION
const addActive = (current) => [...links][current].classList.add("active");

/*Begin Events */
createNavbar($sections);
addActive(currentActive);

document.onscroll = function () {
  if (window.scrollY >= 10) {
    $navbar.classList.add("sticky");
  } else {
    $navbar.classList.remove("sticky");
  }
  const current = [...$sections].findIndex(
    (section) =>
      section.offsetTop - window.scrollY <= 0 &&
      section.getBoundingClientRect().bottom >= 0
  );

  if (current !== currentActive) {
    removeActive();
    if (current == -1) {
      currentActive = 0;
    } else {
      currentActive = current;
    }

    addActive(currentActive);
  }
};
