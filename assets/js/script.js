
({
    jsdom: { "file": "index.html" }
})

// var wordBlank = document.querySelector(".word-blanks");
// var win = document.querySelector(".win");
// var lose = document.querySelector(".lose");
// var timerElement = document.querySelector(".timer-count");
// var startButton = document.querySelector(".start-button");

// var chosenWord = "";
// var numBlanks = 0;
var winCounter = 0;
var loseCounter = 0;
var isDone = false;
var timer;  //variable for timer function
var timerCount;

// Arrays used to create blanks and letters on screen
// var lettersInChosenWord = [];
// var blanksLetters = [];

// Array of words the user will guess
// var words = ["variable", "array", "modulus", "object", "function", "string", "boolean"];

const questionSet = [
    { question: "Commonly used data types do NOT include which", correctAnswer: "Books", answers: ["Books", "Integers", "Strings", "Numbers"] },
    { question: "To be defined, strings must be enclosed by what?", correctAnswer: "Quotes", answers: ["Quotes", "Brackets", "Curly Brackets", "Integers"] },
    { question: "What do arrays NOT store in JavaScript?", correctAnswer: "Mice", answers: ["Mice", "Numbers", "Arrays", "Strings"] },
    { question: "________ is a useful tool for debugging in JavaScript", correctAnswer: "Console.log", answers: ["Console.log", "Console.sheep", "Console.stone", "Console.brick"] }
];

//------------------------------
let welcomePage = document.querySelector(".welcome-box");
let questionBox = document.querySelector(".question-box");
let resultBox = document.querySelector(".result-box");
let scoreBox = document.querySelector(".Highscores-box");
let timebar = document.querySelector(".gameTime");
let timerElement = document.getElementById("timer");
let questioinEl = document.querySelector(".question");
let answersEl = document.querySelectorAll(".answer");
let scoreEl = document.getElementById("score");

let startBtn = document.getElementById("startBtn");

let score = 0;
let qusetionNum = 0;

// The init function is called when the page loads ,just display welcome message
function init() {
    welcomePage.setAttribute("style", "display:block");
    questionBox.setAttribute("style", "display:none");
    resultBox.setAttribute("style", "display:none");
    scoreBox.setAttribute("style", "display:none");
    timebar.setAttribute("style", "display:none");
}


//press start button, start the quiz
//start timer: count down erver 1s, if wrong answer received -10s.
//display questions and answer
//verift the answer(if correct go next and +10 point, if wrong -10s, -10 points and go next)

//when complete all question, show score and ask for input name.
//save score and name to localStorage.

//display highscore
//if "play again", can start the quiz again.
//reset score button

init();
// Attach event listener to start button to call startGame function on click
startBtn.addEventListener("click", startGame);

// The startGame function is called when the start button is clicked
function startGame() {
    welcomePage.setAttribute("style", "display:none");
    questionBox.setAttribute("style", "display:block");
    timebar.setAttribute("style", "display:block");
    isDone = false;
    timerCount = 60;
    //   // Prevents start button from being clicked when round is in progress
    //   startButton.disabled = true;
    qusetionNum = 0;
    renderQuestion();
    startTimer();
}

function renderQuestion() {
    if (qusetionNum < questionSet.length) {
        questioinEl.textContent = questionSet[qusetionNum].question;
        for (let i = 0; i < 4; i++) {
            answersEl[i].textContent = questionSet[qusetionNum].answers[i];
        }
    }
    if (qusetionNum == questionSet.length){
        endGame();
    }

}

function checkCorrect(event) {
    let userAnswer = answersEl[event].dataset.ans
    if (questionSet[qusetionNum].answers[userAnswer] == questionSet[qusetionNum].correctAnswer) {
        score = score + 10;
        return true;
    } else {
        score = score - 10;
        return false;
    }
}

// The winGame function is called when the win condition is met
function endGame() {
    //dispaly all done screen only
    welcomePage.setAttribute("style", "display:none");
    questionBox.setAttribute("style", "display:none");
    resultBox.setAttribute("style", "display:block");
    scoreBox.setAttribute("style", "display:none");
    timebar.setAttribute("style", "display:none");
    //   setWins()
    scoreEl.textContent = score;
}


// The setTimer function starts and stops the timer and triggers winGame() and loseGame()
function startTimer() {
    // Sets timer
    timer = setInterval(function () {
        timerCount--;
        timerElement.textContent = timerCount;
        if (timerCount >= 0) {
            // Tests if finishing condition is met
            if (isDone && timerCount > 0) {
                // Clears interval and stops timer
                clearInterval(timer);
                endGame();
            }
        }
        // Tests if time has run out
        if (timerCount === 0) {
            // Clears interval
            clearInterval(timer);
            endGame();
        }
    }, 1000);
}



// Updates win count on screen and sets win count to client storage
function setWins() {
    //   win.textContent = winCounter;
    //   localStorage.setItem("winCount", winCounter);
}


// These functions are used by init
function getWins() {
    //   // Get stored value from client storage, if it exists
    //   var storedWins = localStorage.getItem("winCount");
    //   // If stored value doesn't exist, set counter to 0
    //   if (storedWins === null) {
    //     winCounter = 0;
    //   } else {
    //     // If a value is retrieved from client storage set the winCounter to that value
    //     winCounter = storedWins;
    //   }
    //   //Render win count to page
    //   win.textContent = winCounter;
}







// Calls init() so that it fires when page opened

// init();

// Bonus: Add reset button
// var resetButton = document.querySelector(".reset-button");

// function resetGame() {
//   // Resets win and loss counts
//   winCounter = 0;
//   loseCounter = 0;
//   // Renders win and loss counts and sets them into client storage
//   setWins()
//   setLosses()
// }
// // Attaches event listener to button
// resetButton.addEventListener("click", resetGame);
