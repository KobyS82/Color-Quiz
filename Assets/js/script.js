var questionPrompt = document.querySelector('#question');
var displayGame = document.querySelector('.game');
var start = document.querySelector('#start-button');
var headEl = document.querySelector('#startHead');
var choicesEl = document.querySelector('#choices');
var initials = document.querySelector('#initials');
var formBtn = document.querySelector('#formBtn');
var timerEl = document.querySelector('#timer');
var gameOverEl = document.querySelector('#gameOver');
var answerEl = document.querySelector('#answer');
var scoresEl = document.querySelector('.scores');
var scoresList = document.querySelector('#scoresList');

var questionIndex = 0;
var startTime = 50;
var score = 0;
var turn = false;
var answerTrue = 'Correct!'
var answerFalse = 'Incorrect :(';

// Questions for the Quiz
var questions = [
    {question: "What is my favorite color?",
     answer: "purple",
     choices: ["blue", "black", "brown", "purple"]
    },
    {question: "Color of the sky during the day?",
     answer: "blue",
     choices: ["blue", "black", "brown", "purple"]
    },
    {question: "Color of a football",
     answer: "brown",
     choices: ["blue", "black", "brown", "purple"]
    },
    {question: "Color of eggplant",
     answer: "purple",
     choices: ["blue", "black", "brown", "purple"]
    },
    {question: "Color of the Sea",
     answer: "blue",
     choices: ["blue", "black", "brown", "purple"]
    },
    {question: "Color of dirt",
     answer: "brown",
     choices: ["blue", "black", "brown", "purple"]
    }
]

// Starts the game
function startGame(){
    displayGame.setAttribute('style','display: visible');
    start.setAttribute('style', 'display: none');
    headEl.textContent = '';
    timer();
    getQuestion();
}


// Creates and tracks the timer
function timer(){
    var interval = setInterval(function(){
        if (startTime < 0){
            clearInterval(interval);
            gameOver();
            timerEl.textContent = '';
        } else {
            // timerEl.setAttribute('style', 'display: flex');
            // timerEl.setAttribute('value', startTime);
            timerEl.textContent = "Time Left: " + startTime;
            console.log(startTime);
            startTime--;
        }

    },1000)

}


// Displays game over
function gameOver(){
    gameOverEl.setAttribute('style', 'display: initial');
    displayGame.setAttribute('style', 'display: none');
    headEl.textContent = 'Game Over!';
}

// Tracks high scores
function setHighScore(){
    var init = initials.value;
    //var person = {init, score};
    //localStorage.setItem('user', JSON.stringify(person));
    localStorage.setItem(init, score);
    //var timeScore = timer.interval;
    //localStorage.setItem(init, timeScore);
    highScoresPage();
}

// Leader Board
function highScoresPage(){
    //var user = JSON.parse(localStorage.getItem('user'));
    var userScore = localStorage.getItem(initials.value);
    gameOverEl.setAttribute('style', 'display: none');
    headEl.textContent = 'Your Score!';
    console.log(initials.value);
    scoresList.textContent = initials.value + ": " + userScore;

}

// Gets questions for quiz and checks if the user clicks the right one
function getQuestion(){
    var currentQuestion = questions[questionIndex];
    questionPrompt.textContent = currentQuestion.question;
    choicesEl.innerHTML = '';

    for (var i = 0; i < currentQuestion.choices.length; i++) {
        var option = currentQuestion.choices[i];
        var choiceBtn = document.createElement('button');
        choiceBtn.setAttribute('value', option);
        choiceBtn.textContent = option;
        choicesEl.appendChild(choiceBtn);
        choiceBtn.addEventListener('click', function(event){

            if (event.target.textContent === questions[questionIndex].answer){
                answerEl.textContent = answerTrue;
                setTimeout(function(){
                    answerEl.textContent = '';
                }, 3000);
                questionIndex++;
                score++;
                    if (questionIndex < questions.length) {
                        getQuestion();
                    } else {
                        gameOver();
                    }
            }  else {
                answerEl.textContent = answerFalse;
                setTimeout(function(){
                    answerEl.textContent = '';
                }, 3000);
                startTime -= 10;

            }
        })
    }
}

// Listens for clicks on buttons
start.addEventListener("click", startGame);
formBtn.addEventListener("click", setHighScore);