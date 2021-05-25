var timerElement = document.querySelector(".timer-count");
var startButton = document.querySelector(".start-button");
var isSubmit = false;
var timer;
var timerCount;


   // variable to store the HTML output
   var output = [];


 function startQuiz(){


  // Functions
  function startQuiz(){
    isSubmit = false;
    timerCount = 20;
    startButton.disabled = true;
    startTimer()
  }

    function endQuiz() {
      window.alert = "Out of time";
      startButton.disabled = false;
      showResults()
    }


    // The setTimer function starts and stops the timer and triggers winGame() and loseGame()
function startTimer() {
  // Sets timer
  timer = setInterval(function() {
    timerCount--;
    timerElement.textContent = timerCount;
    if (timerCount >= 0) {
      // Tests if win condition is met
      if (isSubmit&& timerCount > 0) {
        // Clears interval and stops timer
        clearInterval(timer);
      }
    }
    // Tests if time has run out
    if (timerCount === 0) {
      // Clears interval
      clearInterval(timer);
      endQuiz();
    }
  }, 1000);

}

startButton.addEventListener("click", startQuiz);

// for each question...
myQuestions.forEach(
    (currentQuestion, questionNumber) => {

      // stores the list of possible answers
      var answers = [];

      // and for each available answer add an HTML radio button

      for(letter in currentQuestion.answers){

        answers.push(
          `<label>
            <input type="radio" name="question${questionNumber}" value="${letter}">
            ${letter} :
            ${currentQuestion.answers[letter]}
          </label>`
        );
      }

      // this adds the question and its answers to the output
      output.push(
        `<div class="slide">
          <div class="question"> ${currentQuestion.question} </div>
          <div class="answers"> ${answers.join("")} </div>
        </div>`
      );
    }
  );

  // combines output list into one string of HTML and it also adds it to the page
  quizContainer.innerHTML = output.join('');
  }


