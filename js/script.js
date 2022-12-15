// 1. Initilize quiz from Start button
// 2. Display first question
//      2.a. Display answers
// 3. Start 45second timer
// 4. Display correct or incorrect when answer chosen
//    4.a. If incorrect answer chosen, subtract 5 seconds from clock
// 5. Game over when questions answered or timer reaches zero
// 6. Save initials and score at the end

const buttonStart = document.getElementById('buttonStart');
const buttonNext = document.getElementById('nextButton');
const questionsContainerEl = document.getElementById('questionsDiv');

const questionEl = document.getElementById('question')
const answerButtonEl = document.getElementById('answerButton')

let randomQuestions, currentQuestionIndex

buttonStart.addEventListener('click', startQuiz)

function startQuiz() {
console.log('started');
buttonStart.classList.add('hide');
randomQuestions = questions.sort(() => Math.random() - .5)
currentQuestionIndex = 0
questionsContainerEl.classList.remove('hide');
nextQuestion()
}

function nextQuestion() {
    stateReset()
    displayQuestion(randomQuestions[currentQuestionIndex])
}

function displayQuestion(question) {
    questionEl.innerText = question.question
    question.answers.forEach(answer => {
        const button = document.createElement('button')
        button.innerText = answer.text
        button.classList.add('btn')
        if (answer.correct) {
            button.dataset.correct = answer.correct
        }
        button.addEventListener('click', choiceAnswer)
        answerButtonEl.appendChild(button)
    })
} 

function stateReset() {
   buttonNext.classList.add('hide')
   while (answerButtonEl.firstChild) {
    answerButtonEl.removeChild(answerButtonEl.firstChild)
   }
}


function answer(e) {

}

const questions = [
    {
        question: 'What song did the Grateful Dead play the most amount of times live?',
        answers: [
            {text: 'Drums', correct: true},
            {text: 'Sugar Magnolia', correct: false},
            {text: 'Space', correct: false},
            {text: 'Friend of the Devil', correct: false}
        ]
    }
]