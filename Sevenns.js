const websiteURL = "https://www.sevenns-game.com"; // Replace with your website URL
const svgNamespace = 'http://www.w3.org/2000/svg';
const green = '🟩';
const grey = '🟦';
const white ='⬜';
const black = '⬛'

const interiors = [[0,2,4,6],[1,2,5,6],[3,4,5,6]];
const solutionsMap = [[0,4,6,2], [6,2,5,1],[5,3,6,4]];
let solutionPartialsArray =[['HOLD BACK','RE', 'REST', 'RESTRA','RESTRAIN'],['WATERPROOF','RA', 'RAIN', 'RAINCO','RAINCOAT'],['DIFFERENCE','CO', 'CONT','CONTRA','CONTRAST']];
let solutionCLs = [];

const posX =  [60,200,130,130,90,175, 130];
const posY =  [-150,-180,-210,-160,-230,-260, -300];
const borderOver = 3;
let perfectTime;
let clue1 = ['GROUP CALL'];
let clue2 = ['YOUR DAD:'];
let clue3 = ['I <3'];
let solution1 =['FACETIME'];
let solution2 =['YOCEMENT'];
let solution3 = ['YOURFACE'];
let difficulty = ['1'];
let pair1 = ['TI'];
let pair2 = ['FA'];
let pair3 = ['CE'];
let pair4 = ['ME'];
let pair5 = ['NT'];
let pair6 = ['YO'];
let pair7 = ['UR'];
let puzzleNames = ['FOR A SPECIAL SOMEONE'];

let quotes = ['CLASS!', 'EPIC!'] ;
let quoters = ['MARX,K', 'HOMER'];

class Question {
    constructor(clues, solutions, tiles, difficulty){
            this.clues = clues;
            this.solutions = solutions;
            this.tiles = tiles;
            this.difficulty = difficulty;


        }
    clues = [];
    solutions = [];
    tiles = [];
    questionTitle;
    difficulty;

}

const numPractise = 10;
let numPuzzles;
let puzzleAvailability = [];
let numAvailable;
const numTiles = 7;
const nScores = 5;
let activeQuestion;
let cans = [];
let clues = [];
let solutions = [];
var solutionsCL;

function getQuestion(index){
     activeQuestion = new Question([clue1[index], clue2[index], clue3[index]], [solution1[index], solution2[index], solution3[index]], [pair1[index],pair1[index],pair1[index],pair1[index],pair1[index],pair1[index],pair1[index]], difficulty[index]);
}

let ellipses = [];
let playerStats;
let gameModeDaily = true;
let firstPass = true;
let gameOn = false;
let isPaused = false;
let puzzleScore = 0; // score out of five for this particular puzzle;
let puzzleIndex = 0; // where particular puzzle index is in the initial array;
let puzzleRating = 0; // what is the rating of the puzzle;

let canvas;
let context;

class Ellipse {
    constructor(context, x, y, radiusX, radiusY, color) {
      this.context = context;
      this.x = x;
      this.y = y;
      this.radiusX = radiusX;
      this.radiusY = radiusY;
      this.color = color;
    }

    draw() {
      this.context.beginPath();
      this.context.strokeStyle = this.color;
      this.context.lineWidth = 5; // Adjust line width as needed
      this.context.ellipse(this.x, this.y, this.radiusX, this.radiusY, 0, 0, 2 * Math.PI);
      this.context.stroke();
      this.context.closePath();
    }
  }

var introPanel;
var pauseButton;
var submitButton;
var hintButton;
var reRackButton;
var practiseButton;
var introPanel;
var startButton;
var rating;
var hintDot;
var timeDot;
var myChart = undefined;



var labelHolders = [];
var paramsX = [-7/12 ,7/12,-0]; //x-ordinates
var paramsY = [-0.4,-0.4,0.48]; //y-ordinates
var paramsS = [Math.PI, 5*Math.PI/4, 7*Math.PI/8]; //start-angles;
var paramsE = [7*Math.PI/4, 0, Math.PI/8]; // end-angles
var paramsO = [1,1,0]; // orientations;

let screenSize;

function updateScreenSize() {
    if (window.innerWidth < 576) {
        screenSize = 'small';
    } else if (window.innerWidth >= 576 && window.innerWidth < 768) {
        screenSize = 'medium';
    } else if (window.innerWidth >= 768 && window.innerWidth < 992) {
        screenSize = 'large';
    } else if (window.innerWidth >= 992 && window.innerWidth < 1200) {
        screenSize = 'extra-large';
    } else {
        screenSize = 'huge';
    }
}
function populate(index)
{
    cans =[];
    solutions =[];
    clues = [];

    cans.push(pair1[index]);
    cans.push(pair2[index]);
    cans.push(pair3[index]);
    cans.push(pair4[index]);
    cans.push(pair5[index]);
    cans.push(pair6[index]);
    cans.push(pair7[index]);

    solutions.push(solution1[index]);
    solutions.push(solution2[index]);
    solutions.push(solution3[index]);

    clues.push(clue1[index]);
    clues.push(clue2[index]);
    clues.push(clue3[index]);




}

let ans = [];
let score=[];

// UI elements
let drops= []; // drop zone areas
let cLabels = []; // category labels
let tiles = []; // candidate tiles
let placedScores= []; // the score of the tile in the ith place
let census = 0;

let hScoreTiles = []; // for summation;
let results = [];
var canHint = true;
var hasTime = true;
var isPerfect = true;
var timeAtEnd;
var dailyCountdownElement;
var theName;
var quoteBox;
var quoterBox;
var quoteBoxApp;
var quoterBoxApp;
var overlay1;
var overlay2;
var overlayC; // overlay Countdown
var overlayP; // overlay Pause
var overlayApp;
var overlayS; //overlay Stats
var overlayScore;
var overlayNoMore;
var closeIcon;
var closeIconApp;
var closeIcon2;
var closeIconStart;
var closeIconScore;
var closeIconNoMore;


function onDragStart(event) {
    event
      .dataTransfer
      .setData('text/plain', event.target.id);
      event
      .currentTarget
      .style.opacity= "0.3";

}

function onDragOver(event) {
    event.preventDefault();
  }


  function onDrop(event) {
    event.preventDefault();
    const id = event
      .dataTransfer
      .getData('text');
      const source = document.getElementById(id);
      if (event.target.children.length==0)
      {
        event.target.appendChild(source);
        countOnTiles();
        source.setAttribute("isPlaced",1);
        event.target.setAttribute("guessText", source.innerHTML);
        event.target.setAttribute("placed", source.getAttribute("tileIndex"));
        source.style.transform = 'translate(-15%, -15%)';
        source.style.opacity = '1';
      }
  }



  function onDropPanel(event) {
    event.preventDefault();
    const id = event
      .dataTransfer
      .getData('text');
      const source = document.getElementById(id);
      event.target.appendChild(source);
      countOnTiles();
      source.setAttribute("isPlaced",0);
      source.setAttribute("place", -1);
      source.style.transform = 'none';
      source.style.opacity = '1';

  }


  let selectedCandidate = null;

  function handleTouchStartCandidate(e) {

    e.preventDefault();
    e.currentTarget.style.opacity = 0.3;

    selectedCandidate = e.target; //
  }

  function handleTouchStartDropZone(e) {
      // Handle the touch end action here
      e.preventDefault();

      if (e.target.children.length==0 && selectedCandidate)
      {
        e.target.appendChild(selectedCandidate);
        countOnTiles();
        selectedCandidate.setAttribute("isPlaced",1);
        e.target.setAttribute("guessText", selectedCandidate.innerHTML);
        e.target.setAttribute("placed", selectedCandidate.getAttribute("tileIndex"));
        selectedCandidate.style.transform = 'translate(-15%, -20%)';
        selectedCandidate.style.opacity = '1';
        selectedCandidate = null;



      }
  }


  function handleTouchStartPanel(e) {
    e.preventDefault();


      e.target.appendChild(selectedCandidate);
      countOnTiles();
      selectedCandidate.setAttribute("isPlaced",0);
      selectedCandidate.setAttribute("place", -1);
      selectedCandidate.style.transform = 'none';
      selectedCandidate.style.opacity = '1';
      selectedCandidate = null;


  }



