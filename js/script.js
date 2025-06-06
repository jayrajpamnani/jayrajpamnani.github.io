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
async function fetchGitHubRepos() {
  const projectsContainer = document.getElementById('github-projects');
  if (!projectsContainer) return;

  try {
    const response = await fetch('https://api.github.com/users/jayrajpamnani/repos', {
      headers: {
        'Accept': 'application/vnd.github+json'
      }
    });

    // Check for rate limiting
    if (response.status === 403) {
      const resetTime = response.headers.get('X-RateLimit-Reset');
      const resetDate = new Date(resetTime * 1000);
      projectsContainer.innerHTML = `<p>GitHub API rate limit exceeded. Please try again after ${resetDate.toLocaleTimeString()}</p>`;
      return;
    }

    if (!response.ok) {
      throw new Error(`GitHub API responded with status: ${response.status}`);
    }

    const repos = await response.json();
    
    if (!Array.isArray(repos) || repos.length === 0) {
      projectsContainer.innerHTML = '<p>No public projects found.</p>';
      return;
    }

    // Sort repos by most recently updated
    repos.sort((a, b) => new Date(b.updated_at) - new Date(a.updated_at));

    // Clear existing content
    projectsContainer.innerHTML = '';

    // Display repos in text format
    repos.forEach(repo => {
      const projectDiv = document.createElement('div');
      projectDiv.className = 'project-item';
      
      // Create project title and link
      const titleLink = document.createElement('h3');
      titleLink.innerHTML = `<a href="${repo.html_url}" target="_blank">${repo.name}</a>`;
      
      // Create description paragraph
      const description = document.createElement('p');
      description.textContent = repo.description || 'No description available';
      
      // Create topics/tags if available
      let topicsHtml = '';
      if (repo.topics && repo.topics.length > 0) {
        topicsHtml = `<div class="project-topics">${repo.topics.map(topic => `<span class="topic-tag">${topic}</span>`).join(' ')}</div>`;
      }
      
      projectDiv.innerHTML = `
        <h3><a href="${repo.html_url}" target="_blank">${repo.name}</a></h3>
        <p>${repo.description || 'No description available'}</p>
        ${topicsHtml}
      `;
      
      projectsContainer.appendChild(projectDiv);
    });

    // Debug: Show raw JSON on the page for troubleshooting
    const debugDiv = document.createElement('pre');
    debugDiv.style.background = '#f8f8f8';
    debugDiv.style.color = '#333';
    debugDiv.style.fontSize = '0.8rem';
    debugDiv.style.overflowX = 'auto';
    debugDiv.textContent = JSON.stringify(repos, null, 2);
    projectsContainer.appendChild(debugDiv);
  } catch (error) {
    console.error('Error fetching GitHub projects:', error);
    projectsContainer.innerHTML = `
      <p>Unable to load projects from GitHub at this time.</p>
      <p>Error: ${error.message}</p>
    `;
  }
}

// Call the function when the page loads
document.addEventListener('DOMContentLoaded', fetchGitHubRepos);
