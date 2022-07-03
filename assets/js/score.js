var username = document.getElementById('username');
var saveScore = document.getElementById('saveScore');
var finalScore = document.getElementById('finalScore');
var mostRecentScore = localStorage.getItem('mostRecentScore');
var highScore = JSON.parse(localStorage.getItem('highScore'));

finalScore.innerText = mostRecentScore;
username.addEventListener('keyup', () => {
    console.log(username.value);
    saveScore.disabled = !username.value;
})

saveHighScore = e => {
    console.log("clicked the save button");
    e.preventDefault();
}