function initialiseButtons()
{
    pauseButton = document.getElementById('PauseButton');
    submitButton = document.getElementById('SubmitButton');
    hintButton = document.getElementById('HintButton');
    reRackButton = document.getElementById('RerackButton');
    practiseButton = document.getElementById('PractiseButton');

    pauseButton.disabled = false;
    submitButton.disabled = true;
    hintButton.disabled = true;
    reRackButton.disabled = true;
    practiseButton.disabled = false;

    hintDot = document.getElementById("hintDot");
    timeDot = document.getElementById("timeDot");
}

function showOverlay() {
    overlay1.style.zIndex = '100';
    overlay1.style.opacity = "1";
  }

  function hideOverlay() {

    overlay1.style.zIndex = '-100';
    overlay1.style.opacity = '0';

    prepCountdown();

  }

function doStats()
{

    overlayS.style.zIndex = '+100';
    overlayS.style.opacity = '1';


        FillInStats();
        drawStats();


}


function doPause()
{

        overlayP.style.zIndex = '+100';
        overlayP.style.opacity = '1';
        clearInterval(countdownInterval);
        prepPause();

}

function showEndPanel()
{

    overlay2.style.zIndex = '+100';
    overlay2.style.opacity = "1";
}

function hideEndPanel()
{
    overlay2.style.display= 'none';
    overlay2.style.opacity = "0";
}

function showCountdownPanel()
{

    overlayC.style.zIndex = '100';
    overlayC.style.opacity = "1";

}

function hideCountdownPanel()
{
    overlayC.style.display= 'none';
    overlayC.style.zIndex = '-100';
    overlayC.style.opacity = "0";

   // initiateGamePractise();
    initiateGame();
}

function showScorePanel()
{

    overlayScore.style.zIndex = '100';
    overlayScore.style.opacity = "1";

}

function hideScorePanel()
{

    overlayScore.style.zIndex = '-100';
    overlayScore.style.opacity = "0";

}


function showNoMorePanel()
{

    overlayNoMore.style.zIndex = '100';
    overlayNoMore.style.opacity = "1";

}

function hideNoMorePanel()
{

    overlayNoMore.style.zIndex = '-100';
    overlayNoMore.style.opacity = "0";

}




function MoveToGame()
{

    hideOverlay();

}

const launchDate = new Date('2024-05-01T00:00:00Z');


function setAvailable() {
    // Get the current date and time
    const currentDate = new Date();
    // Calculate the difference in milliseconds
    const difference = currentDate - launchDate;
    // Calculate the number of days
    const days = Math.floor(difference / (1000 * 60 * 60 * 24));
    numPuzzles = clue1.length;
    numAvailable = Math.min(numPuzzles, 10 + days);

    fillAvailability();
}

function fillAvailability() {
    puzzleAvailability = Array(numPuzzles).fill(false);
    for (let i = 0; i < numAvailable; i++) {
        puzzleAvailability[i] = true;
    }
}

window.addEventListener("DOMContentLoaded", function () {
    // call some function to generate the number available
    setAvailable();


    canvas = document.getElementById("canvas");
    context = canvas.getContext("2d");
    let canvasH = document.getElementById("canvasHolder");
    canvas.width = canvasH.offsetWidth;
    canvas.height = canvasH.offsetHeight;


    introPanel = document.getElementById('intPanel');
    startButton = document.getElementById('start-button');

    overlay1 = document.getElementById('overlay1');

    overlay2 = document.getElementById('overlay2');
    overlayC = document.getElementById('overlayC');
    overlayP = document.getElementById('overlayP');
    overlayApp = document.getElementById('overlayApp');
    overlayS = document.getElementById('overlayStats');
    overlayScore = document.getElementById('overlayScore');
    overlayNoMore = document.getElementById('overlayNoMore');
    quoteBox = document.getElementById('theQuote');
    quoterBox = document.getElementById('quoter');

    quoteBoxApp = document.getElementById('theQuoteApp');
    quoterBoxApp = document.getElementById('quoterApp');

    candPanel = document.getElementById('candidPanel');
    candPanel.addEventListener('touchstart', handleTouchStartPanel);


    playerStats = JSON.parse(localStorage.getItem('playerStats')) ||

    {

     playerPlayed: Array(numPuzzles).fill(false),
     totalPlayed: 0,
     numPerfect: Array(5).fill(0),
     ratingScore: Array(5).fill(0),
     numPlayed: Array(5).fill(0),
     totalScore: Array(5).fill(0),
    };



    closeIconApp= document.getElementById('closeIconApp');
    closeIconApp.addEventListener('click', () => {
        overlayApp.style.opacity = '0'; // Hide the panel when the close icon is clicked
        overlayApp.style.zIndex = '-100';
    });

    closeIcon = document.getElementById('closeIcon');
    closeIcon.addEventListener('click', () => {
        overlayP.style.opacity = '0'; // Hide the panel when the close icon is clicked
        overlayP.style.zIndex = '-100';
        countdownInterval = setInterval(function () {
            countdownValue--;
            updateCountdown();
          }, 1000);


    });

    closeIcon2 = document.getElementById('closeIcon2');
    closeIcon2.addEventListener('click', () => {
        overlayS.style.opacity = '0'; // Hide the panel when the close icon is clicked
        overlayS.style.zIndex = '-100';
        destroyChart();

        }



    );
    closeIconStart = document.getElementById('closeIconStart');
    closeIconStart.addEventListener('click', () => {
       MoveToGame();



    });

    closeIconScore = document.getElementById("closeIconScore");
    closeIconScore.addEventListener("click", function () {

    hideScorePanel();
    });


    closeIconNoMore = document.getElementById("closeIconNoMore");
    closeIconNoMore.addEventListener("click", function () {

    hideScorePanel();
    });

    // Initialize the countdown
    setInterval(updateDailyCountdown, 1000);
    dailyCountdownElement = document.getElementById('dailyCountdown');
    updateDailyCountdown();

    countdownText = document.getElementById('targetTime');
    countdownHeader = document.getElementById('headerHolder');
    countdownFooter = document.getElementById('footerHolder');
    //timerCircle = document.getElementById('timer-circle');
    dailyCountdownElement = document.getElementById('dailyCountdown');



    if (canvas.getContext)
    {


       // Usage example:
        prepApp();
        prepIntro();
        drawEllipses();
        initialiseButtons();
        placeDropTiles();
        doScoreTiles();

        showOverlay();
    }

})

