const buttonStart = document.getElementById('buttonStart');
const questionsContainerEl = document.getElementById('questionsContainer');


buttonStart.addEventListener('click', startQuiz)

function startQuiz() {
console.log('started');
buttonStart.classList.add('hide');
questionsContainerEl.classList.remove('hide');
}

function nextQuestion() {

}

function answer() {

}