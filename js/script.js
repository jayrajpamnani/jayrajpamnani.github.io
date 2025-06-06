const hamburger = document.querySelector(".hamburger");
const navMenu = document.querySelector(".nav-menu");

hamburger.addEventListener("click", mobileMenu);

function mobileMenu() {
  hamburger.classList.toggle("active");
  navMenu.classList.toggle("active");
}

// Close navbar when link is clicked
const navLink = document.querySelectorAll(".nav-link");

navLink.forEach((n) => n.addEventListener("click", closeMenu));

function closeMenu() {
  hamburger.classList.remove("active");
  navMenu.classList.remove("active");
}

// Event Listeners: Handling toggle event
const toggleSwitch = document.querySelector(
  '.theme-switch input[type="checkbox"]'
);

function switchTheme(e) {
  if (e.target.checked) {
    document.documentElement.setAttribute("data-theme", "dark");
  } else {
    document.documentElement.setAttribute("data-theme", "light");
  }
}

toggleSwitch.addEventListener("change", switchTheme, false);

//  Store color theme for future visits

function switchTheme(e) {
  if (e.target.checked) {
    document.documentElement.setAttribute("data-theme", "dark");
    localStorage.setItem("theme", "dark"); //add this
  } else {
    document.documentElement.setAttribute("data-theme", "light");
    localStorage.setItem("theme", "light"); //add this
  }
}

// Save user preference on load

const currentTheme = localStorage.getItem("theme")
  ? localStorage.getItem("theme")
  : null;

if (currentTheme) {
  document.documentElement.setAttribute("data-theme", currentTheme);

  if (currentTheme === "dark") {
    toggleSwitch.checked = true;
  }
}

//Adding date

let myDate = document.querySelector("#datee");

const yes = new Date().getFullYear();
myDate.innerHTML = yes;

// Fetch and display GitHub repositories
fetch('https://api.github.com/users/jayrajpamnani/repos')
  .then(response => response.json())
  .then(repos => {
    const projectsContainer = document.getElementById('github-projects');
    if (!projectsContainer) return;
    repos.forEach(repo => {
      const card = document.createElement('div');
      card.className = 'card';
      card.innerHTML = `
        <div class="project-info">
          <div class="project-bio">
            <h3>${repo.name}</h3>
            <p>${repo.description ? repo.description : ''}</p>
          </div>
          <div class="project-link">
            <a href="${repo.html_url}" target="_blank" title="GitHub"><i class="fab fa-github"></i></a>
          </div>
        </div>
      `;
      projectsContainer.appendChild(card);
    });
  })
  .catch(error => {
    const projectsContainer = document.getElementById('github-projects');
    if (projectsContainer) {
      projectsContainer.innerHTML = '<p>Unable to load projects from GitHub at this time.</p>';
    }
  });