function destroyChart() {
    if (typeof myChart !== 'undefined') {
        myChart.destroy();
        myChart = undefined; // Set the variable to undefined
    }
}
function flash()
{
    if (census==drops.length)
    {

       submitButton.disabled=false;
       hintButton.disabled = true;
       reRackButton.disabled = true;

    }
}

// JavaScript to update the countdown text and start the timer when a button is clicked
var countdownText;
var countdownHeader;
var countdownFooter;
var timerCircle;
let countdownValue; // Initial countdown value in seconds
let countdownInterval;

// Function to update the countdown
function updateCountdown() {


  if (countdownValue <= 0) {
    clearInterval(countdownInterval);
    countdownText.style.color = 'dimgrey';
    countdownHeader.style.color = 'dimgrey';
    countdownFooter.style.color = 'dimgrey';

    SetGameOn(false);
    setDot(timeDot, false);
    hasTime = false;
    //timerCircle.style.stroke = '#333';
  }
}


function doToggleButton()
{

    if (gameOn)
    {
        doPause();
    }
    else
    {
        doStats();
    }
}

function SetGameOn(gameOnState)
{
    gameOn = gameOnState;
    SetButtonText();

}

function SetButtonText()
{
    if(gameOn)
    {
        pauseButton.innerHTML = "PAUSE";
    }
    else
    {
        pauseButton.innerHTML = "STATS";
    }
}





// Function to start the countdown
function startCountdown() {
    SetGameOn(true);
    countdownText.innerHTML = countdownValue/60;
   // timerCircle.style.animationDuration = countdownValue + "s";
    countdownInterval = setInterval(function () {
    countdownValue--;
    updateCountdown();
  }, 1000);


//  timerCircle.style.animationPlayState = 'running';
}



function stopCountdown()
{
    clearInterval(countdownInterval);
    //timerCircle.style.animationPlayState = 'paused';
    timeAtEnd = countdownValue;

}

function initiateGamePractise()
{
    gameModeDaily = false;
    initiateGame();
}




function getRandomAvailablePuzzleIndex() {
        const validIndices = [];

        // Find valid indices
        for (let i = 0; i < puzzleAvailability.length; i++) {
            if (puzzleAvailability[i] && !playerStats.playerPlayed[i]) {
                validIndices.push(i);
            }
        }

        // If no valid indices, reset availability and continue
        if (validIndices.length === 0) {
            // Reset playerStats.playerPlayed to allow all puzzles to be played again
            playerStats.playerPlayed = new Array(puzzleAvailability.length).fill(false);

            // Refill puzzleAvailability
            fillAvailability();

            // After resetting, recheck for valid indices
            for (let i = 0; i < puzzleAvailability.length; i++) {
                if (puzzleAvailability[i] && !playerStats.playerPlayed[i]) {
                    validIndices.push(i);
                }
            }
        }

        // Get a random valid index
        const randomIndex = validIndices[Math.floor(Math.random() * validIndices.length)];
        return randomIndex;
    }

    function initiateGame() {
        pauseButton.disabled = false;
        submitButton.disabled = true;
        hintButton.disabled = false;
        reRackButton.disabled = false;
        if (playerStats.playerPlayed[numAvailable - 1]) {
            gameModeDaily = false;
        }

        let randomInt;
        if (gameModeDaily) {
            puzzleIndex = numAvailable - 1;
            practiseButton.disabled = true;
        } else {
            randomInt = getRandomAvailablePuzzleIndex();
            puzzleIndex = randomInt;
            practiseButton.disabled = false;
        }


    puzzleRating = difficulty[puzzleIndex];

    populate(puzzleIndex); // fill in the pre-processing units
    ans =generateRandomItemsArray(numTiles, cans);

    populateCandidateTiles();

    countdownValue = 60+180*parseInt(puzzleRating);
    rating = document.getElementById("difficultyPanel");
    rating.innerHTML = puzzleRating;

    theName = document.getElementById("gameTitle");
    theName.innerHTML = puzzleNames[puzzleIndex];

    startCountdown();

    canHint = true;
    if(firstPass)
    {
        AddCategoryLabel(0, clues[0]);
        AddCategoryLabel(1, clues[1]);
        AddCategoryLabel(2, clues[2]);
        firstPass = false;
    }
    else
    {
        ReplaceLabel(0, clues[0]);
        ReplaceLabel(1, clues[1]);
        ReplaceLabel(2, clues[2]);
    }
}

function countOnTiles()
{   let i= 0;
    census = 0;

    while(i < drops.length)
    {
        census += drops[i].children.length;
        if (drops[i].children.length==0)
        {
            drops[i].setAttribute("guessText","");
            drops[i].setAttribute("placed",-1);
        }
        i++;
    }

    if (census==drops.length)
    {
        flash();
    }
    return census;
}

function MatchString(str)
{

for (let i =0; i < cans.length; i++)
{
    if (str===cans[i])
    {
        return i+1;
    }
}
}
function generateRandomItemsArray(n, originalArray) {
    let res = [];
    let clonedArray = [...originalArray];
    if(n>clonedArray.length) n=clonedArray.length;
    for(let i=1; i<=n; i++) {
      const randomIndex = Math.floor(Math.random()*clonedArray.length);
      res.push(clonedArray[randomIndex]);
      clonedArray.splice(randomIndex, 1);
    }
    return res;
  }

function populateCandidateTiles()
{

    for (let i = 0; i < numTiles; i++)
    {
        let j = i+1;
        let str = "tile"+j;
        let tile = document.getElementById(str);
        tile.setAttribute("tileIndex", j);
        tiles.push(tile);
        tile.setAttribute("tileAddress", MatchString(ans[i]));
        tile.setAttribute("isPlaced", 0);
        tiles[i].addEventListener('touchstart', handleTouchStartCandidate);
        tile.innerHTML = ans[i];// + MatchString(ans[i]);

    }

}

function doScoreTiles()
{

    let horizontalPanel = document.getElementById("horHolder")
    for(let i=0; i<5; i++)
    {

        let hB = document.createElement("div");
        hB.className = "horizontalScoreTile";
        horizontalPanel.appendChild(hB);
        hScoreTiles.push(hB);
        results.push(false);
    }

}

function resetScoreTiles()
{

    for (let i = 0; i < nScores;i++)
    {

        changeBackgroundColor(hScoreTiles[nScores-1-i],-1); // revert to silver
        hScoreTiles[i].innerHTML = "";

    }
}


function doRerack()
{
    candPanel = document.getElementById("candidPanel");

    let numOnPanel = numTiles-countOnTiles();
    if (numOnPanel > 0)
    {

        for (let i = 0; i < numTiles; i++)
        {

            if (tiles[i].getAttribute("isPlaced")==1)
            {
                // return it
                candPanel.appendChild(tiles[i]);
                tiles[i].style.transform = "none";
                tiles[i].setAttribute("isPlaced",0);

                countOnTiles();
            }
        }

    }

}

