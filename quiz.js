let count = 0;
let startBtn = document.getElementById("startBtn");
let instructionContainer = document.getElementById("instruction-container");
let questionContainer = document.getElementById("question-container");
let resultContainer = document.getElementById("result-container");
let question = document.getElementById("question");
let options = document.getElementsByClassName("option");
let result = document.getElementById("result");
let marks = 0;

let timerElement = document.getElementById("timer");
let timeLeft = 600; 
let timerInterval;

function startTimer() {
    clearInterval(timerInterval);
    timeLeft = 600; 
    timerInterval = setInterval(function () {
        let minutes = Math.floor(timeLeft / 60);
        let seconds = timeLeft % 60;
        timerElement.textContent = "⏳ Time Left:${minutes}:${seconds < 10 ? "," + seconds : seconds}";
        

        if (timeLeft <= 0) {
            clearInterval(timerInterval);
            endQuiz();
        }
        timeLeft--;
    }, 1000);
}

function endQuiz() {
    clearInterval(timerInterval);
    questionContainer.style.display = "none";
    instructionContainer.style.display = "none";
    resultContainer.style.display = "block";
    startBtn.textContent = "Restart";
    result.textContent = "🎉You finished the quiz! Your final score: " + marks + " marks";
    count = 0;
    marks = 0;
}

questionContainer.style.display = "none";
resultContainer.style.display = "none";

let questions = [
    {
        question:"Which tag is used to create a hyperlink in HTML?",
        options:["<link>","<a>","<href>","<h1>"],
        correct_option:"<a>"
    },
    {
        question:"Which CSS property is used to change text color?",
        options:["font-color","text-style","color","background-color"],
        correct_option:"color"
    },
    {
        question:"Which JavaScript method is used to select an element by ID?",
        options:["querySelectorAll","getElementById","getElementsByClassName","getTagName"],
        correct_option:"getElementById"
    },
    {
        question:"Which attribute in form is used to specify the input type?",
        options:["name","type","id","class"],
        correct_option:"type"
    },
    {
        question:"Which CSS layout uses rows and columns?",
        options:["Flexbox","Grid","Float","Block"],
        correct_option:"Grid"
    },
    {
        question:"Which symbol is used for comments in JavaScript?",
        options:["//","<!-- -->","/* */","#"],
        correct_option:"//"
    },
    {
        question:"Which HTML element is used to embed JavaScript code?",
        options:["<js>","<script>","<javascript>","<code>"],
        correct_option:"<script>"
    },
    {
        question:"Which method adds a new element at the end of an array in JS?",
        options:["push()","pop()","shift()","unshift()"],
        correct_option:"push()"
    }
];
startBtn.onclick=function(){
    if(count==questions.length){
        endQuiz();
        return;
    }
    questionContainer.style.display="block";
    instructionContainer.style.display="none";
    resultContainer.style.display="none";

    if(count==0){
        startTimer();
    }

    startBtn.textContent="Next"
    question.textContent = questions[count].question 
    for(let i=0;i<4;i++){
        options[i].textContent = questions[count].options[i];
        options[i].classList.remove("correct","wrong");
        options[i].disabled=false;
    }
    count++;
}

for(let option of options){
    option.onclick=function(){
        if(option.textContent==questions[count-1].correct_option){
            option.classList.add("correct");
            marks+=2;
        }else{
            option.classList.add("wrong");
            for(let i of options){
                if(i.textContent==questions[count-1].correct_option){
                    i.classList.add("correct");
                }
            }
            marks--;
        }
        for(let i of options){
            i.disabled = true;
        }
    }   
}