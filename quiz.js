var questionDisplayNumber = document.querySelector('.question-active .question-number');
var questionCount = document.getElementsByClassName("question-number").length;
var questionDisplayTotal = document.querySelector(".question-active .question-total");
var questionBodies = document.getElementsByClassName("question-body");
var answersArray = {
    question_group_1: 'c',
    question_group_2: 'd',
    question_group_3: 'd'
}
//console.log(questionDisplayNumber);
//console.log(questionCount);
//console.log(questionDisplayTotal);
//console.log(questionBodies);

questionDisplayTotal.textContent = questionCount;

var navButtons = document.getElementsByClassName("nav-button");
for(var navButton of navButtons) {
  navButton.addEventListener('click', function(event) {
    questionDisplayNumber = document.querySelector('.question-active .question-number').textContent;
    //console.log(event.target.textContent.toLowerCase().replace(" ","").replace(">","").replace("<",""));
    var direction = event.target.textContent.toLowerCase().replace(" ","").replace(">","").replace("<","");
    //console.log(direction);    

    if(direction === "next") {
      var nextQuestion = String(Number(questionDisplayNumber) + 1);
      //console.log(nextQuestion);

      for(var questionBody of questionBodies) {
        //console.log(questionBody.children["1"].firstElementChild.textContent);
        if(questionBody.children["1"].firstElementChild.textContent === questionDisplayNumber) {
          questionBody.classList.remove('question-active');
        }
        if(questionBody.children["1"].firstElementChild.textContent === nextQuestion) {
          questionBody.classList.add('question-active');
        }
      }
      if(nextQuestion === questionDisplayTotal.textContent) {
        document.querySelector(".nav-next").textContent = "Submit";
      }

    } 
    else if (direction === "back") {
      var nextQuestion = String(Number(questionDisplayNumber) - 1);
      //console.log(nextQuestion);
      //console.log(typeof(nextQuestion));
      if(nextQuestion !== "0"){
        for(var questionBody of questionBodies) {
          console.log(questionBody.children["1"].firstElementChild.textContent);
          if(questionBody.children["1"].firstElementChild.textContent === questionDisplayNumber) {
            questionBody.classList.remove('question-active');
          }
          if(questionBody.children["1"].firstElementChild.textContent === nextQuestion) {
            questionBody.classList.add('question-active');
          }
        }
        if(nextQuestion !== questionDisplayTotal.textContent) {
          document.querySelector(".nav-next").textContent = "Next >";
        } 
      }
    
    } 
    else if (direction === "submit") {
      var radioButtons = document.getElementsByClassName("question-input")
      //console.log(radioButtons);
      var counter = 0;
      var correctAnswers = 0;
      var resultsArray = {};
      var previousQuestion = "q01";
      var currentQuestion = "q01";
      var checkedFlag = false;
      for(radioButton of radioButtons) {
        if(radioButton.checked === true) {
          counter++;
          //console.log(counter, radioButton.value);
          if(radioButton.value === "choice-1c") {
            correctAnswers++;
          }
          if(radioButton.value === "choice-2d") {
            correctAnswers++;
          }
          if(radioButton.value === "choice-3d") {
            correctAnswers++;
          }
        }

        //console.log(radioButton.name, radioButton.value, radioButton.checked);
        currentQuestion = radioButton.name;
        if(previousQuestion !== currentQuestion) {
            console.log("Question Change Point");
            if(checkedFlag === false) {
                resultsArray[previousQuestion] = "";
            }
            checkedFlag = false;
        }
        previousQuestion = radioButton.name;

        if(radioButton.checked === true) {
            resultsArray[radioButton.name] = radioButton.value;
            checkedFlag = true;
        }

      }
      console.log("Question Change Point");
      if(checkedFlag === false) {
          resultsArray[previousQuestion] = "";
      }
      checkedFlag = false;
      
      console.log(resultsArray);
      //console.log(`Correct Answers: ${correctAnswers} out of ${questionCount}`);
      document.querySelector('.nav-indicator').textContent = `Your Score: ${correctAnswers} out of ${questionCount}`;
    }
  })
}
    