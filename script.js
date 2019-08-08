
// Users should be prompted through a series of at least 5 multiple choice questions that they can answer.
// Users should be asked questions 1 after the other.
// Users should only be prompted with 1 question at a time.
// Users should not be able to skip questions.
    // Users will see which question they're on (for instance, "7 out of 10")
    // and their current score ("5 correct, 2 incorrect").

let questionCounter = 0;
let scoreCounter = 0;

// The starting screen should have a button that users can click to start the quiz.
    // This button deletes the starting screen div and calls questionDisplayer (for the first question?).
function afterFirstClick() {
    console.log('afterFirstClick ran!')
    $('.js-intro').on('click', '.begin_button', function(event) {
        console.log('begin_button clicked!');
        $('.js-intro').remove();
        questionDisplayer();
    })
}

// to do:    
//      questionBank[insert questionCounter here]

//      compare user's answer to actual answer
//      it will then send users to a correctAnswer or incorrectAnswer function
function questionDisplayer () {
    $('.question_container').html(
        `
        <div class="question_formatter">
            <h2>${questionBank[questionCounter].question}</h2>
        </div>

        <form class="answer_container"> 
            <label class="answer_formatter">
                <input type="radio" value="${questionBank[questionCounter].answers[0]}" name="answer" required>
                <span>${questionBank[questionCounter].answers[0]}</span> 
                </label>
            <label class="answer_formatter">
                <input type="radio" value="${questionBank[questionCounter].answers[1]}" name="answer" required>
                <span>${questionBank[questionCounter].answers[1]}</span> 
                </label>
            <label class="answer_formatter">
                <input type="radio" value="${questionBank[questionCounter].answers[2]}" name="answer" required>
                <span>${questionBank[questionCounter].answers[2]}</span> 
                </label>
            <label class="answer_formatter">
                <input type="radio" value="${questionBank[questionCounter].answers[3]}" name="answer" required>
                <span>${questionBank[questionCounter].answers[3]}</span> 
                </label>
            <button class="answer_submit" type="submit">Check your answer</button>
        </form>
        `
    )
}

function respondToAnswer () {
    $('.question_container').on('submit', function () {
        event.preventDefault();
        if ($('input:checked').val() === questionBank[0].correctAnswer) {
            feedbackCorrect();
            questionCounter += 1;
        }
        else {
            feedbackWrong();
        }
    }
        )

}

// Upon submitting an answer, users should:
// receive textual feedback about their answer. If they were incorrect, they should be told the correct answer.
// be moved onto the next question (or interact with an element to move on).

function feedbackCorrect () {
    $('.question_container').html(`
    <div>
    <h1>Well done!</h1>  
    <h2>It was indeed ${questionBank[questionCounter].correctAnswer}.</h2>
    <form>
    <button type='submit'>Next question!</button>
    </form>
    
    `
    )
    $('.question_container').on('submit', function () {
        questionDisplayer();
    
})
}


function feedbackWrong () {
    $('.question_container').html(`
    
    
    
    `
    
    )}

// Users should be shown their overall score at the end of the quiz. In other words, 
// how many questions they got right out of the total questions asked.
// Users should be able to start a new quiz.


function handleAllFunctions () {
    afterFirstClick();
    respondToAnswer();
    
    
}

$(handleAllFunctions);