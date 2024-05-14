// API-URL of GitHub
const APIURL = "https://api.github.com/users/";

const search = document.querySelector("#search");
const form = document.querySelector("#form");
const main = document.querySelector("#main");

// Function to Get the User Name from the Git API

async function getUser(username) {
  try {
    const { data } = await axios(APIURL + username); //here data is an Object has collection of user data

    createUserCard(data);
    getRepos(username);
  } catch (err) {
    // console.log(err);
    if (err.response.status == 404) {
      createErrorCard("No Profile with this User Name");
    }
  }
}
// function to get User's Github repositories
async function getRepos(username) {
  try {
    const { data } = await axios(APIURL + username + "/repos?sort=created"); //here data is in the form of Objects and Object has collection of user data.

    // Adding Repositories detail to Card
    addReposToCard(data);
  } catch (err) {
    createErrorCard("Problem Fetching Repos");
  }
}

// function for User Card
function createUserCard(user) {
  // Creating Dynamic HTML code and Wrapping it in a Template Literal
  const cardHTML = `
    <div class="card">
    <div>
        <img src="${user.avatar_url}" alt="" class="${user.name}">
    </div>
    <div class="user-info">
        <h2>${user.name}</h2>
        <p>${user.bio}
        </p>
        <ul>
            <li>${user.followers} <br> <strong>Followers  </strong></li>
            <li> ${user.following} <br> <strong>Following  </strong></li>
            <li>${user.public_repos} <strong>Repos</strong></li>
        </ul>
        <div id="repos"></div>
</div>`;

  // Adding Informations to the Card
  main.innerHTML = cardHTML;
}

// Function for ErrorCard
function createErrorCard(msg) {
  const CardHTML = `<div class="card">
        <h1>${msg}</h1>
    
    </div>`;
  // Adding Error Message to the Card
  main.innerHTML = CardHTML;
}

// Function to Add Repos
function addReposToCard(repos) {
  const reposEle = document.getElementById("repos");

  repos.slice(0, 5).forEach((repo) => {
    const repoEl = document.createElement("a");
    repoEl.classList.add("repo");
    repoEl.href = repo.html_url;
    repoEl.target = "_blank";
    repoEl.innerText = repo.name;

    reposEle.appendChild(repoEl);
  });
}
// Adding Submit For the Enter Button and Fetching the Details
form.addEventListener("submit", function (e) {
  e.preventDefault();

  const user = search.value;

  if (user) {
    getUser(user);

    search.value = "";
  }
});
