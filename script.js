// DOM Elements
const startScreen = document.getElementById(`start-screen`);
const quizScreen = document.getElementById(`quiz-screen`);
const resultScreen = document.getElementById(`result-screen`);
const startButton = document.getElementById(`start-btn`);
const questionText = document.getElementById(`question-text`);
const answersContainer = document.getElementById(`answers-container`);
const currentQuestion = document.getElementById(`current-question`);
const totalQuestionSpan = document.getElementById(`total-question`);
const scoreSpan = document.getElementById(`score`);
const finalScoreSpan = document.getElementById(`final-score`);
const maxScoreSpan = document.getElementById(`max-score`);
const resultMessage = document.getElementById(`result-message`);
const restartButton = document.getElementById(`restart-btn`);
const progressBar = document.getElementById(`progress`);

const testQuestions = [
  {
    question: "What is the difference between a <div> and a <span> element?",
    answers: [
      { text: "Div is for images, span is for text", correct: false },
      {
        text: "Div is a block-level element, span is an inline element",
        correct: true,
      },
      {
        text: "Div is used in the head, span is used in the body",
        correct: false,
      },
      { text: "There is no difference", correct: false },
    ],
  },
  {
    question:
      "In the CSS Box Model, which property creates space 'inside' an element, between the content and the border?",
    answers: [
      { text: "Margin", correct: false },
      { text: "Padding", correct: true },
      { text: "Outline", correct: false },
      { text: "Spacing", correct: false },
    ],
  },
  {
    question: "What is the difference between the '==' and '===' operators?",
    answers: [
      { text: "They are identical", correct: false },
      { text: "== is for strings, === is for numbers", correct: false },
      {
        text: "== compares value, === compares both value and data type",
        correct: true,
      },
      { text: "=== is only used in loops", correct: false },
    ],
  },
  {
    question:
      "Which attribute is used to provide an alternative text description for an image if it fails to load?",
    answers: [
      { text: "title", correct: false },
      { text: "src", correct: false },
      { text: "alt", correct: true },
      { text: "desc", correct: false },
    ],
  },
  {
    question:
      "Which method is used to attach a function to an element that will run when a specific event (like a click) occurs?",
    answers: [
      { text: "addEventListener()", correct: true },
      { text: "attachEvent()", correct: false },
      { text: "connect()", correct: false },
      { text: "listen()", correct: false },
    ],
  },
];
// Quiz State Variable
let currentQuestionIndex = 0;
let score = 0;
let answersDisabled = false;

totalQuestionSpan.textContent = testQuestions.length;
maxScoreSpan.textContent = testQuestions.length;

// EventListners
startButton.addEventListener("click", startQuiz);
restartButton.addEventListener("click", restartQuiz);

function startQuiz() {
  // restart variables
  currentQuestionIndex = 0;
  score = 0;
  scoreSpan.textContent = 0;
  startScreen.classList.remove(`active`);
  quizScreen.classList.add(`active`);

  showQuestion();
}

function showQuestion() {
  // reset state
  answersDisabled = false;

  const questionData = testQuestions[currentQuestionIndex];

  currentQuestion.textContent = currentQuestionIndex + 1;

  const progressPercent =
    ((currentQuestionIndex + 1) / testQuestions.length) * 100;
  progressBar.style.width = progressPercent + `%`;

  questionText.textContent = questionData.question;

  answersContainer.innerHTML = "";
  questionData.answers.forEach((answer) => {
    const button = document.createElement("button");
    button.textContent = answer.text;
    button.classList.add("answer-btn");
    button.dataset.correct = answer.correct;

    button.addEventListener("click", selectAnswer);
    answersContainer.append(button);
  });
}

function selectAnswer(event) {
  if (answersDisabled) return;

  answersDisabled = true;

  const selectedButton = event.target;
  const isCorrect = selectedButton.dataset.correct === `true`;

  Array.from(answersContainer.children).forEach((button) => {
    if (button.dataset.correct === `true`) {
      button.classList.add(`correct`);
    } else if (button === selectedButton) {
      button.classList.add(`incorrect`);
    }
  });

  if (isCorrect) {
    score++;
    scoreSpan.textContent = score;
  }

  setTimeout(() => {
    currentQuestionIndex++;
    if (currentQuestionIndex < testQuestions.length) {
      showQuestion();
    } else {
      showResult();
    }
  }, 1000);

  function showResult() {
    quizScreen.classList.remove(`active`);
    resultScreen.classList.add(`active`);

    finalScoreSpan.textContent = score;

    const percentageScore = (score / testQuestions.length) * 100;

    if (percentageScore === 100) {
      resultMessage.textContent = `You are a Genius,you got a perfect score`;
    } else if (percentageScore >= 80) {
      resultMessage.textContent = `Great job. You know your stuff`;
    } else if (percentageScore >= 60) {
      resultMessage.textContent = `Great effort! Keep learning Champ.`;
    } else if (percentageScore >= 40) {
      resultMessage.textContent = `Try again, to improve score.`;
    } else {
      resultMessage.textContent = `Keep studying, you will get better.`;
    }
  }
}
function restartQuiz() {
  resultScreen.classList.remove(`active`);
  startScreen.classList.add(`active`);
}
