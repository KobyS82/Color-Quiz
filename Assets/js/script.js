var questionPrompt = document.querySelector('#question');
var displayGame = document.querySelector('.game');
var start = document.querySelector('#start-button');
var choicesEl = document.querySelector('#choices');
var initials = document.querySelector('#initials');
var formBtn = document.querySelector('#formBtn');
var timerEl = document.querySelector('#timer');

var questionIndex = 0;
var startTime = 50;
var score = 0;
var turn = false;

var questions = [
    {question: "what is my favorite color?",
     answer: "purple",
     choices: ["blue", "black", "orange", "purple"]
    },
    {question: "test?",
     answer: "blue",
     choices: ["blue", "black", "orange", "purple"]
    },


]

function displayGameOver(TF){

}


function startGame(){
    displayGame.setAttribute('style','display: visible')
    timer();
    getQuestion();
}

function timer(){

    var interval = setInterval(function(){
        if (startTime < 0){
            clearInterval(interval);
            gameOver();
        } else {
            timerEl.setAttribute('value', startTime);
            console.log(startTime);
            startTime--;
        }

    },1000)

}


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
                //TODO change to display
                console.log('correct');
                questionIndex++;
                score++;
                    if (questionIndex < questions.length) {
                        getQuestion();
                    } else {
                        gameOver();
                    }
            }  else {
                console.log('incorrect');
                startTime -= 10;

            }
        }
    )
    }
}

//function tha\
function gameOver(){
    //TODO change visuals
    console.log('game over');


}

// High score board
function highScore(){
    var init = initials.value;
    var timeScore = timer.interval;
    //localStorage.setItem(init, score);
    localStorage.setItem(init, timeScore);
}

start.addEventListener("click", startGame);
formBtn.addEventListener("click", highScore);