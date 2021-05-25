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

  function showResults(){

    // get answer containers from quiz
    const answerContainers = quizContainer.querySelectorAll('.answers');

    // keep track of answers
    let numCorrect = 0;

    // find answer for each question
    myQuestions.forEach( (currentQuestion, questionNumber) => {

      
      var answerContainer = answerContainers[questionNumber];
      var selector = `input[name=question${questionNumber}]:checked`;
      var userAnswer = (answerContainer.querySelector(selector) || {}).value;

      // if answer is right then add 1 , and turn color green
      // if answer is wrong or blank the color turns red 
      if(userAnswer === currentQuestion.correctAnswer){
        numCorrect++;
        answerContainers[questionNumber].style.color = 'lightgreen';
      }
      else{ 
        answerContainers[questionNumber].style.color = 'red';
      }
    });

    // this is a way to show the number of correct answers 
    resultsContainer.innerHTML = `Score ${numCorrect}`;
  }
    
   
// create a if else function to make the change of slides behave correctly
  function showSlide(n) {
    slides[currentSlide].classList.remove('active-slide');
    slides[n].classList.add('active-slide');
    currentSlide = n;
    if(currentSlide === 0){
      previousButton.style.display = 'none';
    }
    else{
      previousButton.style.display = 'inline-block';
    }
    if(currentSlide === slides.length-1){
      nextButton.style.display = 'none';
      submitButton.style.display = 'inline-block';
    }
    else{
      nextButton.style.display = 'inline-block';
      submitButton.style.display = 'none';
    }
  }
// this function allows to click the next button and go to the next slide
  function showNextSlide() {
    showSlide(currentSlide + 1);
  }
//this function allows to go press the previous button and go to the previous question.
  function showPreviousSlide() {
    showSlide(currentSlide - 1);
  }
   

  // Variables for the functions above
  var quizContainer = document.getElementById('quiz');
  var resultsContainer = document.getElementById('results');
  var submitButton = document.getElementById('submit');
  var myQuestions = [
    {
      question: "What is HTML ?",
    answers: {
      a: 'happy tommy maker language',
      b: 'Hyper Text Markup Language',
      c: 'a book',
      d: 'a movie'
    },
    correctAnswer: 'b'
  },
  {
    question: "Do all HTML tags have an end tag?",
    answers: {
      a: 'Some',
      b: 'yes',
      c: 'no',
      d: 'IDK'
    },
    correctAnswer: 'c'
  },
  {
      question: "Which HTML tag is used to display the data in the tabular form?",
      answers: {
        a: 'flex column',
        b: 'line breaks',
        c: 'any tag',
        d: 'table tags'
      },
      correctAnswer: 'd'
    },
    {
      question: "What is semantic HTML?",
      answers: {
        a: 'same as HTMl',
        b: 'coding style',
        c: 'a funny version of HTML',
        d: 'Flowers'
      },
      correctAnswer: 'b'
    },
    {
      question: "How to insert a copyright symbol on a browser page?",
      answers: {
        a: '&copy; or &#169;',
        b: 'Ctrl X',
        c: 'ctrl t',
        d: '@copy'
      },
      correctAnswer: 'a'
    }
  ];

  // this starts the quiz 
 startQuiz();


  // variables for the slide changes 
  var previousButton = document.getElementById("previous");
  var nextButton = document.getElementById("next");
  var slides = document.querySelectorAll(".slide");
  let currentSlide = 0;

  // Show the first slide
  showSlide(currentSlide);

  // Event listeners for actions when the button is clicked 
  submitButton.addEventListener('click', showResults);
  previousButton.addEventListener("click", showPreviousSlide);
  nextButton.addEventListener("click", showNextSlide);