function doHint()
{
    hintButton.disabled = true;
    let candPanel = document.getElementById("candidPanel");
    if (canHint)
    {
        let numOnPanel = numTiles-countOnTiles();

        if (numOnPanel > 0)
        {
            let randomIndex = Math.floor(Math.random()*numTiles);
            found = false
            count = 0;


            while (found==false && count < 10)
            {
                thisTile = tiles[randomIndex];

                randomIndex++;

                randomIndex=randomIndex%numTiles;


                if (tiles[randomIndex].getAttribute("isPlaced")==0)
                {
                    let index = getCorrectIndex(tiles[randomIndex].getAttribute("tileAddress"));

                    // in the case where there is something else on the dropZone we should
                    // bring that incorrect tile back
                    if (drops[index].children.length >0)
                    {

                        drops[index].children[0].setAttribute("isPlaced",0);
                        drops[index].children[0].setAttribute("guessText","");
                        candPanel.appendChild(drops[index].children[0]);

                    }
                    countOnTiles();
                    drops[index].appendChild(tiles[randomIndex]);
                    tiles[randomIndex].style.transform = 'translate(-15%, -20%)';
                    countOnTiles();
                    tiles[randomIndex].setAttribute("isPlaced",1);
                    drops[index].setAttribute("guessText", tiles[randomIndex].innerHTML);
                    drops[index].setAttribute("placed", tiles[randomIndex].getAttribute("tileIndex"));
                    found = true;
                    canHint = false;
                    setDot(hintDot, false);

                    changeBackgroundColor(hScoreTiles[nScores-1], 0);
                    results[nScores-1] = false;
                }
                else
                {
                    count++;
                }

            }
        }

    }

}

function setDot(dot, isOn)
{
    if(isOn)
    {
        dot.style.backgroundColor = "darkgreen";
    }
    else
    {

        dot.style.backgroundColor = "dimgrey";
    }
}




function getCorrectIndex(target)
{
   for (let i = 0; i < numTiles; i++)
   {
        let dZ = drops[i];
        let targetScore = dZ.getAttribute("required");
        if (targetScore==target)
        {
            return i;
        }
    }

}


function getDrops()
{
    let categoryPanel = document.getElementById("canvasHolder");
    let sampleTile = document.getElementById("tile1");

    const h = sampleTile.offsetHeight+borderOver;

    const w = sampleTile.offsetWidth+borderOver;


    for(let i=0; i<numTiles; i++)
    {
        j = i+1
        let dZ = document.createElement("div");
        dZ.className = "dropZone"
        dZ.setAttribute("id", "droptile"+j);
        dZ.setAttribute("required", j);
        dZ.setAttribute("placed", -1);
        dZ.style.width = `${w}px`;
        dZ.style.height = `${h}px`;
        dZ.ondrop = onDrop;
        dZ.style.position = "absolute";
        dZ.ondragover = onDragOver;
        dZ.addEventListener('touchstart', handleTouchStartDropZone);
        categoryPanel.appendChild(dZ);
        drops.push(dZ);


    }

}



function placeDropTiles()
{
    getDrops();
    const cPanel = document.getElementById("canvasHolder");
    const centerX = cPanel.offsetWidth/2;
    const centerY = cPanel.offsetHeight/2;
    const tileWidth = drops[0].offsetWidth;
    const tileHeight =  drops[0].offsetHeight;


    let x;
    let y;

    let deltaX = 30;
    let deltaY = 18;

    const xR = 55 - tileWidth/centerX*50;
    const yR = 55 - tileHeight/centerY*50;


    const tile1 = drops[0];

    tile1.style.top = (yR-0.75*deltaY) + "%";
    tile1.style.left = (xR -deltaX)  + "%";

    const tile2 =  drops[1];



    tile2.style.top = (yR-0.75*deltaY) + "%";
    tile2.style.left = (xR+deltaX) + "%";

    const tile3 = drops[2];

    tile3.style.top = (yR-deltaY) + "%";
    tile3.style.left = xR +1 +"%";

    const tile4 = drops[3];

    tile4.style.top = (yR+deltaY) + "%";
    tile4.style.left = xR +1 + "%";

    const tile5 =  drops[4];


    tile5.style.top = yR+2 +"%";
    tile5.style.left = (xR-deltaX/2) + "%";

    const tile6 = drops[5];

    tile6.style.top = yR+2 + "%";
    tile6.style.left = (xR+0.61*deltaX) + "%";

    const tile7 = drops[6];

    tile7.style.top = yR-4 + "%";
    tile7.style.left = xR+1 + "%"

}


function drawEllipses()
{



    const centerX = canvas.width / 2;
    const centerY = canvas.height / 2;

    const rX = 0.6*centerX;
    const rY = 0.4*centerX;

    const ellipse1 = new Ellipse(context, centerX*(0.65),centerY*(0.8), rX, rY, 'grey');
    const ellipse2 = new Ellipse(context, centerX*(1.35),centerY*(0.8), rX, rY,'grey');
    const ellipse3 = new Ellipse(context, centerX,centerY*(1.2), rX, rY,'grey');

    ellipse1.draw();
    ellipse2.draw();
    ellipse3.draw();

    ellipses.push(ellipse1);
    ellipses.push(ellipse2);
    ellipses.push(ellipse3);



}



class CurvedLabel{
    constructor(parentDivId, labelName, labelText, x, y, rx, ry, sA, eA, showEllipse, inside, clockWise,fontColor, fontSize){
        this.parentDivId = parentDivId;
        this.labelName = labelName;
        this.labelText = labelText;
        this.x = x;
        this.y = y;
        this.rx = rx;
        this.ry = ry;
        this.sA = sA;
        this.eA = eA;
        this.showEllipse = showEllipse;
        this.inside = inside;
        this.clockWise = clockWise;
        this.fontColor = fontColor;
        this.fontSize = fontSize;

        this.svg = null;
        this.centerX =null;
        this.centerY=null;
        this.path=null;
        this.pathName=null;
        this.textPath=null
        this.textElememt=null;
        this.div = document.getElementById(parentDivId);


        this.createSVG();
        this.createPath();
        this.createTextElt(this.labelText, this.fontColor);


    }
    createSVG()
    {


        if (!this.div) {
            console.error(`Div with ID '${this.parentDivId}' not found.`);
            return;
        }

        // Calculate the center of the div
        this.centerX = this.div.offsetWidth / 2 + this.x;
        this.centerY = this.div.offsetHeight / 2+ this.y;



        // Create an SVG container

        this.svg = document.createElementNS(svgNamespace, 'svg');
        this.svg.style.pointerEvents = "none";
        this.svg.setAttribute("id", "svg"+this.labelName);
        this.svg.setAttribute('width', '100%');
        this.svg.setAttribute('height', '100%');
        this.svg.style.position = 'absolute';

        this.svg.style.top = '0';
        this.svg.style.left = '0';


    }
    createPath()
    {
        // Create the path element for the arc

        this.path = document.createElementNS(svgNamespace, 'path');

        this.path.setAttribute('d', describeArc(this.centerX, this.centerY, this.rx, this.ry, this.sA, this.eA, this.inside, this.clockWise));

        this.pathName = 'arc' + this.labelName;
        this.path.setAttribute('id', this.pathName); // Add an ID to the path element
        this.path.setAttribute('fill', 'none');
        if (this.showEllipse)
        {   this.path.setAttribute('stroke', 'black');}
        else
        {   this.path.setAttribute('stroke', 'none');}
    }
    createTextElt(text, fontColor)
    {

        // Create the text element along the path
        this.textElement = document.createElementNS(svgNamespace, 'text');

        this.textElement.setAttribute('font-size', this.fontSize);
        this.textElement.setAttribute('font-family', 'Arial');

        this.textElement.setAttribute('fill',fontColor);
        this.textElement.setAttribute('text-anchor', 'middle'); // Center the text horizontally
        this.textElement.setAttribute("id",this.labelName);


        let pathRef = "#" + this.pathName;
        // Create a textPath element that references the path with the ID
        this.textPath = document.createElementNS(svgNamespace, 'textPath');
        this.textPath.setAttribute('href', pathRef); // Reference the path with the ID
        this.textPath.setAttribute('startOffset', '50%'); // Center the text vertically
        this.textPath.textContent = text;
        this.text = text;


        this.textElement.appendChild(this.textPath);
        this.fontColor = fontColor;


    }
    show()
    {
        this.svg.appendChild(this.path);
        this.svg.appendChild(this.textElement);
        this.div.appendChild(this.svg);
    }

