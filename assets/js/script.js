function Quiz(questions) {
    this.score = 0;
    this.questions = questions;
    this.questionIndex = 0;
}

Quiz.prototype.getQuestionIndex = function() {
    return this.questions[this.questionIndex];
}

Quiz.prototype.guess = function(answer) {
    if(this.getQuestionIndex().isCorrectAnswer(answer)) {
        this.score++;
    }

    this.questionIndex++;
}

Quiz.prototype.isEnded = function() {
    return this.questionIndex === this.questions.length;
}

function Question(text, choices, answer) {
    this.text = text;
    this.choices = choices;
    this.answer = answer;
}

Question.prototype.isCorrectAnswer = function(choice) {
    return this.answer === choice;
}

// Display the questions
function displayQuestion() {
    if (quiz.isEnded()) {
        showScores();
    }
    else {
        // Show question
        let questionElement = document.getElementById("question");
        questionElement.innerHTML = quiz.getQuestionIndex().text;

        // Show options
        let choices = quiz.getQuestionIndex().choices;
        for(let i = 0; i < choices.length; i++) {
            let choiceElement = document.getElementById("choice" + i);
            choiceElement.innerHTML = choices[i];
            guess("btn" + i, choices[i]);
        }

        showProgress();
    }
};

function guess(id, guess) {
    let button = document.getElementById(id);
    button.onclick = function() {
        quiz.guess(guess);
        displayQuestion();
    }
};

function showProgress() {
    let currentQuestionNumber = quiz.questionIndex + 1;
    let ProgressElement = document.getElementById("progress");
    ProgressElement.innerHTML =
    `Question ${currentQuestionNumber} of ${quiz.questions.length}`;
};

function showScores() {
    let quizEndHTML =
    `
    <h1>Quiz Completed</h1>
    <h2 id='score'> Your Score: ${quiz.score} of ${quiz.questions.length}</h2>
    <div class="quiz-repeat">
        <a href="index.html">Take Trivia Quiz Again</a>
    </div>
    `;
    let quizElement = document.getElementById("quiz");
    quizElement.innerHTML = quizEndHTML;
};

// Create questions and answers
let questions = [
    new Question(
        "Which country consumes the most chocolate per capita?",
        ["Ireland", "Switzerland", "Austria", "Sweden"], "Switzerland"
    ),
    new Question(
        "Which of Shakespeare’s plays is the longest?",
        ["Macbeth", "King Lear", "Hamlet", "Twelfth Night"], "Hamlet"
    ),
    new Question(
        "What color eyes do most humans have?",
        ["Brown", "Blue", "Green", "Gray"], "Brown"
    ),
    new Question(
        "Which planet is the hottest in the solar system?",
        ["Mercury", "Venus", "Mars", "Jupiter"], "Venus"
    ),
    new Question(
        "What country has the world’s most ancient forest?",
        ["Australia", "Brazil", "Chile", "Japan"], "Australia"
    ),
    new Question(
        "What is the most common letter in the English alphabet?",
        ["A", "E", "O", "S"], "E"
    ),
    new Question(
        "What is the driest continent?",
        ["Africa", "South America", "Asia", "Antarctica"], "Antarctica"
    ),
    new Question(
        "What is the most abundant element in the universe?",
        ["Helium", "Oxygen", "Hydrogen", "Carbon"], "Hydrogen"
    ),
    new Question(
        "What did the first vending machine dispense?",
        ["Holy Water", "Coca Cola", "Chocolate Bars", "Chips"], "Holy Water"
    ),
    new Question(
        "How many eyes does a bee have?",
        ["Two", "Three", "Four", "Five"], "Five"
    )
];

// Create quiz
let quiz = new Quiz(questions);

// Display quiz
displayQuestion();

//Add a Timer
let time = 10;
let quizTimeInMinutes = time * 60 * 60;
let quizTime = quizTimeInMinutes / 60;

let counting = document.getElementById("count-down");

function startCountdown() {
    let quizTimer = setInterval(function() {
        if (quizTime <= 0) {
            clearInterval(quizTimer);
            showScores();
        } else {
            quizTime--;
            let sec = Math.floor(quizTime % 60);
            let min = Math.floor(quizTime / 60) % 60;
            counting.innerHTML = `TIME: ${min} : ${sec}`;
        }
    }, 1000);
}

startCountdown();