
var questionCount = document.getElementsByClassName("question-number").length;
var questionDisplayTotal = document.querySelector(".question-active .question-total");
var questionBodies = document.getElementsByClassName("question-body");
var navButtons = document.getElementsByClassName("nav-button");
var radioButtons = document.getElementsByClassName("question-input");

questionDisplayTotal.textContent = questionCount;

for(var navButton of navButtons) {
    navButton.addEventListener('click', function(event) {
    var direction = event.target.textContent.toLowerCase().replace(" ","").replace(">","").replace("<","");

        if(direction === "next") {
            var questionDisplayNumber = document.querySelector('.question-active .question-number');
            var nextQuestion = (Number(questionDisplayNumber.textContent) + 1);
            var totalQuestions = (Number(questionDisplayTotal.textContent));

            if(Number(questionDisplayNumber.textContent) < 10) {
                questionNum = "q0" + questionDisplayNumber.textContent;
            } else {
                questionNum = "q" + questionDisplayNumber.textContent;
            }

            var questionChecked = false;
            for(var radioButton of radioButtons) {
                if(radioButton.name === questionNum) {
                    if(radioButton.checked === true) {
                        questionChecked = true;
                    }
                }
            }

            if(questionChecked === true) {
                if(nextQuestion <= totalQuestions) {
                    for(var questionBody of questionBodies) {
                        if(questionBody.children["1"].firstElementChild.textContent === questionDisplayNumber.textContent) {
                        questionBody.classList.remove('question-active');
                        }
                        if(questionBody.children["1"].firstElementChild.textContent === String(nextQuestion)) {
                        questionBody.classList.add('question-active');
                        }
                    }
                }
                if(nextQuestion === totalQuestions) {
                    document.querySelector(".nav-next").textContent = "*****";
                    document.querySelector(".nav-back").textContent = "< Back";
                    //document.querySelector(".nav-submit").textContent = "*****";

                    document.querySelector('.nav-indicator').textContent = "Select One Answer then Press Submit to Reveal Score";
    
                } else {
                    document.querySelector(".nav-next").textContent = "Next >";
                    document.querySelector(".nav-back").textContent = "< Back";
                    //document.querySelector(".nav-submit").textContent = "*****";
                }
            } else {
                document.querySelector('.nav-indicator').textContent = `Please Select One Answer to Proceed to Next Question`;
            }
        } 
        else if (direction === "back") {
            var questionDisplayNumber = document.querySelector('.question-active .question-number');
            var nextQuestion = (Number(questionDisplayNumber.textContent) - 1);

            if(Number(questionDisplayNumber.textContent) < 10) {
                questionNum = "q0" + questionDisplayNumber.textContent;
            } else {
                questionNum = "q" + questionDisplayNumber.textContent;
            }

            if(nextQuestion !== 0){
                for(var questionBody of questionBodies) {
                if(questionBody.children["1"].firstElementChild.textContent === questionDisplayNumber.textContent) {
                    questionBody.classList.remove('question-active');
                }
                if(questionBody.children["1"].firstElementChild.textContent === String(nextQuestion)) {
                    questionBody.classList.add('question-active');
                }
                }
                if(nextQuestion !== questionDisplayTotal.textContent) {
                document.querySelector(".nav-next").textContent = "Next >";
                } 
            }
            if(nextQuestion === 1) {
                document.querySelector(".nav-next").textContent = "Next >"
                document.querySelector(".nav-back").textContent = "*****"
            } else {
                document.querySelector(".nav-next").textContent = "Next >";
                document.querySelector(".nav-back").textContent = "< Back";
                //document.querySelector(".nav-submit").textContent = "*****";
            }
        } 
        else if (direction === "submit") {
            //Array check for correct answer variables 
            var correctObjectAnswers = 0 
            var resultsObject = {};
            const answerObject = {
                q01: "choice-1c",
                q02: "choice-2d",
                q03: "choice-3d"
            }
            var previousQuestion = "q01";
            var currentQuestion = "q01";
            var checkedFlag = false;
            for(radioButton of radioButtons) {
            
                //Array check for correct answer procedure  
                //console.log(radioButton.name, radioButton.value, radioButton.checked);
                currentQuestion = radioButton.name;
                if(previousQuestion !== currentQuestion) {
                    //console.log("Question Change Point");
                    if(checkedFlag === false) {
                        resultsObject[previousQuestion] = "";
                    }
                    checkedFlag = false;
                }
                previousQuestion = radioButton.name;
                if(radioButton.checked === true) {
                    resultsObject[radioButton.name] = radioButton.value;
                    checkedFlag = true;
                }
            }

            if(checkedFlag === false) {
                resultsObject[previousQuestion] = "";
            }
            checkedFlag = false;

            for (var key in resultsObject) {
                if(resultsObject[key] === answerObject[key]) {
                    correctObjectAnswers++;
                }
            }
            document.querySelector('.nav-indicator').textContent = `Your Score is ${correctObjectAnswers} out of ${questionCount}`;
        }               
    })
}

for(var radioButton of radioButtons) {
    radioButton.addEventListener('click', function(event) {
        var questionDisplayNumber = document.querySelector('.question-active .question-number');
        if(questionDisplayNumber.textContent === questionDisplayTotal.textContent) {
            document.querySelector(".nav-submit").textContent = "Submit";
        }
    })
}
    