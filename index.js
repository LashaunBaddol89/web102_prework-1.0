document.querySelectorAll('.stats-card').forEach(card => {
  const video = card.querySelector('.game-video');

  card.addEventListener('mouseover', () => {
      video.play();
  });

  card.addEventListener('mouseout', () => {
      video.pause();
      video.currentTime = 0; // Optional: reset video to the beginning
  });
});

document.addEventListener('DOMContentLoaded', function () {
  var scene = document.getElementById('scene');
  var parallax = new Parallax(scene);
});

let slideIndex = 0;
showSlides();

function showSlides() {
  let i;
  let slides = document.getElementsByClassName("mySlides");
  let dots = document.getElementsByClassName("dot");
  for (i = 0; i < slides.length; i++) {
      slides[i].style.display = "none";  
  }
  slideIndex++;
  if (slideIndex > slides.length) {slideIndex = 1}    
  for (i = 0; i < dots.length; i++) {
      dots[i].className = dots[i].className.replace(" active", "");
  }
  slides[slideIndex-1].style.display = "block";  
  dots[slideIndex-1].className += " active";
  setTimeout(showSlides, 3000); // Change image every 3 seconds
}



function updateProgressBars(games) {
    games.forEach(game => {
        const progressBarFill = document.querySelector(`#game-${game.id} .progress-bar-fill`);
        const progressPercentage = (game.pledged / game.goal) * 100;
        progressBarFill.style.width = `${progressPercentage}%`;
    });
}

document.addEventListener('DOMContentLoaded', (event) => {
    const toggleSwitch = document.getElementById('toggle-switch');
    toggleSwitch.addEventListener('change', function() {
      document.body.classList.toggle('night-mode');
    });
});

document.querySelectorAll('.like-button').forEach(button => {
    button.addEventListener('click', function() {
        const likeCount = this.querySelector('.like-count');
        likeCount.textContent = parseInt(likeCount.textContent) + 1;
    });
});
AOS.init({
  

    // Settings that can be overridden on per-element basis, by `data-aos-*` attributes:
    offset: 120, // offset (in px) from the original trigger point
    delay: 0, // values from 0 to 3000, with step 50ms
    duration: 400, // values from 0 to 3000, with step 50ms
    easing: 'ease', // default easing for AOS animations
    once: false, // whether animation should happen only once - while scrolling down
    mirror: false, // whether elements should animate out while scrolling past them
    anchorPlacement: 'top-bottom', // defines which position of the element regarding to window should trigger the animation
});
const GAMES_JSON = JSON.parse(GAMES_DATA);

const searchBtn = document.getElementById('search-btn');
const searchInput = document.getElementById('search-input');
const sidePanel = document.getElementById('side-panel');
const closePanelBtn = document.getElementById('close-panel-btn');
const searchResults = document.getElementById('search-results');

// Function to display search results in the side panel
function displaySearchResults(results) {
  searchResults.innerHTML = ''; // Clear previous results

  if (results.length === 0) {
    searchResults.innerHTML = '<p>No games found.</p>';
    return;
  }

  results.forEach(game => {
    const gameCard = document.createElement('div');
    gameCard.classList.add('game-card');
    gameCard.innerHTML = `
      <img src="${game.img}" alt="${game.name}" />
      <h3>${game.name}</h3>
      <p>${game.description}</p>
      <p><strong>Pledged:</strong> $${game.pledged.toLocaleString()}</p>
      <p><strong>Goal:</strong> $${game.goal.toLocaleString()}</p>
      <p><strong>Backers:</strong> ${game.backers.toLocaleString()}</p>
    `;
    searchResults.appendChild(gameCard);
  });
}

// Function to handle search
function searchGames() {
  const query = searchInput.value.toLowerCase();

  // Filter games based on the search query
  const filteredGames = GAMES_JSON.filter(game => 
    game.name.toLowerCase().includes(query) || 
    game.description.toLowerCase().includes(query)
  );

  displaySearchResults(filteredGames);
}

// Show side panel
searchBtn.addEventListener('click', () => {
  sidePanel.style.display = 'block';
  searchGames(); // Display initial search results
});

// Close side panel
closePanelBtn.addEventListener('click', () => {
  sidePanel.style.display = 'none';
});

// Optional: Update search results when input changes
searchInput.addEventListener('input', searchGames);
/*****************************************************************************
 * Challenge 2: Review the provided code. The provided code includes:
 * -> Statements that import data from games.js
 * -> A function that deletes all child elements from a parent element in the DOM
*/

// import the JSON data about the crowd funded games from the games.js file
import GAMES_DATA from './games.js';



// remove all child elements from a parent element in the DOM
function deleteChildElements(parent) {
    while (parent.firstChild) {
        parent.removeChild(parent.firstChild);
    }
}

/*****************************************************************************
 * Challenge 3: Add data about each game as a card to the games-container
 * Skills used: DOM manipulation, for loops, template literals, functions
*/


// grab the element with the id games-container
const gamesContainer = document.getElementById("games-container");

// create a function that adds all data from the games array to the page
function addGamesToPage(games) {
    games.forEach(game => {
        // create a new div element, which will become the game card
        const gameCard = document.createElement("div");
        // add the class game-card to the list
        gameCard.classList.add("game-card");
        // set the inner HTML using a template literal to display some info about each game
        gameCard.innerHTML = `
            <img src="${game.img}" alt="${game.name}" />
            <h3>${game.name}</h3>
            <p>${game.description}</p>
            <p><strong>Pledged:</strong> $${game.pledged.toLocaleString()}</p>
            <p><strong>Goal:</strong> $${game.goal.toLocaleString()}</p>
            <p><strong>Backers:</strong> ${game.backers.toLocaleString()}</p>
        `;
        // append the game to the games-container
        gamesContainer.appendChild(gameCard);
    });
}

