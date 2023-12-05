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

    displayQuestion(currentQuestionIndex);
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



}