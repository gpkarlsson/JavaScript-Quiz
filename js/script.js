const buttonStart = document.getElementById('buttonStart');
const buttonNext = document.getElementById('nextButton');
const questionsContainerEl = document.getElementById('questionsDiv');
var highscoreDiv = document.getElementById('highscoreDiv')

const questionEl = document.getElementById('question');
const answerButtonEl = document.getElementById('answerButton');
var gameOver = document.getElementById('game-over');
var scoreDiv = document.getElementById('score');
var buttonSubmit = document.getElementById('submit');
var submittedScores = document.getElementById('submittedScores');

var timer = 30;

var userScore = document.getElementById('currentScore');

let randomQuestions, currentQuestionIndex;
var correctAnswers = 0;

buttonStart.addEventListener('click', startQuiz);

buttonNext.addEventListener('click', () => {
    currentQuestionIndex++;
    nextQuestion();
});

//Run submit high score function on submit button click
buttonSubmit.addEventListener('click', submitHighScore);

// Showing submitted high score information
function submitHighScore() {
    var initials = document.querySelector('#name').value;
    var highScore = correctAnswers;
    var scoreString = initials + " - " + highScore;
    localStorage.setItem('score', scoreString);
    showHighScores();
}


function showHighScores() {
    var scores = localStorage.getItem('score');
    submittedScores.textContent = scores;
    submittedScores.classList.remove('hide');
}

//Start Quiz
function startQuiz() {
    buttonStart.classList.add('hide');
    // buttonHighScores.classList.add('hide');
    randomQuestions = questions.sort(() => Math.random() - .5)
    currentQuestionIndex = 0;
    questionsContainerEl.classList.remove('hide');
    nextQuestion();
}

//30 second timer for quiz

function myTimer() {
    if (timer > 0) {
        timer--;
    } else {
        timer = 0;
        clearInterval(timer);
        return 0;
    }
    var countdown = document.getElementById('timer');
    countdown.textContent = timer;
}
setInterval(myTimer, 1000);


function nextQuestion() {
    stateReset();
    displayQuestion(randomQuestions[currentQuestionIndex]);
}

// Displays quiz question
function displayQuestion(question) {
    questionEl.innerText = question.question;
    question.answers.forEach(answer => {
        const button = document.createElement('button');
        button.innerText = answer.text;
        button.classList.add('btn');
        if (answer.correct) {
            button.dataset.correct = answer.correct;
        };
        button.addEventListener('click', choiceAnswer);
        answerButtonEl.appendChild(button);
    });
};

// Show whether chosen answer is correct and increase score with each correct answer
function choiceAnswer(e) {
    const buttonSelected = e.target;
    const correct = buttonSelected.dataset.correct;

    // Correct answer increases score
    if (correct) {
        correctAnswers++;
    } else {
        timer -= 5;
    };

    Array.from(answerButtonEl.children).forEach(button => {
        setStatusClass(button, button.dataset.correct);
    })
    if (randomQuestions.length > currentQuestionIndex + 1) {
        buttonNext.classList.remove('hide');
    } else {
        // End of Quiz
        buttonStart.innerText = 'Restart';
        buttonStart.classList.remove('hide');
        scoreDiv.classList.remove('hide');
        questionsContainerEl.classList.add('hide');
        userScore.textContent = correctAnswers;
    }
}

// Sets correct or wrong class depending on whether answer was correct or not
function setStatusClass(element, correct) {
    clearStatusClass(element);
    if (correct) {
        element.classList.add('correct')
    } else {
        element.classList.add('wrong')
    }
}

// Resets correct or wrong class for the next question
function clearStatusClass(element) {
    element.classList.remove('correct');
    element.classList.remove('wrong');
}

// Resets quiz UI between each question 
function stateReset() {
    clearStatusClass(document.body)
    buttonNext.classList.add('hide')
    while (answerButtonEl.firstChild) {
        answerButtonEl.removeChild(answerButtonEl.firstChild)
    }
}

// Questions for quiz
const questions = [
    {
        question: 'What is the proper way to name things in JavaScript?',
        answers: [
            { text: 'camelCase', correct: true },
            { text: 'all lower case', correct: false },
            { text: 'ALL CAPS', correct: false },
            { text: 'Nospaces', correct: false }
        ]
    },

    {
        question: 'What HTML element do we put the JavaScript link into?',
        answers: [
            { text: '<script>', correct: true },
            { text: '<link>', correct: false },
            { text: '<head>', correct: false },
            { text: '<p>', correct: false },
        ]
    },

    {
        question: 'What do you use to display messages in the console?',
        answers: [
            { text: 'print.log()', correct: false },
            { text: 'write()', correct: false },
            { text: 'console.log()', correct: true },
            { text: 'Phish', correct: false },
        ]
    },

    {
        question: 'Who invented JavaScript?',
        answers: [
            { text: 'Bob Weir', correct: false },
            { text: 'Brendan Eich', correct: true },
            { text: 'Steve Jobs', correct: false },
            { text: 'Bill Gates', correct: false },
        ]
    }
];