    amendTextElement(text, fontColor)
    {
        this.svg.removeChild(this.textElement);

        this.createTextElt(text, fontColor);
        this.svg.appendChild(this.textElement);
        this.show();
    }


}



// Helper function to describe an arc path
// intro objects
function describeArc(x, y, xRadius, yRadius, startAngle, endAngle, inside, orientation) {
    const startX = x + xRadius * Math.cos(startAngle);
    const startY = y + yRadius * Math.sin(startAngle);
    const endX = x + xRadius * Math.cos(endAngle);
    const endY = y + yRadius * Math.sin(endAngle);

    const largeArcFlag = endAngle - startAngle <= Math.PI ? '0' : '1';

    let pathData;

    if (inside) {
        pathData = [
            `M ${startX} ${startY}`,
            `A ${xRadius} ${yRadius} 0 ${largeArcFlag} ${orientation} ${endX} ${endY}`
        ];
    } else {
        pathData = [
            `M ${x} ${y}`,
            `L ${startX} ${startY}`,
            `A ${xRadius} ${yRadius} 0 ${largeArcFlag} ${orientation} ${endX} ${endY}`,
            `L ${x} ${y}`
        ];
    }

    return pathData.join(' ');
}


function AddCategoryLabel(i, text)
{

    let myLabel = "myLabel" + i;

    let rX = ellipses[0].radiusX;
    let rY = ellipses[0].radiusY;

    let fontSize = 18;
    if (window.innerWidth>767)
    {
        fontSize = 28;
    }


    let box = new CurvedLabel("canvasHolder",myLabel,text,paramsX[i]*rX, paramsY[i]*rX, rX, rY , paramsS[i], paramsE[i],false, false, paramsO[i], 'white', fontSize);

    cLabels.push(box);
    box.show();

}

function ReplaceLabel(i,text)
{
    cLabels[i].amendTextElement(text, "white");
}

function finishUp()
{
    stopCountdown();
    SetGameOn(false);
    puzzleScore=0;
    submitButton.disabled=true;
    reRackButton.disabled=true;
    hintButton.disabled=true;
    ReplaceLabels();
    checkScore();



    markSolution(highlight);




}

function finalPass()
{

    if (isPerfect)
    {

        if (hasTime)
        {

            changeBackgroundColor(hScoreTiles[nScores-1],1);
            results[nScores-1]=true;
            puzzleScore+=1;

        }
        if(canHint)
        {

            changeBackgroundColor(hScoreTiles[nScores-2],1);
            results[nScores-2]=true;
            puzzleScore+=1;


        }



        if(hasTime && canHint)
        {

            fillHTiles();
        }
        else
        {
            isPerfect = false;
        }


    }

}

function writeResults()
{

    playerStats.playerPlayed[puzzleIndex] = true;
    playerStats.totalPlayed+=1;

    playerStats.numPlayed[puzzleRating-1] +=1;
    playerStats.ratingScore[puzzleRating-1]+=puzzleScore;

    playerStats.totalScore+=puzzleScore;
    if (isPerfect)
    {
        playerStats.numPerfect[puzzleRating-1]+=1;
    }

    localStorage.setItem('playerStats', JSON.stringify(playerStats));
}

function fillHTiles()
{

    let minutes = Math.floor((timeAtEnd / 60) % 60);
    timeAtEnd -=60*minutes;
    let seconds = Math.floor((timeAtEnd  ) % 60);

    let tensSeconds =  Math.floor(seconds/10);
    let singleSeconds = seconds-tensSeconds*10;

    hScoreTiles[0].innerHTML=parseInt(minutes);
    hScoreTiles[1].innerHTML=":";
    hScoreTiles[2].innerHTML= parseInt(tensSeconds);
    hScoreTiles[3].innerHTML =parseInt(singleSeconds);
    hScoreTiles[4].innerHTML = "!";

    perfectTime = hScoreTiles[0].innerHTML;
    perfectTime += hScoreTiles[1].innerHTML;
    perfectTime += hScoreTiles[2].innerHTML;
    perfectTime += hScoreTiles[3].innerHTML;
    perfectTime += hScoreTiles[4].innerHTML;

}


function ReplaceLabels()
{
    for(let i = 0; i <3; i++)
    {
        ReplaceLabel(i, solutions[i]);
    }



}

function checkScore()
{
    count = 0;
    for(let i = 0; i < drops.length; i++)
    {

        count += getScore(i);

    }

}





function changeBackgroundColor(item, result)
{
    if (result==1)
    {

        item.style.backgroundColor ="#1DA1F2";
    }
    else
    {
        if (result==0)
        {
            item.style.backgroundColor ="#666666";
        }
        else
        {
            item.style.backgroundColor ="#C0C0C0";
        }
    }
}


function changeColor(item, result)
{
    if (result==1)
    {

        item.style.color ="#1DA1F2";
    }
    else
    {
        if (result==0)
        {
            item.style.color ="#666666";
        }
        else
        {
            item.style.color ="#FFFFFF";
        }
    }
}

function checkEllipse(index)
{
    let word = solutions[index];
    let correct = false;

    if (index==0)
    {

        return x = wordContains(word, getTile(0))* wordContains(word, getTile(2))* wordContains(word, getTile(4))* wordContains(word, getTile(6));

    }

    if (index==1)
    {
        return x = wordContains(word, getTile(1))* wordContains(word, getTile(2))* wordContains(word, getTile(5))* wordContains(word,  getTile(6));
    }

    if (index==2)
    {
        return x = wordContains(word, getTile(3))* wordContains(word, getTile(4))* wordContains(word, getTile(5))* wordContains(word,  getTile(6));
    }
}

function getTile(index)
{
    let str = drops[index].children[0].innerHTML;

    return str;
}



function wordContains(word, testString)
{
    res = 0;
    if(word.includes(testString))
    {
        res = 1;
    }
    return res;
}


