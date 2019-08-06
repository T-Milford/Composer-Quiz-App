
let questionCounter = 0;
let scoreCounter = 0;

// The starting screen should have a button that users can click to start the quiz.
    // This button deletes the starting screen div and calls questionDisplayer (for the first question?).
function afterFirstClick() {
    console.log('afterFirstClick ran!')
    $('.js-intro').on('click', '.begin_button', function(event) {
        console.log('begin_button clicked!');
        $('.js-intro').remove();
    })
}

// Users should be prompted through a series of at least 5 multiple choice questions that they can answer.
// Users should be asked questions 1 after the other.
// Users should only be prompted with 1 question at a time.
// Users should not be able to skip questions.
    // Users will see which question they're on (for instance, "7 out of 10")
    // and their current score ("5 correct, 2 incorrect").

// this function will render the questions and answers using HTML and data from bank.js, 
// it will insert it into .js-main_window
// it will then send users to a correctAnswer or incorrectAnswer function

function questionDisplayer () {
    $('.question_container').html(
        `<div class="question_formatter">
            <h2>${questionBank[1].question}</h2>
            console.log(<h2>${questionBank[1][1]}</h2>);
        </div>`
    )
    console.log('questionDisplayer ran');
}

function respondToAnswer () {


}

    

// this function calls the HTML for a screen indicating whether or not the user's answer was correct.  
// It will update current score to reflect this.
// It will then call questionDisplayer 
function userSelectAnswer() {
    console.log('userSelectAnswer is working!');
}

// Upon submitting an answer, users should:
// receive textual feedback about their answer. If they were incorrect, they should be told the correct answer.
// be moved onto the next question (or interact with an element to move on).



// Users should be shown their overall score at the end of the quiz. In other words, 
// how many questions they got right out of the total questions asked.
// Users should be able to start a new quiz.


function handleAllFunctions () {
    afterFirstClick();
    questionDisplayer();
    
}

$(handleAllFunctions);