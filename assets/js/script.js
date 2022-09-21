//delcare all required variables
const questionSet = [
    { question: "What is computer coding?", correctAnswer: "Telling a computer what to do", answers: ["A List of functions", "Telling a computer what to do", "A TV show", "A Radio show"] },
    { question: "In JavaScript, what is used in conjunction with HTML to “react” to certain elements?", correctAnswer: "Event", answers: ["Event", "Condition", "Boolean", "RegExp"] },
    { question: "To be defined, strings must be enclosed by what?", correctAnswer: "Quotes", answers: ["Brackets", "Quotes", "Curly Brackets", "Integers"] },
    { question: "In JavaScript, what element is used to store multiple values in a single variable?", correctAnswer: "Arrays", answers: ["Strings", "Arrays", "Functions", "Veriables"] },
    { question: "What is the maximum number of Math.floor(Math.random()*5)?", correctAnswer: "5", answers: ["2", "3", "4", "5"] },
    { question: "What are people who write computer code called", correctAnswer: "Programmers", answers: ["Manufacturers", "Cryptographers", "Programmers", "Professors"] },
    { question: "Which of these NOT run using a computer program?", correctAnswer: "Bicycle", answers: ["Bicycle", "Car", "Rocket", "Train"] },
    { question: "What are the identifiers called that cannot be used as variables or function names?", correctAnswer: "Reserved Words", answers: ["Favourites", "Concrete Terms", "Constants", "Reserved Words"] },
    { question: "What is the name of the object that allows you to perform mathematical tasks with the interpreter?", correctAnswer: "Math", answers: ["Count", "Math", "Number", "Solve"] },
    { question: "What is the element called that is used to describe the set of variables, objects, and functions you explicitly have access to?", correctAnswer: "Scope", answers: ["Scope", "Range", "Restriction", "Limit"] },
];

let welcomePage = document.querySelector(".welcome-box");
let questionBox = document.querySelector(".question-box");
let resultBox = document.querySelector(".result-box");
let scoreBox = document.querySelector(".Highscores-box");
let timebar = document.querySelector(".gameTime");
let timerElement = document.getElementById("timer");
let currentScore = document.getElementById("currentScore");
let questioinEl = document.getElementById("question");
let allAnswerEl = document.getElementById("all-answer");
let answersEl = document.querySelectorAll(".answer");
let scoreEl = document.getElementById("score");
let startBtn = document.getElementById("startBtn");
let submitBtn = document.getElementById("submit");
let backBtn = document.getElementById("backBtn");
let playAgain = document.getElementById("playAgain");
let clearBtn = document.getElementById("clearBtn");
let viewHighScoreBtn = document.getElementById("viewHighScore");
let highScoreRecord = [];
var isDone = true;
var timer;
var timerCount;
let score = 0;
let qusetionNum = 0;
let letters = /^[A-Za-z]+$/;

// The init function is called when the page loads ,just display welcome message
function init() {
    welcomePage.setAttribute("style", "display:flex");
    questionBox.setAttribute("style", "display:none");
    resultBox.setAttribute("style", "display:none");
    scoreBox.setAttribute("style", "display:none");
    timebar.setAttribute("style", "display:none");
}

//call init function to show welcome page
init();

// Attach event listener to start button to call startGame function on click
startBtn.addEventListener("click", startGame);

// The startGame function is called when the start button is clicked
function startGame() {
    welcomePage.setAttribute("style", "display:none");
    questionBox.setAttribute("style", "display:flex");
    timebar.setAttribute("style", "display:block");
    isDone = false;
    timerCount = 90;
    score = 0;
    qusetionNum = 0;
    currentScore.textContent = score;
    timerElement.textContent = timerCount;
    renderQuestion();
    startTimer();
}

// The setTimer function starts the timer and stop the timmer when end game.
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
        if (timerCount <= 0) {
            // Clears interval and stops timer
            clearInterval(timer);
            endGame();
        }
    }, 1000);
}

//function to render question on screen
function renderQuestion() {
    if (qusetionNum < questionSet.length) {
        questioinEl.textContent = questionSet[qusetionNum].question;
        for (let i = 0; i < 4; i++) {
            answersEl[i].textContent = questionSet[qusetionNum].answers[i];
        }
    }
    if (qusetionNum == questionSet.length) {
        endGame();
    }
}

