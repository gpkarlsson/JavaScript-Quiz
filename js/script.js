// 1. Initilize quiz from Start button --done
// 2. Display first question --done
//      2.a. Display answers --done
// 3. Start 30second timer --done
// 4. Display correct or incorrect when answer chosen --done
//    4.a. If incorrect answer chosen, subtract 5 seconds from clock --done
// 5. Game over when questions answered or timer reaches zero
// 6. Save initials and score at the end (high score page)

const buttonStart = document.getElementById('buttonStart');
const buttonNext = document.getElementById('nextButton');
const questionsContainerEl = document.getElementById('questionsDiv');

const questionEl = document.getElementById('question');
const answerButtonEl = document.getElementById('answerButton');

var timer = 30;
var countdown = document.getElementById('timer');

let randomQuestions, currentQuestionIndex;
var correctAnswers = 0

buttonStart.addEventListener('click', startQuiz);
nextButton.addEventListener('click', () => {
    currentQuestionIndex++
    nextQuestion()
});

//Start Quiz
function startQuiz() {
console.log('started');
buttonStart.classList.add('hide');
highScore.classList.add('hide');
randomQuestions = questions.sort(() => Math.random() - .5)
currentQuestionIndex = 0
questionsContainerEl.classList.remove('hide');
nextQuestion()
}

// timer not counting down
function myTimer() {
    if (timer > 0) {
        timer--;
       } else {
           timer = 0;
           //function call to new timer 
           // 
        clearInterval(timer);
        // run a function that happens when quiz is over
       }
       console.log(timer);
}
setInterval(myTimer, 1000);

function nextQuestion() {
    stateReset()
    displayQuestion(randomQuestions[currentQuestionIndex])
}

// Displays quiz question
function displayQuestion(question) {
    questionEl.innerText = question.question
    question.answers.forEach(answer => {
        const button = document.createElement('button');
        button.innerText = answer.text;
        button.classList.add('btn');
        if (answer.correct) {
            button.dataset.correct = answer.correct
        };
        button.addEventListener('click', choiceAnswer);
        answerButtonEl.appendChild(button);
    });
};

// Show whether chosen answer is correct and increase score with each correct answer
function choiceAnswer(e) {
    const buttonSelected = e.target
    const correct = buttonSelected.dataset.correct
    
    if (correct) {
        correctAnswers++;
        console.log(correctAnswers);   
    } else {
        timer -= 5;
    };

    // happens every time

    setStatusClass(document.body, correct)
    Array.from(answerButtonEl.children).forEach(button => {
        setStatusClass(button, button.dataset.correct)
    })
    if (randomQuestions.length > currentQuestionIndex + 1) {
    buttonNext.classList.remove('hide')
    } else {
        buttonStart.innerText = 'Restart'
        buttonStart.classList.remove('hide');
    }
}

// Sets correct or wrong class depending on whether answer was correct or not
function setStatusClass(element, correct) {
    clearStatusClass(element)
    if (correct) {
        element.classList.add('correct')
    } else {
        element.classList.add('wrong')
    }
}

// Resets correct or wrong class for the next question
function clearStatusClass(element) {
    element.classList.remove('correct')
    element.classList.remove('wrong')
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
            {text: 'camelCase', correct: true},
            {text: 'all lower case', correct: false},
            {text: 'ALL CAPS', correct: false},
            {text: 'Nospaces', correct: false}
        ]
    },

    {
        question: 'What HTML element do we put the JavaScript link into?',
        answers: [
            {text: '<script>', correct: true},
            {text: '<link>', correct: false},
            {text: '<head>', correct: false},
            {text: '<p>', correct: false},
        ]
    },

    {
        question: 'What do you use to display messages in the console?',
        answers: [
            {text: 'print.log()', correct: false},
            {text: 'write()', correct: false},
            {text: 'console.log()', correct: true},
            {text: 'Phish', correct: false},
        ]
    },

    {
        question: 'Who invented JavaScript?',
        answers: [
            {text: 'Bob Weir', correct: false},
            {text: 'Brendan Eich', correct: true},
            {text: 'Steve Jobs', correct: false},
            {text: 'Bill Gates', correct: false},
        ]
    }
];