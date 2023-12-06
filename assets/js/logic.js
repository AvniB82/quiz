document.addEventListener("DOMContentLoaded", function() {

    var startButton = document.getElementById("start");
    var timeElement = document.getElementById("time");
    var submitButton = document.getElementById("submit");
    var questionsContainer = document.getElementById("questions");
    var feedbackContainer = document.getElementById("feedback");
    var initialsInput = document.getElementById("initials");
    var correctSound = document.getElementById("correctSound");
    var incorrectSound = document.getElementById("incorrectSound");

    var currentQuestionIndex = 0;
    var timer;

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
    choicesContainer.innerHTML = "";

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

    function checkAnswer(selectedAnswer) {
        if (selectedAnswer === questions[currentQuestionIndex].correctAnswer) {
            showFeedback("Correct!");
            playCorrectSound();
        } else {
            showFeedback("Incorrect!");
            deductTime();
            playIncorrectSound();
        }

        currentQuestionIndex++;

        if (currentQuestionIndex < questions.length) {
            displayQuestion(currentQuestionIndex);
        } else {
            endQuiz();
        }
    }

    function playCorrectSound() {
        correctSound.play();
    }

    function playIncorrectSound() {
        incorrectSound.play();
    }

    function showFeedback(message) {
        feedbackContainer.textContent = message;
        feedbackContainer.classList.remove("hide");
        setTimeout(() => {
            feedbackContainer.classList.add("hide");
        }, 1000);
    }

    function deductTime() {
        var currentTime = parseInt(timeElement.textContent);
        if (currentTime >= 10) {
            updateTime(currentTime - 10);
        } else {
            updateTime(0);
        }
    }

    function startTimer() {
        var timeLeft = 60;
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
        if (initials !== "") {
            console.log("Score submitted:", initials, timeElement.textContent);
        }
    }
});