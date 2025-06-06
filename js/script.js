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
  .then(response => {
    console.log('GitHub API response status:', response.status);
    return response.json();
  })
  .then(repos => {
    const projectsContainer = document.getElementById('github-projects');
    if (!projectsContainer) return;
    if (!Array.isArray(repos) || repos.length === 0) {
      console.log('No repositories found or API returned an empty array:', repos);
      projectsContainer.innerHTML = '<p>No public projects found.</p>';
      return;
    }
    repos.forEach(repo => {
      const projectDiv = document.createElement('div');
      projectDiv.className = 'project-title-link';
      projectDiv.innerHTML = `
        <h3>${repo.name}</h3>
        <a href="${repo.html_url}" target="_blank" style="font-size:0.9rem; color:#0077b5; text-decoration:underline;">View on GitHub</a>
      `;
      projectsContainer.appendChild(projectDiv);
    });
  })
  .catch(error => {
    const projectsContainer = document.getElementById('github-projects');
    if (projectsContainer) {
      projectsContainer.innerHTML = '<p>Unable to load projects from GitHub at this time.</p>';
    }
    console.error('Error fetching GitHub projects:', error);
  });