//Event handler to check correctness of answer and render next question
allAnswerEl.addEventListener("click", function (event) {
    if (event.target.matches(".answer")) {
        checkCorrect(event);
        qusetionNum++;
        renderQuestion();
    }
})

// function to check anser correctness and count the score accordingly
function checkCorrect(event) {
    let userAnswer = event.target.dataset.ans;
    if (questionSet[qusetionNum].answers[userAnswer] == questionSet[qusetionNum].correctAnswer) {
        score = score + 10;
        currentScore.textContent = score;
        return true;
    } else {
        timerCount = timerCount - 10;
        return false;
    }
}

// The endGame function is called when the end condition is met
function endGame() {
    //dispaly result screen only
    welcomePage.setAttribute("style", "display:none");
    questionBox.setAttribute("style", "display:none");
    resultBox.setAttribute("style", "display:flex");
    scoreBox.setAttribute("style", "display:none");
    timebar.setAttribute("style", "display:none");
    viewHighScoreBtn.setAttribute("style", "display:none");
    isDone = true;
    scoreEl.textContent = score;
}

//collect user initial and display the Highscore record
submitBtn.addEventListener("click", function (event) {

    event.preventDefault();
    let userName = document.getElementById("initial").value;
    //respond only when user enter valid user inital
    if (userName.match(letters)) {
        highScoreRecord.push({ "Name": userName, "Score": score });
        saveScoreRecord(userName);
        resultBox.setAttribute("style", "display:none");
        scoreBox.setAttribute("style", "display:flex");
        viewHighScoreBtn.setAttribute("style", "display:none");
        renderScore();
    }

})

//Function to render Highscore record on screen
function renderScore() {
    readScoreRecord();
    let scoreListEl = document.querySelector(".highScore-list");
    //clear previous <li> from HTML
    while (scoreListEl.firstChild) {
        scoreListEl.removeChild(scoreListEl.firstChild);
    }
    //initialize scoreRecord array if it is not exist
    if (highScoreRecord == null) {
        highScoreRecord = []
    }
    //show score record on screen
    for (let i = 0; i < highScoreRecord.length; i++) {
        let liEl = document.createElement("li");
        liEl.textContent = highScoreRecord[i].Name + " : " + highScoreRecord[i].Score;
        scoreListEl.appendChild(liEl);
    }
}

//When click the "view high score" button, will show score record
viewHighScoreBtn.addEventListener("click", function () {
    welcomePage.setAttribute("style", "display:none");
    questionBox.setAttribute("style", "display:none");
    resultBox.setAttribute("style", "display:none");
    scoreBox.setAttribute("style", "display:flex");
    timebar.setAttribute("style", "display:none");
    viewHighScoreBtn.setAttribute("style", "display:none");
    renderScore();
})

//Event handler for back button
backBtn.addEventListener("click", function () {
    //if still answering question, will back to question section
    if (isDone) {
        welcomePage.setAttribute("style", "display:flex");
        questionBox.setAttribute("style", "display:none");
        resultBox.setAttribute("style", "display:none");
        scoreBox.setAttribute("style", "display:none");
        timebar.setAttribute("style", "display:none");
        viewHighScoreBtn.setAttribute("style", "display:block");
    }
    //if finish all questions, will back to welcome page screen
    else {
        welcomePage.setAttribute("style", "display:none");
        questionBox.setAttribute("style", "display:flex");
        resultBox.setAttribute("style", "display:none");
        scoreBox.setAttribute("style", "display:none");
        timebar.setAttribute("style", "display:block");
        viewHighScoreBtn.setAttribute("style", "display:block");
    }
})

//When click "clear" button, will clear all score history
clearBtn.addEventListener("click", function () {
    highScoreRecord = [];
    localStorage.setItem("highScore", JSON.stringify(highScoreRecord));
    readScoreRecord();
    renderScore();
})

//Function to read score record from local storage
function readScoreRecord() {
    highScoreRecord = JSON.parse(localStorage.getItem("highScore"));
    if (highScoreRecord == null) {
        highScoreRecord = [];
    }
}

//Function to write score to local storage
function saveScoreRecord(userName) {
    readScoreRecord();
    highScoreRecord.push({ "Name": userName, "Score": score });
    localStorage.setItem("highScore", JSON.stringify(highScoreRecord));
}