function applyScoresWords(ellipseIndex)
{


    let s = checkEllipse(ellipseIndex);

    let thisText = solutions[ellipseIndex];

    cLabels[ellipseIndex].amendTextElement(thisText, getColor(s));


    changeBackgroundColor(hScoreTiles[ellipseIndex], s);

    if (s==0){isPerfect=false};
    if (s==1){
        results[ellipseIndex] = true;
        puzzleScore+=1;

     }


}


function getColor(result, defaultColor)
{
    if (result==0)
    {
        return "dimgrey";
    }
    else
    {
        return "darkgreen";
    }
}


function getScore(i)
{

   let dZ = drops[i];
   let targetScore = dZ.getAttribute("required");

   score[i]=0;
   let placed = dZ.children[0]; // what is placed

   let placeScore = placed.getAttribute("tileAddress");

   if (placeScore==targetScore)
   {
        score[i]=1;
   }
   else
   {
        score[1]=0;
   }
   return score[i];
}

// Function to calculate the time remaining until midnight
function calculateTimeRemaining() {
    const now = new Date();
    const midnight = new Date();

    // Set the target time to midnight
    midnight.setHours(24, 0, 0, 0);

    const timeRemaining = midnight - now;

    // Calculate hours, minutes, and seconds
    const hours = Math.floor((timeRemaining / (1000 * 60 * 60)) % 24);
    const minutes = Math.floor((timeRemaining / 1000 / 60) % 60);
    const seconds = Math.floor((timeRemaining / 1000) % 60);

    return { hours, minutes, seconds };
  }

  // Function to update the countdown display
  function updateDailyCountdown() {

    const { hours, minutes, seconds } = calculateTimeRemaining();

    dailyCountdownElement.textContent = `Time until next Daily: ${hours}h ${minutes}m ${seconds}s`;
  }



// Function to copy the title and hyperlink to the clipboard
function copyTitleAndLinkToClipboard() {

    const link = websiteURL; // Use .innerHTML to get the link as HTML

    let output = generateColoredBoxesText();
    // Combine all the data into a single string with HTML formatting
    let clipboardData = `${theName.innerHTML}\n${link}\n ${output}`;
    if (isPerfect)
    {
        let perfectMessage = "Perfect Score " + perfectTime;
        clipboardData = `${theName.innerHTML}\n${link}\n ${output}\n ${perfectMessage}`;
    }
    // Copy to clipboard
    copyToClipboard(clipboardData);

}

function copyToClipboard(text) {
    const textarea = document.createElement('textarea');
    textarea.value = text;
    document.body.appendChild(textarea);
    textarea.select();
    document.execCommand('copy');
    document.body.removeChild(textarea);
}


function generateColoredBoxesText() {



    let output = '';

    for (const result of results) {
        switch (result) {
            case false:
                output += white;

                break;
            case true:
                output += grey;
                break;
        }

    }

    return output;
}

function generateEmojiTime()
{
    let output = digiH;
    output += digi1;
    output+= digiA;
    output+=digi3;
    output+=digi5;
    return output;

}


function share()
{

    copyTitleAndLinkToClipboard();
    hideEndPanel();
}


function practise()
{

    hideEndPanel();
    this.gameModeDaily = false;
    resets();
    initiateGamePractise();

}

function resetLabels()
{
    for (let i = 0; i < cLabels.length; i++)
    {

        cLabels[i].amendTextElement("","white");

    }
}


function resetTitle()
{

    theName.innerHTML = "SEVENNS";
}


function resetDropZones()
{
    for(let i=0; i<numTiles; i++)
    {
        drops[i].setAttribute("placed", -1);
        drops[i].setAttribute("guessText", "");

    }

}


function resetCandidateTiles()
{
    let candPanel = document.getElementById("candidPanel");
    for (let i = 0; i < numTiles; i++)
    {
        tiles[i].innerHTML = "";
        tiles[i].style.transform = "none";
        candPanel.appendChild(tiles[i]);


    }

    countOnTiles();
}

function resetCountdown()
{
    countdownText.style.color = "darkgreen";
    countdownHeader.style.color = "darkgreen";
    countdownFooter.style.color = "darkgreen";
    clearInterval(countdownInterval);
    //timerCircle.style.strokeDashoffset="0";
    //need to do more here
}


function resetRating()
{
   rating.innerHTML = "";
}

function resets()
{
    resetScoreTiles();
    resetCandidateTiles()
    resetDropZones();
    resetLabels();
    resetCountdown();
    resetRating();
    resetTitle();
    resetDots();

}


function resetDots()
{
    setDot(hintDot, true);
    setDot(timeDot, true);
}

let miniTiles = [];
let numberTiles = [];
let numberTiles2 = [];
let countdownTiles = [];
let pauseTiles = [];
let solutionTiles = [];
let solutionPartials = [];
function prepIntro()
{
    drawMiniEllipses("introCanvas1",80,50, -45,-25);
    drawMiniEllipses("introCanvas1",80,50, 45,-25);
    drawMiniEllipses("introCanvas1",80,50, 0,25);
    drawMiniEllipses("introCanvas2",80,50, -45,-25);
    drawMiniEllipses("introCanvas2",80,50, 45,-25);
    drawMiniEllipses("introCanvas2",80,50, 0,25);
    doMiniTiles();
    doNumbers("introBin1", numberTiles, ['•','•','•','•','•','•','•'],posX, posY);
    doNumbers("introBin2", numberTiles2, ['RE','AT','IN','NT','ST','CO','RA'],posX, posY);
    doSolutionTiles();
    doSolution();
    setInterval(updateTiles, 600);
    const numberT = setInterval(() =>{(updateNumbers(

        numberTiles, true), 400);},400);

    setInterval(updateMultiSolutions, 600);
}

function prepCountdown()
{

    showCountdownPanel();

    drawMiniEllipses("countdownCanvas",80,50, -45,-25);
    drawMiniEllipses("countdownCanvas",80,50, 45,-25);
    drawMiniEllipses("countdownCanvas",80,50, 0,25);
    doNumbers("countdownBin", countdownTiles, [7,6,5,4,3,2,1],posX, posY);
    countdown(7, hideCountdownPanel);
}

function prepPause()
{
    drawMiniEllipses("pauseCanvas",80,50, -45,-25);
    drawMiniEllipses("pauseCanvas",80,50, 45,-25);
    drawMiniEllipses("pauseCanvas",80,50, 0,25);
    if (pauseTiles.length===0)
    {   doNumbers("pauseBin", pauseTiles, ['P','A','U','S','I','N','G'],posX, posY);}
    const pauseT = setInterval(() =>{(updatePause(
        pauseTiles), 400);},400);
    updateQuotes();
}
function prepApp()
{
    updateQuotesApp();
}

