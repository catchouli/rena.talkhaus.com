// Whether the game is started
var gameStarted = false;

// The current game score
var currentScore = 0;

// The flavor text element
var flavorText = null;

// The score text element
var scoreText = null;

// The game over text element
var gameOverText = null;

// The keroppi object
var keroppi = null;

// The chilli that was already on the page (secret :P)
var pageChilli = null;

// The interval id for the update interval
var updateInterval = null;

// The currently spawned chillis
var chillis = [];

// Temp
var updateCount = 0;

// The last update time
var lastUpdate = 0;

// The current time between chillis (decreases over time for difficulty)
var curChilliTimeInterval = 0;

// The time of the next chilli spawn
var nextChilliSpawn = 0;

// The mouse x and y
var mouseX = 0;
var mouseY = 0;

// Constants
var INITIAL_CHILLI_TIME_INTERVAL = 1000;
var GRAVITY_CONSTANT = 0.00002;

// Start the chilli game
function startChilliGame() {
  // Make sure the game can only be started once
  if (gameStarted)
    return;

  console.log("chilli game started!");
  gameStarted = true;

  // Create score text
  updateScoreText();

  // Set the default chilli interval
  curChilliTimeInterval = INITIAL_CHILLI_TIME_INTERVAL;

  // Get page chilli
  pageChilli = document.getElementById("pagechilli");

  // Initialise timers
  lastUpdate = new Date().getTime();
  nextChilliSpawn = lastUpdate + curChilliTimeInterval;

  // Create keroppi
  keroppi = createKeroppi();

  // Add mouse handler
  document.onmousemove = function(event) {
    mouseX = event.pageX - window.scrollX;
    mouseY = event.pageY - window.scrollY;
  };

  // Start game updates
  updateInterval = setInterval(updateChillis, 20);
}

// Called every now and again
function updateChillis() {
  // Update timers
  var time = new Date().getTime();
  var dt = time - lastUpdate;

  // Update keroppi
  keroppi.pos.x = (mouseX - keroppi.size.x / 2);
  keroppi.pos.y = (mouseY - keroppi.size.y / 2);
  keroppi.img.style.left = keroppi.pos.x + "px";
  keroppi.img.style.top = keroppi.pos.y + "px";

  // Get keroppi top left and bottom right
  var keroTopLeft = keroppi.pos;
  var keroBottomRight = { x: keroTopLeft.x + keroppi.size.x, y: keroTopLeft.y + keroppi.size.y };

  // Let keroppi eat the page chilli as a joke :P
  var pageChilliBounds = pageChilli.getBoundingClientRect();
  var pageChilliTopLeft = { x: pageChilliBounds.x, y: pageChilliBounds.y };
  var pageChilliBottomRight = { x: pageChilliBounds.x + pageChilliBounds.width, y: pageChilliBounds.y + pageChilliBounds.height };
  if (currentScore > 0 && !pageChilli.style.opacity &&
      pageChilliTopLeft.x <= keroBottomRight.x && pageChilliTopLeft.y <= keroBottomRight.y &&
      pageChilliBottomRight.x >= keroTopLeft.x && pageChilliBottomRight.y >= keroTopLeft.y) {
    pageChilli.style.opacity = 0;
    ++currentScore;
    updateScoreText();
  }

  // Spawn a new chilli if it's time
  if (time > nextChilliSpawn) {
    curChilliTimeInterval *= 0.97;
    nextChilliSpawn = time + curChilliTimeInterval;
    spawnChilli();
  }

  // Update each chilli
  for (var i = 0; i < chillis.length; ++i) {
    chillis[i].velocity.y += GRAVITY_CONSTANT * dt * dt;

    chillis[i].pos.x += chillis[i].velocity.x * dt;
    chillis[i].pos.y += chillis[i].velocity.y * dt;

    chillis[i].img.style.left = chillis[i].pos.x + "px";
    chillis[i].img.style.top = chillis[i].pos.y + "px";

    // Have keroppi eat chillis that he touches
    var chilliTopLeft = chillis[i].pos;
    var chilliBottomRight = { x: chilliTopLeft.x + chillis[i].size.x, y: chilliTopLeft.y + chillis[i].size.y };

    if (chilliTopLeft.x <= keroBottomRight.x && chilliTopLeft.y <= keroBottomRight.y &&
        chilliBottomRight.x >= keroTopLeft.x && chilliBottomRight.y >= keroTopLeft.y) {
      console.log('om!');
      currentScore++;
      updateScoreText();
      chillis[i].img.remove();
      chillis.splice(i, 1);
      --i;
      continue;
    }

    // Delete chillis when they go offscreen
    if (chillis[i].pos.y > window.innerHeight) {
      // For now just game over if they drop one
      createGameOverText();
      clearInterval(updateInterval);

      // In theory we can remove the chilli and keep iterating like this
      chillis[i].img.remove();
      chillis.splice(i, 1);
      --i;
      continue;
    }
  }

  // Update lastUpdate
  lastUpdate = time;
}

