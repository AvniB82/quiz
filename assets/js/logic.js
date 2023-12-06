var questions = [

];

document.addEventListener("DOMContentLoaded", function() {

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

    submitButton.style.display = "none";
}

// displaying questions
function displayQuestion(index) {
    var questionTitle = document.getElementById("question-title");
    var choicesContainer = document.getElementById("choices");


    questionTitle.textContent = questions[index].question;
    questionsContainer.innerHTML = "";

    var allChoices = [...questions[index].wrongAnswers, questions[index].correctAnswer];
    shuffleArray(allChoices);


    for (var i = 0; i < allChoices.length; i++) {
        var choiceButton = document.createElement("button");
        choiceButton.textContent = allChoices[i];
        choiceButton.addEventListener("click", function () {
          checkAnswer(choiceButton.textContent);
        });
        choicesContainer.appendChild(choiceButton);
      }
    }
function shuffleArray(array) {
    for (var i = array.length - 1; i > 0; i--) {
        var j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }

}

// displaying correct or incorrect message
function checkAnswer(selectedAnswer) {
    if (selectedAnswer === questions[currentQuestionIndex].correctAnswer) {
        showFeedback ("correct");
    }
    else {
        showFeedback("incorrect");
    }

    currentQuestionIndex++;
    }

    if (currentQuestionIndex < questions.length) {
        displayQuestion(currentQuestionIndex);
    }
    else {
        endQuiz();
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
    
    function submitScore() {
        var initials = initialsInput.value.trim();
        if (initials !=="") {
            console.log("Score submitted:", initials, timeElement.textContent);
        }
    }

    });