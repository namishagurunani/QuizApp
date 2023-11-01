const container = document.querySelector('.container');
const questionBox = document.querySelector('.question');
const choicesBox = document.querySelector('.choices');
const nextBtn = document.querySelector('.nextBtn');
const scoreCard = document.querySelector('.scoreCard');
const alert = document.querySelector('.alert');
const startBtn = document.querySelector('.startBtn');
const timer = document.querySelector('.timer');


// Make an array of objects that stores question, choices of question and answer
const quiz = [
    {
        question: "Q. Which of the following is not a CSS box model property?",
        choices: ["margin", "padding", "border-radius", "border-collapse"],
        answer: "border-collapse"
    },
    {
        question: "Q. Which of the following is not a valid way to declare a function in JavaScript?",
        choices: ["function myFunction() {}", " let myFunction = function() {};", "myFunction: function() {}", "const myFunction = () => {};"],
        answer: "myFunction: function() {}"
    },
    {
        question: "Q. Which of the following is not a JavaScript data type?",
        choices: ["string", "boolean", "object", "float"],
        answer: "float"
    },
    {
        question: "Q. What is the purpose of the this keyword in JavaScript?",
        choices: ["It refers to the current function.", "It refers to the current object.", "It refers to the parent object.", " It is used for comments."],
        answer: "It refers to the current object."
    },
    {
        question: "Q. Which of the following is a JavaScript framework?",
        choices: ["JavaFX", "jQuery", "JSON", "Joomla"],
        answer: "jQuery"
    },
    {
        question: "Q. What is the result of '2' + 2 in JavaScript?",
        choices: ["4", "22", "2", "Error"],
        answer: "22"
    },
    {
        question: "Q. Which function is used to parse a JSON string into a JavaScript object?",
        choices: ["parseJSON", "JSON.parse", "stringifyJSON", "parseString"],
        answer: "JSON.parse"
    },
    {
        question: "Q. What is the purpose of the 'eval()' function in JavaScript?",
        choices: ["To evaluate an arithmetic expression", "To validate user input", "To execute JavaScript code from a string", "To log messages to the console"],
        answer: "To execute JavaScript code from a string"
    },
    {
        question: "Q. What does 'NaN' stand for in JavaScript?",
        choices: ["Not a Number", "No Available Number", "Numeric Algorithm", "New Assignment Number"],
        answer: "Not a Number"
    },
    {
        question: "Q. What is the purpose of the 'Array.isArray()' method in JavaScript?",
        choices: ["To check if a variable is an array", "To convert an array to a string", "To reverse the elements of an array", "To sort the elements of an array"],
        answer: "To check if a variable is an array"
    },
    {
        question: "Q. What is the purpose of the 'typeof' operator in JavaScript?",
        choices: ["To check if a variable is defined", "To check the type of a variable or expression", "To convert a value to a specific type", "To create new variables"],
        answer: "To check the type of a variable or expression"
    },
    {
        question: "Q. What is the 'DOM' in the context of web development?",
        choices: ["Document Object Model", "Data Object Model", "Document Ordering Model", "Dynamic Object Manipulation"],
        answer: "Document Object Model"
    },
    {
        question: "Q. Which of the following is not a valid JavaScript variable name?",
        choices: ["myVariable", "123variable", "_variable", "$variable"],
        answer: "123variable"
    },
    {
        question: "Q. What is the 'typeof' 'null' in JavaScript?",
        choices: ["object", "null", "undefined", "number"],
        answer: "object"
    },{
        question: "Q. What does the 'async' keyword do in JavaScript?",
        choices: [
            "It makes a function execute asynchronously and return a promise.",
            "It makes a function execute synchronously and block the main thread.",
            "It defines an anonymous function in JavaScript.",
            "It defines a variable with asynchronous behavior."
        ],
        answer: "It makes a function execute asynchronously and return a promise."
    },
    {
        question: "Q. What is the difference between 'let' and 'const' in JavaScript?",
        choices: [
            "'let' variables can be reassigned, while 'const' variables cannot be reassigned.",
            "'let' is used for declaring functions, while 'const' is used for declaring variables.",
            "'let' is used for numbers, while 'const' is used for strings.",
            "'let' and 'const' are interchangeable and can be used in the same way."
        ],
        answer: "'let' variables can be reassigned, while 'const' variables cannot be reassigned."
    },
    
    {
        question: "Q. What is the result of '5' == 5 in JavaScript?",
        choices: ["true", "false", "undefined", "Error"],
        answer: "true"
    },
    {
        question: "Q. What does the 'localStorage' object in JavaScript allow you to do?",
        choices: ["Store and retrieve data on the client's device", "Connect to a remote server", "Store data on the server", "Access the DOM"],
        answer: "Store and retrieve data on the client's device"
    },
    {
        question: "Q. What is a closure in JavaScript?",
        choices: [
            "A function that has access to the global scope",
            "A function that can be called only once",
            "A function that can be nested inside another function and has access to the outer function's variables",
            "A function that has no access to external variables"
        ],
        answer: "A function that can be nested inside another function and has access to the outer function's variables"
    },
    {
        question: "Q. What is the purpose of the 'map' method in JavaScript?",
        choices: [
            "To create a new array by applying a function to each element of an existing array",
            "To check if an element exists in an array",
            "To remove elements from an array",
            "To concatenate two arrays together"
        ],
        answer: "To create a new array by applying a function to each element of an existing array"
    },
];