function doSolution()
{
    let solutionsCL = new CurvedLabel('introBin2',"sampleLabel", "RESTRAIN", paramsX[0]*80,paramsY[0]*40, 100, 70,paramsS[0], paramsE[0], false, true,1,"darkgreen",16);
    let solutionsCL1 = new CurvedLabel('introBin2',"sampleLabel1", "RAINCOAT", paramsX[1]*80,paramsY[1]*40, 100, 70,paramsS[1], paramsE[1], false, true,1,"darkgreen",16);
    let solutionsCL2= new CurvedLabel('introBin2',"sampleLabel2", "CONTRAST",paramsX[2]*80,paramsY[2]*40, 100, 70,paramsS[2], paramsE[2], false, true,0,"darkgreen",16);
    solutionsCL.show();
    solutionsCL1.show();
    solutionsCL2.show();
    solutionCLs.push(solutionsCL);
    solutionCLs.push(solutionsCL1);
    solutionCLs.push(solutionsCL2);


    let clueCL = new CurvedLabel('introBin1',"clue", "HOLD BACK", paramsX[0]*80,paramsY[0]*20, 100, 70,paramsS[0], paramsE[0], false, true,1,"dimgrey",16);
    let clueCL1 = new CurvedLabel('introBin1',"clue1", "WATERPROOF", paramsX[1]*80,paramsY[1]*20, 100, 70,paramsS[1], paramsE[1], false, true,1,"dimgrey",16);
    let clueCL2= new CurvedLabel('introBin1',"clue2", "DIFFERENCE",paramsX[2]*80,paramsY[2]*45, 100, 70,paramsS[2], paramsE[2], false, true,0,"dimgrey",16);

    clueCL.show();
    clueCL1.show();
    clueCL2.show();



}

function changeTextEltText(curvedLabel, text, fontColor)
{
    curvedLabel.amendTextElement(text, fontColor);
}


function doMiniTiles()
{
    miniPanel = document.getElementById("miniHolder")
    for (let i = 0; i < numTiles; i++)
    {
        let miniTile = document.createElement("div");
        miniTile.className = "miniCandidate";
        miniPanel.appendChild(miniTile);
        miniTiles.push(miniTile);
    }

    miniTiles[0].innerHTML = "RE";
    miniTiles[1].innerHTML  = "NT";
    miniTiles[2].innerHTML  = "CO";
    miniTiles[3].innerHTML  = "ST";
    miniTiles[4].innerHTML  = "AT";
    miniTiles[5].innerHTML  = "RA";
    miniTiles[6].innerHTML  = "IN";


}

var currentPartial =0;

function updateMultiSolutions()
{
    let numPartials = 15;
    let activeEllipse = Math.floor(currentPartial/5);

    let residual = currentPartial - activeEllipse*5;

    let activePartials = solutionPartialsArray[activeEllipse];
    //alert(activeEllipse + "," + residual+","+activePartials.length);
    let activeLabel = solutionCLs[activeEllipse];





    changeTextEltText(activeLabel, activePartials[residual],"darkgreen");

    for (let j = 0; j < solutionCLs.length; j++)
    {
        if (j===activeEllipse)

        {
            // do something



        }
        else
        {
            changeTextEltText(solutionCLs[j], solutionPartialsArray[j][0], "dimgrey");
        }
    }



    // handles the actual tiles


    let map = solutionsMap[activeEllipse];
    removeOpaque(numberTiles2);
    for (let i = 0; i < map.length; i++)
    {


        if ((i+1)===residual)
        {
            numberTiles2[map[i]].classList.add('opaque');
        }
    }


    currentPartial = (currentPartial+1)%numPartials;
}


function removeOpaque(myList)
{
    for (let i=0; i < myList.length; i++)
    {
        myList[i].classList.remove('opaque');
    }
}


function doSolutionTiles()
{
    let solutionBin = document.getElementById("introBin2")
    let AposX = [];
    let AposY = [];

    for (let i = 0; i < 4; i++)
    {
        let sT = document.createElement("div");
        sT.className = "ultraMiniCandidate";
        solutionBin.appendChild(sT);
        solutionTiles.push(sT);
        AposX.push(0);
        AposY.push(0);
    }

    solutionTiles[0].innerHTML = "EX";
    solutionTiles[1].innerHTML  = "AM";
    solutionTiles[2].innerHTML  = "PL";
    solutionTiles[3].innerHTML  = "ES";

    solutionPartials.push("EX");
    solutionPartials.push("EXAM");
    solutionPartials.push("EXAMPL");
    solutionPartials.push("EXAMPLES");


     AposX[0]= 180;
     AposY[0]= -130;

     AposX[1] = 110;
     AposY[1] =  -140;

     AposX[2] = 130;
     AposY[2] =  -250;

     AposX[3] = 70;
     AposY[3] =  -260;

     for (let i =0; i < 4; i++)
     {
        solutionTiles[i].style.left = AposX[i]+ "px";
        solutionTiles[i].style.top = AposY[i]  + "px";


     }
}


function doNumbers(containerName, holder, values,positionX, positionY)
{
    let containerDiv = document.getElementById(containerName);

    for (let i=0; i < 7; i++)
    {
        let j = 1+i;
        nT = document.createElement("div");
        nT.className ="numberTile";
        nT.innerHTML = values[i];
        holder.push(nT);
        containerDiv.appendChild(nT);
     }



     for (let i =0; i < numTiles; i++)
     {
        holder[i].style.left = positionX[i]+ "px";
        holder[i].style.top = positionY[i]  + "px";


     }




}

let currentTileIndex = 0;
let currentNumberTileIndex = 0;
let currentSolutionTileIndex = 0;
let currentPauseTileIndex = 0;

function updateTiles() {
    miniTiles.forEach((tile, index) => {
        if (index === currentTileIndex) {
            tile.classList.add('opaque');
        } else {
            tile.classList.remove('opaque');
        }
    });

    currentTileIndex = (currentTileIndex + 1) % miniTiles.length;

}

let currentQuoteIndex =0;

function updateQuotes() {

       if (currentQuoteIndex<quotes.length)
       {

            quoteBox.innerHTML=quotes[currentQuoteIndex];
            quoterBox.textContent="";
            setTimeout(() => {
                quoterBox.textContent=quoters[currentQuoteIndex];
                currentQuoteIndex = (currentQuoteIndex + 1) % quotes.length;
            }, 300);


            setTimeout(updateQuotes,1000);
       }

}

function updateQuotesApp() {

    if (currentQuoteIndex<quotes.length)
    {

         quoteBoxApp.innerHTML=quotes[currentQuoteIndex];
         quoterBoxApp.textContent="";
         setTimeout(() => {
             quoterBoxApp.textContent=quoters[currentQuoteIndex];
             currentQuoteIndex = (currentQuoteIndex + 1) % quotes.length;
         }, 300);


         setTimeout(updateQuotesApp,1000);
    }

}

function updatePause(tilesArray) {

    tilesArray.forEach((tile, index) => {
        if (index === currentPauseTileIndex) {
            tile.classList.add('opaque');
        } else {
            tile.classList.remove('opaque');
        }
    });
    currentPauseTileIndex=(currentPauseTileIndex+1)%tilesArray.length;

}


function updateNumbers(tilesArray, doCounter) {

    tilesArray.forEach((tile, index) => {
        if (index === currentNumberTileIndex) {
            tile.classList.add('opaque');
        } else {
            tile.classList.remove('opaque');
        }
    });
    if (doCounter)
    {
        var counter = document.getElementById("counter");
        counter.innerHTML = currentNumberTileIndex+1;
    }
    currentNumberTileIndex=(currentNumberTileIndex+1)%tilesArray.length;

}