// Create keroppi
function createKeroppi() {
  // Create new chilli img
  var keroppiImg = document.createElement("img");
  keroppiImg.src = "/assets/images/keroppi.gif";
  document.body.appendChild(keroppiImg);

  // Set styles
  keroppiImg.style.position = 'fixed';
  keroppiImg.style.left = 0;
  keroppiImg.style.top = 0;

  return {
    img: keroppiImg,
    pos: { x: 0, y: 0 },
    size: { x: 94, y: 89 }
  }
}

// Spawn a chilli at a random position
function spawnChilli() {
  console.log('creating a chilli');

  // Create new chilli img
  var newChilliImg = document.createElement("img");
  newChilliImg.src = "/assets/images/Chilli.gif";
  document.body.appendChild(newChilliImg);

  // Generate initial position
  var initialX = 50 + (window.innerWidth - 100) * Math.random();

  // Create chilli obj
  var newChilli = {
    img: newChilliImg,
    pos: { x: initialX, y: 0 },
    velocity: { x: 0, y: 0 },
    size: { x: 61, y: 80 }
  };

  // Set up styles
  newChilliImg.style.position = 'fixed';
  newChilliImg.style.top = newChilli.pos.y + "px";
  newChilliImg.style.left = newChilli.pos.x + "px";

  // Add to list
  chillis.push(newChilli);
}

// Create or update the score text with the score
function updateScoreText() {
  if (flavorText == null) {
    flavorText = document.createElement("p");
    flavorText.appendChild(document.createTextNode("Help Keroppi catch the falling chillis!"));
    flavorText.style.position = 'fixed';
    flavorText.style.top = 0;
    flavorText.style.fontSize = '30pt';
    flavorText.style.marginLeft = '20px';
    flavorText.style.marginTop = '20px';
    flavorText.style.background = 'rgba(0, 0, 0, 0.4)';
    flavorText.style.padding = '10px';
    document.body.appendChild(flavorText);
  }

  if (scoreText == null) {
    scoreText = document.createElement("p");
    scoreText.appendChild(document.createTextNode("blah"));
    scoreText.style.position = 'fixed';
    scoreText.style.top = '80px';
    scoreText.style.fontSize = '25pt';
    scoreText.style.marginLeft = '20px';
    scoreText.style.marginTop = '20px';
    scoreText.style.background = 'rgba(0, 0, 0, 0.4)';
    scoreText.style.padding = '10px';
    document.body.appendChild(scoreText);
  }

  scoreText.innerHTML = "Current score: " + currentScore;
}

// Create the game over text
function createGameOverText() {
  if (gameOverText == null) {
    gameOverText = document.createElement("p");
    gameOverText.appendChild(document.createTextNode("blah"));
    gameOverText.style.position = 'fixed';
    gameOverText.style.bottom = 0;
    gameOverText.style.fontSize = '40pt';
    gameOverText.style.marginLeft = '20px';
    gameOverText.style.marginTop = '20px';
    gameOverText.style.background = 'rgba(0, 0, 0, 0.4)';
    gameOverText.style.padding = '10px';
    document.body.appendChild(gameOverText);
  }

  gameOverText.innerHTML = "Game over!";
}