// call the function we just defined using the correct variable
addGamesToPage(GAMES_JSON);

/*************************************************************************************
 * Challenge 4: Create the summary statistics at the top of the page displaying the
 * total number of contributions, amount donated, and number of games on the site.
 * Skills used: arrow functions, reduce, template literals
*/

// grab the contributions card element
const contributionsCard = document.getElementById("num-contributions");

// use reduce() to count the number of total contributions by summing the backers
const totalContributions = GAMES_JSON.reduce((total, game) => total + game.backers, 0);

// set the inner HTML using a template literal and toLocaleString to get a number with commas
contributionsCard.innerHTML = `${totalContributions.toLocaleString()}`;

// grab the amount raised card, then use reduce() to find the total amount raised
const raisedCard = document.getElementById("total-raised");

// set inner HTML using template literal
const totalRaised = GAMES_JSON.reduce((total, game) => total + game.pledged, 0);
raisedCard.innerHTML = `$${totalRaised.toLocaleString()}`;

// grab number of games card and set its inner HTML
const gamesCard = document.getElementById("num-games");
gamesCard.innerHTML = `${GAMES_JSON.length}`;

/*************************************************************************************
 * Challenge 5: Add functions to filter the funded and unfunded games
 * total number of contributions, amount donated, and number of games on the site.
 * Skills used: functions, filter
*/

// show only games that do not yet have enough funding
function filterUnfundedOnly() {
    deleteChildElements(gamesContainer);

    // use filter() to get a list of games that have not yet met their goal
    const unfundedGames = GAMES_JSON.filter(game => game.pledged < game.goal);

    // use the function we previously created to add the unfunded games to the DOM
    addGamesToPage(unfundedGames);
}

// show only games that are fully funded
function filterFundedOnly() {
    deleteChildElements(gamesContainer);

    // use filter() to get a list of games that have met or exceeded their goal
    const fundedGames = GAMES_JSON.filter(game => game.pledged >= game.goal);

    // use the function we previously created to add funded games to the DOM
    addGamesToPage(fundedGames);
}

// show all games
function showAllGames() {
    deleteChildElements(gamesContainer);

    // add all games from the JSON data to the DOM
    addGamesToPage(GAMES_JSON);
}

// select each button in the "Our Games" section
const unfundedBtn = document.getElementById("unfunded-btn");
const fundedBtn = document.getElementById("funded-btn");
const allBtn = document.getElementById("all-btn");

// add event listeners with the correct functions to each button
unfundedBtn.addEventListener('click', filterUnfundedOnly);
fundedBtn.addEventListener('click', filterFundedOnly);
allBtn.addEventListener('click', showAllGames);


/*************************************************************************************
 * Challenge 6: Add more information at the top of the page about the company.
 * Skills used: template literals, ternary operator
*/

// grab the description container
const descriptionContainer = document.getElementById("description-container");
descriptionContainer.innerHTML = '';
// use filter or reduce to count the number of unfunded games
const unfundedGamesCount = GAMES_JSON.filter(game => game.pledged < game.goal).length;

// create a string that explains the number of unfunded games using the ternary operator
const unfundedGamesStr = unfundedGamesCount === 1
    ? `there is 1 unfunded game.`
    : ` A total of $800,268 has been raised for 11 games. Currently there are ${unfundedGamesCount} unfunded games. We need your help with the rest.`;


const purposeElement = document.createElement("p");
purposeElement.innerHTML = `The purpose of our company is to fund independent games. We've been in operation for 12 years.`;

const unfundedGamesElement = document.createElement("p");
unfundedGamesElement.innerHTML = unfundedGamesStr;


descriptionContainer.appendChild(purposeElement);
descriptionContainer.appendChild(unfundedGamesElement);
/************************************************************************************
 * Challenge 7: Select & display the top 2 games
 * Skills used: spread operator, destructuring, template literals, sort 
 */
const firstGameContainer = document.getElementById("first-game");
const secondGameContainer = document.getElementById("second-game");

const [topGame, runnerUp] = GAMES_JSON.sort((a, b) => b.pledged - a.pledged);

// create a new element to hold the name of the top pledge game, then append it to the correct element

const topGameElement = document.createElement("div");
topGameElement.classList.add("top-game-card"); 
topGameElement.innerHTML = `
    <img src="${topGame.img}" alt="${topGame.name}" />
    <h3>${topGame.name}</h3>
    <p>${topGame.description}</p>
    <p><strong>Pledged:</strong> $${topGame.pledged.toLocaleString()}</p>
    <p><strong>Goal:</strong> $${topGame.goal.toLocaleString()}</p>
    <p><strong>Backers:</strong> ${topGame.backers.toLocaleString()}</p>
`;
firstGameContainer.appendChild(topGameElement);

// For runner-up game
const runnerUpElement = document.createElement("div");
runnerUpElement.classList.add("runner-up-card"); 
runnerUpElement.innerHTML = `
    <img src="${runnerUp.img}" alt="${runnerUp.name}" />
    <h3>${runnerUp.name}</h3>
    <p>${runnerUp.description}</p>
    <p><strong>Pledged:</strong> $${runnerUp.pledged.toLocaleString()}</p>
    <p><strong>Goal:</strong> $${runnerUp.goal.toLocaleString()}</p>
    <p><strong>Backers:</strong> ${runnerUp.backers.toLocaleString()}</p>
`;
secondGameContainer.appendChild(runnerUpElement);