function countdown(seconds, callback) {
    let currentSecond = seconds;
    let counter = 0;
    const countdownInterval = setInterval(() => {
        currentSecond--;

        countdownTiles.forEach((tile, index) => {countdownInterval
            if (index ===counter) {
            tile.classList.add('opaque');
            tile.style.fontSize= '24px';

            } else {
                tile.classList.remove('opaque');
                tile.style.fontSize= '16px';

            }

        });

        if (currentSecond < 0) {
            clearInterval(countdownInterval); // Stop the countdown
            callback(); // Call the callback function when the countdown finishes
        }
        counter = counter+1;
    }, 200); // Update the countdown every 1 second (1000 milliseconds)
}

let tileCounter = 0;

function markSolution(callBack)
{

     const tileInterval = setInterval(() => {

        if (tileCounter < 12) {

            let ellipseIndex = Math.floor(tileCounter/4);
            let textIndex = tileCounter-4*ellipseIndex;
            let text = (solutions[ellipseIndex].slice(0, 2*(textIndex+1)));

            callBack(text, ellipseIndex, textIndex); // Call the callback function when the countdown finishes
            tileCounter = tileCounter+1;

        }
        else{

            clearInterval(tileInterval); // Stop the countdown
            resetTiles(1);
            tileCounter = 0;
            if (gameModeDaily)
            {
                finalPass();
                writeResults();
                setTimeout(showEndPanel, 5000);
            }
            else
            {
                if (hasTime) {puzzleScore+=1;}
                if (canHint) {puzzleScore+=1;}
                if(puzzleScore<5) {isPerfect = false;}

                showScorePanel();

                showScorePopup(puzzleScore);
                writeResults();
                setTimeout(resets,3000);
            }

        }

    }, 200); // Update the countdown every 1 second (1000 milliseconds)
}






function highlight(text, ellipseIndex, textIndex)
{
    if (textIndex==0)
    {
        resetTiles(0.3);
    }
    partialText(text, ellipseIndex);
    markTile(text, ellipseIndex);
    if (textIndex ===3)
    {

        applyScoresWords(ellipseIndex);
    }
}

function resetTiles(opacity)
{
    for (let i = 0; i < numTiles; i++)
    {
        tiles[i].style.color = "black";
        tiles[i].style.borderColor = "darkgrey"
        tiles[i].style.opacity = opacity;

    }
}


function partialText(text, ellipseIndex)
{

    ReplaceLabel(ellipseIndex,text);

}
function markTile(longText, ellipseIndex)
{

    // we are looking for whether the text is displayed in the right ellipse
    // so find the dz whose text = text
    // look at whether that is in ellipseIndex - if so do something if not do somethign else
    const text = longText.slice(-2);
    let location = -1;
    let i = 0;

    for (i = 0; i < numTiles; i++)
    {

        if (drops[i].getAttribute("guessText")===text)
        {
            location =i;

        }
    }


    drops[location].children[0].style.opacity = "1";
    if (interiors[ellipseIndex].indexOf(location)===-1)
    {

        drops[location].children[0].style.borderColor = "dimgrey";
        drops[location].children[0].style.color = "silver";

    }
    else
    {

        drops[location].children[0].style.borderColor = "darkgreen";
        drops[location].children[0].style.color = "darkgreen";

    }

}





function updateSolutionTiles() {
    solutionTiles.forEach((tile, index) => {
        if (index === currentSolutionTileIndex) {
            tile.classList.add('opaque');
            changeTextEltText(solutionsCL, solutionPartials[index],"darkgreen");
        } else {
            tile.classList.remove('opaque');
        }
    });

    currentSolutionTileIndex = (currentSolutionTileIndex + 1) % solutionTiles.length;

}


function drawMiniEllipses(canvasId, radiusx, radiusy, offsetX, offsetY)
{

    const canvas1 = document.getElementById(canvasId);
    const context1 = canvas1.getContext("2d");

    const centerX = canvas1.width / 2;
    const centerY = canvas1.height / 2;

    const ellipse = new Ellipse(context1, centerX+offsetX,centerY+offsetY, radiusx, radiusy, 'silver');
    ellipse.draw();

}

function doScreenCheck(index)
{
    let str = solutions[index];
    let myPartials = [];
    for (let j =0; j < 4; j++)
    {
        myPartials.push(substring(str, 2*(j+1)));

    }

}

function updateSequence(index, currentIndex) {

        //index is the ellipse, currentIndex
        let subStr = solutions[index].substring(0, 2*(currentIndex+1));
        for (let i = 0; i < 4; i++)
        {
            if (interiors[i]==0){}


        }

}




function drawStats()
{
    // Extract data from HTML elements
    let labels = [];
    let values = [];


    for (let i =0; i < 5; i++)
    {
        labels.push('RATING ' + (i+1).toString() );

        values.push(playerStats.ratingScore[i]/Math.max(0.1,playerStats.numPlayed[i]));
    }


    // Create a horizontal bar chart using Chart.js
    var ctx = document.getElementById('statsChart').getContext('2d');
    myChart = new Chart(ctx, {
    type: 'bar',
    data: {
        labels: labels,
        datasets: [{
        data: values,
        label: '',
        backgroundColor: 'rgba(0, 100, 0, 0.6)',
        borderColor: 'rgba(0, 100, 0, 0.6)',
        borderWidth: 1
        }]
    },
    options: {
        plugins: {
            title: {
                display: true,
                text: 'Average Score by Rating'
            }
        },
        legend: {
            display: false

        },
        scales: {
            x: {
                beginAtZero: true
            },
            y: {
                beginAtZero: true
            }
        }
    }
    });
}


function FillInStats()
{
    let totalPlay = document.getElementById("totalPlay");
    totalPlay.innerHTML = "You have played " + playerStats.totalPlayed + " games";
    let totalPerfect = document.getElementById("totalPerfect");
    totalPerfect.innerHTML = "You were perfect in " + getNumPerfects();
    let totalAverage = document.getElementById("totalAverage");
    totalAverage.innerHTML = "Your overall average is " + parseFloat(getAverage().toFixed(2));



}


function getAverage()
{
    sum = 0;
    for (let i =0; i < 5;i++)
    {
        sum += playerStats.ratingScore[i];


    }
    return sum/playerStats.totalPlayed;
}

function getNumPerfects()
{
    sum = 0;
    for (let i =0; i < 5;i++)
    {
        sum += playerStats.numPerfect[i];

    }
    return sum;
}
function isMobileDevice() {
    return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
}



// Function to check screen orientation
function checkOrientation() {
    if (window.innerHeight < window.innerWidth && isMobileDevice()) {
        // Landscape orientation detected, show the message
        document.getElementById('landscapeMessage').style.display = 'block';
    } else {
        // Portrait orientation, hide the message
        document.getElementById('landscapeMessage').style.display = 'none';
    }
}

// Event listener to check orientation on window resize
window.addEventListener('resize', checkOrientation);

// Initial check when the page loads
window.addEventListener('load', checkOrientation);


function showScorePopup(score) {
    const starRating = document.getElementById("starRating");

    // Add the image based on the user's score
    const imageHtml = Array(score).fill('<img src="https://i.imgur.com/XtvdT89.png" class="score-image">').join("");
    starRating.innerHTML = imageHtml;
}