// Making Variables
let currentQuestionIndex = 0;
let score = 0;
let quizOver = false;
let timeLeft = 15;
let timerID = null;

// Arrow Function to Show Questions
const showQuestions = () => {
    const questionDetails = quiz[currentQuestionIndex];
    questionBox.textContent = questionDetails.question;

    choicesBox.textContent = "";
    for (let i = 0; i < questionDetails.choices.length; i++) {
        const currentChoice = questionDetails.choices[i];
        const choiceDiv = document.createElement('div');
        choiceDiv.textContent = currentChoice;
        choiceDiv.classList.add('choice');
        choicesBox.appendChild(choiceDiv);

        choiceDiv.addEventListener('click', () => {
            if (choiceDiv.classList.contains('selected')) {
                choiceDiv.classList.remove('selected');
            }
            else {
                choiceDiv.classList.add('selected');
            }
        });
    }

    if(currentQuestionIndex < quiz.length){
        startTimer();
    }
}

// Function to check answers
const checkAnswer = () => {
    const selectedChoice = document.querySelector('.choice.selected');
    if (selectedChoice.textContent === quiz[currentQuestionIndex].answer) {
        // alert("Correct Answer!");
        displayAlert("Correct Answer!");
        score++;
    }
    else {
        // alert("Wrong answer");
        displayAlert(`Wrong Answer! ${quiz[currentQuestionIndex].answer} is the Correct Answer`);
    }
    timeLeft = 15;
    currentQuestionIndex++;
    if (currentQuestionIndex < quiz.length) {
        showQuestions();
    }
    else {
        stopTimer();
        showScore();
    }
}

// Function to show score
const showScore = () => {
    questionBox.textContent = "";
    choicesBox.textContent = "";
    scoreCard.textContent = `You Scored ${score} out of ${quiz.length}!`;
    displayAlert("You have completed this quiz!");
    nextBtn.textContent = "Play Again";
    quizOver = true;
    timer.style.display = "none";
}

// Function to Show Alert
const displayAlert = (msg) => {
    alert.style.display = "block";
    alert.textContent = msg;
    setTimeout(()=>{
        alert.style.display = "none";
    }, 2000);
}

// Function to Start Timer
const startTimer = () => {
    clearInterval(timerID); // Check for any exist timers
    timer.textContent = timeLeft;

    const countDown = ()=>{
        timeLeft--;
        timer.textContent = timeLeft;
        if(timeLeft === 0){
            const confirmUser = confirm("Time Up!!! Do you want to play the quiz again");
            if(confirmUser){
                timeLeft = 15;
                startQuiz();
            }
            else{
                startBtn.style.display = "block";
                container.style.display = "none";
                return;
            }
        }
    }
    timerID = setInterval(countDown, 1000);
}

// Function to Stop Timer
const stopTimer = () =>{
    clearInterval(timerID);
}

// Function to shuffle question
const shuffleQuestions = () =>{
    for(let i=quiz.length-1; i>0; i--){
        const j = Math.floor(Math.random() * (i+1));
        [quiz[i], quiz[j]] = [quiz[j], quiz[i]];
    }
    currentQuestionIndex = 0;
    showQuestions();
}

// Function to Start Quiz
const startQuiz = () =>{
    timeLeft = 15;
    timer.style.display = "flex";
    shuffleQuestions();
}

// Adding Event Listener to Start Button
startBtn.addEventListener('click', ()=>{
    startBtn.style.display = "none";
    container.style.display = "block";
    startQuiz();
});

nextBtn.addEventListener('click', () => {
    const selectedChoice = document.querySelector('.choice.selected');
    if (!selectedChoice && nextBtn.textContent === "Next") {
        // alert("Select your answer");
        displayAlert("Select your answer");
        return;
    }
    if (quizOver) {
        nextBtn.textContent = "Next";
        scoreCard.textContent = "";
        currentQuestionIndex = 0;
        quizOver = false;
        score = 0;
        startQuiz();
    }
    else {
        checkAnswer();
    }
});
