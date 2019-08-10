
// Users should be prompted through a series of at least 5 multiple choice questions that they can answer.
    // Users will see which question they're on (for instance, "7 out of 10")
    // and their current score ("5 correct, 2 incorrect").

    // questionCounter needs to accurately pull/track questions and answers, but 
let questionCounter = 0;
let scoreCounter = 0;

function introScreen() {
    console.log('introScreen ran!')
    $('.js-intro').on('click', '.begin_button', function() {
        $('.js-intro').remove();
        questionDisplayer();
    })
}

function questionDisplayer () {
    console.log('questionDisplayerran!')
    console.log(questionCounter);
    if (questionCounter < questionBank.length ) {
    $('.content_container').html(
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
            <button class="answer_submit" type="submit">Check your answer!</button>
        </form>
        `
    )}
    else {
        endScreen();
    }
}

// is only running once...is it always listening?
function respondToAnswer () {
    console.log('respondToAnswer ran!')
    console.log(questionCounter);
//  $('.content_container').on('submit', 'answer_submit', function ()  -->  resets program.  Why??
    $('.content_container').on('submit', 'answer_submit', function () {
        event.preventDefault();
        event.stopPropagation();
        if ($('input:checked').val() === questionBank[questionCounter].correctAnswer) {
            feedbackCorrect();
        }
        else {
            feedbackWrong();
        }
    }
        )
}

// How come I am only seeing this after the first question?  It is running but goToNextQuestion ends up
// running immediately.  Also: 
function feedbackCorrect () {
    console.log('feedbackCorrect ran!')
    console.log(questionCounter);
    $('.content_container').html(`
    <div>
    <h1>Well done!</h1>  
    <h2>It was indeed ${questionBank[questionCounter].correctAnswer}.</h2>
    <form>
    <button class="right_next_question" type='submit'>Next question!</button>
    </form>
    
    `
    )
    // when you click this button, it makes feedbackWrong run!  Why?  When I specify class after "submit", 
    //it makes it worse!  It makes it display "feedbackWrong".  Why?
    $('.content_container').on('submit', '.right_next_question', function () {
        event.preventDefault();
        event.stopPropagation();
        //increment score here
        questionCounter++;
        questionDisplayer();
        }
    )
}

// this function is running an extra time after itself AND after feedbackCorrect!  What is going on??
function feedbackWrong () {
    console.log('feedbackWrong ran!')
    console.log(questionCounter);
    $('.content_container').html(`
    <div>
        <h1>So sorry.  The answer was ${questionBank[questionCounter].correctAnswer}.</h1>
    </div>
    <form>
    <button class="wrong_next_question" type='submit'>Next question!</button>
    </form>
    `
    )
    
    //'.wrong_next_question' in .on parameters; needed?
    $('.content_container').on('submit', '.wrong_next_question', function () {
        event.preventDefault();
        event.stopPropagation();
        questionCounter++;
        questionDisplayer;
        }
    )
}

// unneeded function?
// function goToNextQuestion () {
//     console.log('goToNextQuestion ran!')
    // event.preventDefault();
    // event.stopPropagation();
        // questionCounter++;
        // console.log(questionCounter);
        // questionDisplayer();
// }


// Users should be shown their overall score at the end of the quiz. In other words, 
// how many questions they got right out of the total questions asked.
// Users should be able to start a new quiz.
//Why is final question being skipped?
function endScreen () {
    console.log('endScreen ran');
    $('.content_container').html(`
    <div>
        <h1>You have reached the end.</h1>
    </div>
    <form>
    <button class="start_over" type='submit'>Start over!</button>
    </form>
    `)

    $('.content_container').on('submit', '.start_over', function () {
        event.preventDefault();
        event.stopPropagation();
        questionCounter = 0;
        questionDisplayer();
    })
}

function handleAllFunctions () {
    introScreen();
    respondToAnswer();   
}

$(handleAllFunctions);