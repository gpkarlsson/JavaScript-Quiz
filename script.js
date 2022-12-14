const buttonStart = document.getElementById('buttonStart');
const questionsContainerEl = document.getElementById('questionsContainer');

const questionEl = document.getElementById('question')
const answerButtonEl = document.getElementById('answer-buttons')

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
    })
} 

function answer() {

}

const questions = [
    {
        question: 'What song did the Grateful Dead play the most amount of times live?',
        answers: [
            {text: 'Drums', correct: true},
            {text: 'Sugar Magnolia', correct: false},

        ]
    }
]