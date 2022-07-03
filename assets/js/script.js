var question = document.getElementById("question");
var choices = Array.from(document.getElementsByClassName("choice-text"));
var questionCounterText = document.getElementById('questionCounter');
var scoreText = document.getElementById('score');

var currentQuestion = {};
var acceptingAnswers = false;
var score = 0;
var questionCounter = 0;
var availableQuestions = [];

var questions = [
    {
        question: "What is 10/5?",
        choice1: "two",
        choice2: "three",
        choice3: "Four",
        choice4: "Five",
        answer: 1
    },
    {
        question: "What is 10/10?",
        choice1: "two",
        choice2: "seven",
        choice3: "eight",
        choice4: "one",
        answer: 4
    },
    {
        question: "What is 15/5?",
        choice1: "six",
        choice2: "three",
        choice3: "four",
        choice4: "two",
        answer: 2
    },
    {
        question: "What is 20/5?",
        choice1: "nine",
        choice2: "three",
        choice3: "four",
        choice4: "ten",
        answer: 3
    },

]

var bonus_score = 10;
var NumberQuestion = 4;

startGame = () => {
    questionCounter = 0;
    score = 0;
    availableQuestions = [...questions];
    
    getNewQuestion();
};
getNewQuestion = () => {
    if(availableQuestions.length === 0 || questionCounter >= NumberQuestion) {
        //save score to local storage
        localStorage.setItem("mostRecentScore", score);

        // got to the end of page
        return window.location.assign ("/end.html");
    }
    questionCounter++;
    questionCounterText.innerText = questionCounter + "/" + NumberQuestion;
    var questionIndex = Math.floor(Math.random() * availableQuestions.length );
    currentQuestion = availableQuestions[questionIndex];
    question.innerText = currentQuestion.question;

    choices.forEach(choice => {
        var number = choice.dataset['number'];
        choice.innerText = currentQuestion['choice'+ number];

    });
    availableQuestions.splice(questionIndex, 1);
    acceptingAnswers = true;
}

choices.forEach(choice => {
    choice.addEventListener("click", e => {
      if (!acceptingAnswers) return;
      acceptingAnswers = false;  
    var selectedChoice = e.target
    var selectedAnswer = selectedChoice.dataset['number'];

    var classToApply =
    selectedAnswer == currentQuestion.answer ? "correct" : "incorrect";
        
    // if it is a correct answer add 10 to score
    if(classToApply === 'correct'){
        score += bonus_score;
        
    }
    // it it's not correct minus 10 
    else {
        score -= bonus_score;

    }
    scoreText.innerText = score;
    selectedChoice.parentElement.classList.add(classToApply);

    setTimeout ( () => {
    selectedChoice.parentElement.classList.remove(classToApply);
    getNewQuestion();
    }, 1000);
    })
})

startGame();


