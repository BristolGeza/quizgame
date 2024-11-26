const question = document.querySelector('#question');
const choices = Array.from(document.querySelectorAll('.choice-text'));
const progressText = document.querySelector('#progressText');
const scoreText = document.querySelector('#score');
const progressBarFull = document.querySelector('#progressBarFull');

let currentQuestion = {};
let acceptingAnswers = true;
let score = 0;
let questionCounter = 0;
let availableQuestions = [];

/**
 * Array of question objects for the quiz game.
 * Each object contains a question, four choices, and the index of the correct answer.
 * @type {Array<{question: string, choice1: string, choice2: string, choice3: string, choice4: string, answer: number}>}
 */
let questions = [
    {
        question: 'What is Newtons First Law?',
        choice1: 'For every action, there is an equal and opposite reaction.',
        choice2: 'An object in motion stays in motion, and an object at rest stays at rest unless acted upon by an unbalanced force.',
        choice3: 'Force equals mass times acceleration.',
        choice4: 'The force of gravity acts between all objects in the universe.',
        answer: 2,
    },
    {
        question: "What is the main work of Martin Heidegger?",
        choice1: "Being and Time",
        choice2: "Critique of Pure Reason",
        choice3: "Phenomenology of Spirit",
        choice4: "Thus Spoke Zarathustra",
        answer: 1,
    },
    {
        question: "Who is Geza Csosz?",
        choice1: "A German composer.",
        choice2: "An Italian painter.",
        choice3: "A British-based Hungarian photographer and fine artist.",
        choice4: "A French novelist.",
        answer: 3,
    },
    {
        question: "What are the basic stitches in knitting?",
        choice1: "Knit, Purl, Cast On, and Bind Off",
        choice2: "Loop, Weave, Tie, and Braid",
        choice3: "Satin Stitch, French Knot, Backstitch, and Blanket Stitch",
        choice4: "Crochet, Tapestry, Loom, and Spin",
        answer: 1,
    }
];

/**
 * Points awarded for each correct answer.
 * @constant {number}
 */
const SCORE_POINTS = 100;

/**
 * Maximum number of questions in the quiz.
 * @constant {number}
 */
const MAX_QUESTIONS = 4;

/**
 * Starts the game by initializing the question counter, score, and available questions.
 * Calls getNewQuestion to load the first question.
 */
const startGame = () => {
    questionCounter = 0;
    score = 0;
    availableQuestions = [...questions];
    getNewQuestion();
};

/**
 * Loads a new question if there are available questions and the question counter is within the limit.
 * If no questions are available or the limit is reached, saves the score to local storage.
 */
const getNewQuestion = () => {
    if (availableQuestions.length === 0 || questionCounter >= MAX_QUESTIONS) {
        localStorage.setItem('mostRecentScore', score);
        return window.location.assign('/end.html');
    }

    questionCounter++;
    progressText.innerText = `Question ${questionCounter} of ${MAX_QUESTIONS}`;
    progressBarFull.style.width = `${(questionCounter / MAX_QUESTIONS) * 100}%`;

    const questionIndex = Math.floor(Math.random() * availableQuestions.length);
    currentQuestion = availableQuestions[questionIndex];
    question.innerText = currentQuestion.question;

    choices.forEach(choice => {
        const number = choice.dataset['number'];
        choice.innerText = currentQuestion['choice' + number];
    });

    availableQuestions.splice(questionIndex, 1);
    acceptingAnswers = true;
};

choices.forEach(choice => {
    choice.addEventListener('click', e => {
        if (!acceptingAnswers) return;

        acceptingAnswers = false;
        const selectedChoice = e.target;
        const selectedAnswer = selectedChoice.dataset['number'];

        const classToApply = selectedAnswer == currentQuestion.answer ? 'correct' : 'incorrect';

        if (classToApply === 'correct') {
            incrementScore(SCORE_POINTS);
        }

        selectedChoice.parentElement.classList.add(classToApply);

        setTimeout(() => {
            selectedChoice.parentElement.classList.remove(classToApply);
            getNewQuestion();
        }, 1000);
    });
});

/**
 * Increments the score by the given number of points.
 * @param {number} num - The number of points to add to the score.
 */
const incrementScore = num => {
    score += num;
    scoreText.innerText = score;
};

startGame();