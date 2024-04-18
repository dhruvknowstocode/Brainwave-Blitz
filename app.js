let gameSequence = [];
let userSequence = []; 
let gameStarted = false;
let level = 0;
let score = 0;
let highestScore = 0;
const colors = ["yellow", "red", "purple", "blue"];
const scoreDisplay = document.getElementById("scoreDisplay");
const highestScoreDisplay = document.getElementById("highestScore");

document.addEventListener("keypress", function(){
    if(!gameStarted){
        console.log("Game is started");
        gameStarted = true;
        levelUp();
    }
});

function flashButton(btn){
    btn.classList.add("flash");
    setTimeout(function(){
        btn.classList.remove("flash");
    }, 200);
}

function levelUp(){
    userSequence = [];
    level++;
    scoreDisplay.innerText = `Score: ${score}`;
    document.querySelector("h2").innerText = `Level ${level}`;
    let randomIndex = Math.floor(Math.random() * 4);
    let randomColor = colors[randomIndex];
    let buttonElement = document.getElementById(randomColor);
    gameSequence.push(randomColor);
    console.log(gameSequence);
    flashButton(buttonElement);
}

function checkAnswer(index){
    if(userSequence[index] === gameSequence[index]){
        if(userSequence.length === gameSequence.length){
            score++;
            if(score > highestScore){
                highestScore = score;
                highestScoreDisplay.innerText = `Highest Score: ${highestScore}`;
            }
            setTimeout(levelUp, 1000);
        }
    } else {
        gameOver();
    }
}

function buttonPress(){
    let button = this;
    flashButton(button);
    let userColor = button.getAttribute("id"); 
    userSequence.push(userColor);
    checkAnswer(userSequence.length - 1);
}

let allButtons = document.querySelectorAll(".btn");
for(let button of allButtons){
    button.addEventListener("click", buttonPress);
}

function resetGame(){
    gameStarted = false;
    userSequence = [];
    gameSequence = [];
    level = 0;
    score = 0;
    scoreDisplay.innerText = "Score: 0";
}

function gameOver(){
    gameStarted = false;
    document.querySelector("h2").innerHTML = `Game Over! Your score is <b>${score}</b><br>Press any key to start`;
    document.body.style.backgroundColor = "red";
    setTimeout(function(){
        document.body.style.backgroundColor = "wheat";
    }, 150);
    resetGame();
}
