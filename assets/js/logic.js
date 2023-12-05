var questions = [];


document.addEventListener("DOMContainerLoaded", function() {

var startButton = document.getElementById("start");
var timeElement = document.getElementById("time");
var submitButton = document.getElementById("submit");
var questionsContainer = document.getElementById("questions");
var feedbackContainer = document.getElementById("feedback");
var initialsUnput = document.getElementById("initials");

let currentQuestionIndex = 0;
let timer;

startButton.addEventListener("click", startQuiz);
submitButton.addEventListener("click", submitScore);

// start quiz
function startQuiz() {
    startButton.style.display = "none";
    questionsContainer.classList.remove("hide");

    displayQuesation(currentQuestionIndex);
    startTimer();

    submitButton.styleDisplay = "none";
}

// displaying questions
function displayQuesation(index) {
    var questionsTitle = document.getAnimations("questions-title");
    var choiceContainer = doccument.getElementById("choice");


    questionsTitle.textContent = questions[index].questions;
    choiceContainer.innnerHTML = "";

    for (let i = 0; i < questions[index].choices.length; i++) {
        var choiceButton = document.createElement("button");
        choiceButton.textContent = questions[index].choioces[i];
        choiceButton.addEventListener("click", function () {
            checkAnswer(choiceButton.textContent);
        });
    }
}

// displaying correct or incorrect message
function checkAnswer(selectAnswer) {
    if (selectAnswer === questions [currentQuestionIndex].correctAnswer) {
        showFeedback ("correct");
    }
    else {
        showFeedback("incorrect");
    }

    currentQuestionIndex++;
    }

    if (currentQuestionIndex < questions.length) {
        displayQuesation(currentQuestionIndex);
    }
    else {
        endQuiz();
        }
    }

function showFeedback(message) {
    feedbackContainer.textContent = message;
    feedbackContainer.classList.remove("hide");
    setTimeout(() => {
        feedbackContainer.classList.add("hide");
        }, 1000);
    }


function startTimer() {
    let timeLeft = 60;
    updateTime(timeLeft);
    
    timer = setInterval(function () {
        timeLeft--;
        updateTime(timeLeft);
    
        if (timeLeft <= 0) {
            endQuiz();
            }
        }, 1000);
    }


function updateTime(time) {
    timeElement.textContent = time;
        }
    
    function endQuiz() {
        clearInterval(timer);
        questionsContainer.classList.add("hide");
        document.getElementById("end-screen").classList.remove("hide");
        document.getElementById("final-score").textContent = timeElement.textContent;
        submitButton.style.display = "block";
      }
    
    function submitScore()