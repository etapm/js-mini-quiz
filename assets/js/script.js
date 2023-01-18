// hide the  title
function hideTitle() {
    document.getElementById("title").style.display = "none";
  }
  
// questions for the quiz
const questions = [
    {
        question: "How do you refer to an external script called 'xxx.js'?",
        choices: [
            "a. script name='xxx.js'",
            "b. script src='xxx.js'",
            "c. script href='xxx.js'",
            "d. script ref='xxx.js'"
        ],
        answer: 1
    },
    {
        question: "How do you create a function in JavaScript?",
        choices: [
            "a. function myFunction() {}",
            "b. function:myFunction() {}",
            "c. myFunction function() {}",
            "d. function = myFunction() {}"
        ],
        answer: 0
    },
    {
        question: "What is the difference between let and var in JavaScript?",
        choices: [
            "a. let is block-scoped, var is function-scoped",
            "b. let is function-scoped, var is global-scoped",
            "c. let is hoisted, var is not",
            "d. let is new, var is old"
        ],
        answer: 0
    },
    {
        question: "How do you declare a variable in JavaScript?",
        choices: [
            "a. const myVariable;",
            "b. var myVariable;",
            "c. let myVariable;",
            "d. variable myVariable;"
        ],
        answer: 1
    },
    {
        question: "What is the difference between == and === in JavaScript?",
        choices: [
            "a. == checks for type, === checks for value",
            "b. == checks for identity, === checks for equality",
            "c. == checks for value, === checks for type",
            "d. == checks for equality, === checks for identity"
        ],
        answer: 3
    },
    {
        question: "What is the difference between null and undefined in JavaScript?",
        choices: [
            "a. null is an object, undefined is a variable",
            "b. null is intentional no value, undefined is unintentional no value",
            "c. null is truthy, undefined is falsy",
            "d. null is a variable, undefined is a function"
        ],
        answer: 1
    },
    {
        question: "How do you add an element to an array in JavaScript?",
        choices: [
            "a. array.add(element);",
            "b. array.push(element);",
            "c. array.append(element);",
            "d. array[array.length] = element;"
        ],
        answer: 1
    },
    {
        question: "How do you create a for loop in JavaScript?",
        choices: [
            "a. for i in array",
            "b. forEach i in array",
            "c. for (var i = 0; i < array.length; i++)",
            "d. for i = 0 to array.length"
        ],
        answer: 2
    },
    {
        question: "How do you create an array in JavaScript?",
        choices: [
            "a. var myArray = {}",
            "b. var myArray = []",
            "c. var myArray = new Array()",
            "d. var myArray = Array.create()"
        ],
        answer: 2
    },

];

let score = 0;
let currentQuestion = 0;
let timer;
let timerInterval = 1000; // 1 second
let timeLimit = 77; // 77 seconds

//start the quiz on click of start button
document.getElementById("start-button").addEventListener("click", startQuiz);

// hide the title on start button press
document.getElementById("start-button").addEventListener("click", hideTitle);

function startQuiz() {
    hideTitle();
    document.getElementById("start-button").style.display = "none";
    document.getElementById("quiz").style.display = "block";
    startTimer();
    showQuestion();
}

//start the timer
function startTimer() {
    timer = setInterval(function() {
        if(timeLimit > 0){
          timeLimit--;
          document.getElementById("timer").innerHTML = timeLimit;
        }
        if (timeLimit === 0) {
            clearInterval(timer);
            endQuiz();
        }
    }, timerInterval);
}

//show the question
function showQuestion() {
    let question = questions[currentQuestion].question;
    let choices = questions[currentQuestion].choices;
    document.getElementById("question").innerHTML = question;
    for (let i = 0; i < choices.length; i++) {
        document.getElementById("choice" + i).innerHTML = choices[i];
        document.getElementById("choice" + i).addEventListener("click", checkAnswerAndUpdateScore);
    }
}

//check the answer and update the score
function checkAnswerAndUpdateScore(e) {
    let selected = e.target.innerHTML;
    let currentAnswer = questions[currentQuestion].answer;
    let correct = questions[currentQuestion].choices[currentAnswer];
    if (selected === correct) {
        score++;
        document.getElementById("result-message").innerHTML = "Great Job!";
    } else {
        timeLimit -= 10;
        document.getElementById("result-message").innerHTML = "You got this!";
    }
    currentQuestion++;
    if (currentQuestion === questions.length) {
        endQuiz();
    } else {
        showQuestion();
    }
}

//end the quiz
function endQuiz() {
    clearInterval(timer);
    document.getElementById("quiz").style.display = "none";
    document.getElementById("end-screen").style.display = "block";
    document.getElementById("final-score").innerHTML = score;
    displayHighScores();
    document.getElementById("result-message").innerHTML = "";
    }

 // save score
function saveScore() {
    let initials = document.getElementById("initials").value;
    let scoreObject = {
        initials: initials,
        score: score
    }
    
    let highScores = JSON.parse(localStorage.getItem("highScores")) || [];
    highScores.push(scoreObject);
        highScores.sort((a, b) => b.score - a.score);
        localStorage.setItem("highScores", JSON.stringify(highScores));
        displayHighScores();
    }
    
    // display high scores
    function displayHighScores() {
        let highScoresList = document.getElementById("high-scores");
        highScoresList.innerHTML = "";
        let highScores = JSON.parse(localStorage.getItem("highScores")) || [];
        for (let i = 0; i < highScores.length; i++) {
            let scoreObject = highScores[i];
            let li = document.createElement("li");
            li.innerHTML = scoreObject.initials + " - " + scoreObject.score;
            highScoresList.appendChild(li);
        }
    }
    
    //clear high scores
    document.getElementById("clear-scores").addEventListener("click", function() {
        localStorage.removeItem("highScores");
        displayHighScores();
    });

// go back button
let goBackButton = document.createElement("button");
goBackButton.innerHTML = "Go Back";
goBackButton.setAttribute("class", "btn btn-primary");
goBackButton.addEventListener("click", function(){
    window.location.href = 'https://etapm.github.io/js-mini-quiz/';
});

let clearButton = document.getElementById("clear-scores");
clearButton.parentNode.insertBefore(goBackButton, clearButton.nextSibling);


