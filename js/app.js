/*GLOBAL VARIABLES */
const $navbar = document.querySelector(".navbar");
const $sections = document.querySelectorAll(".section");
const $navbarList = document.querySelector("#navbar-ul");
const $topButton = document.querySelector(".top");
const fragment = document.createDocumentFragment();
const links = [];
const marginTop = 150;
let currentActive = 0;
/*Helper functions */
/* */
/*Main functions */

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
const removeActive = () =>
  [...links].map((link) => {
    link.classList.remove("active");
  });
const addActive = (current) => [...links][current].classList.add("active");

/*Begin Events */

createNavbar($sections);
addActive(currentActive);

document.onscroll = function () {
  /*Sticky Navbar */
  if (window.scrollY >= 10) {
    $navbar.classList.add("sticky");
  } else {
    $navbar.classList.remove("sticky");
  }

  /*To top Bottom */
  if (window.scrollY >= 500) {
    $topButton.classList.add("active");
  } else {
    $topButton.classList.remove("active");
  }

  /*Current section active */
  const current = [...$sections].findIndex(
    (section) =>
      section.offsetTop - window.scrollY - marginTop <= 0 &&
      section.getBoundingClientRect().bottom - marginTop >= 0
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
