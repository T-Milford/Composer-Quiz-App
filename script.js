
// Current problems:
//  When button class is included in .on parameters, things get ugly
//      the problem is without those classes, it won't be clear to the DOM which button in content_container 
//      has been clicked
//  Without having '.answer_submit' class, first answer is correctly evaluated...but then feedbackWrong is run too!
//      WHY?


// Users should be prompted through a series of at least 5 multiple choice questions that they can answer.
    // Users will see which question they're on (for instance, "7 out of 10")
    // and their current score ("5 correct, 2 incorrect").

// Users should be shown their overall score at the end of the quiz. In other words, 
// how many questions they got right out of the total questions asked.
// Users should be able to start a new quiz.

let questionCounter = 0;
let scoreCounter = 0;

function introScreen() {
    console.log('introScreen ran!')
    $('.js-intro').on('click', '.begin_button', function() {
        $('.js-intro').remove();
        questionDisplayer();
    })
}

function questionDisplayer() {
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

// listens for submission of 'answer_submit' button
function respondToAnswer() {
    console.log('respondToAnswer ran!')
    console.log(questionCounter);
    // $('.content_container').on('submit', '.answer_submit'... crashes program!  Why?
    // this is getting called when other buttons below are clicked!  but adding above parameters breaks it.
    $('.content_container').on('submit', function () {
        event.preventDefault();
        event.stopPropagation();
        if ($('input:checked').val() === questionBank[questionCounter].correctAnswer) {
            console.log('answer was correct, running feedbackCorrect');
            feedbackCorrect();
        }
        else {
            console.log('answer was incorrect, running feedbackWrong');
            feedbackWrong();
        }
    }
        )
}

// runs if user answer was correct
function feedbackCorrect() {
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
    
}

// runs if user answer was wrong
function feedbackWrong() {
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
}

// this will listen for 'next question' buttons associated with either 'correct' or 'incorrect' prompts above.
// When user clicks, will take to next question.
function goToNextQuestion() {
    console.log('goToNextQuestion ran');
    $('.content_container').on('submit', '.right_next_question', function () {
        event.preventDefault();
        event.stopPropagation();
        //increment score here
        questionCounter++;
        questionDisplayer();
        }
        )


    $('.content_container').on('submit', '.wrong_next_question', function () {
        event.preventDefault();
        event.stopPropagation();
        questionCounter++;
        questionDisplayer();
        }
        )

}


//called when questionCounter = questionBank.length
function endScreen() {
    console.log('endScreen ran');
    $('.content_container').html(`
    <div>
        <h1>You have reached the end.</h1>
    </div>
    <form>
    <button class="start_over" type='submit'>Start over!</button>
    </form>
    `)

}

function listenForStartOver() {
    $('.content_container').on('submit', '.start_over', function () {
     event.preventDefault();
     event.stopPropagation();
     questionCounter = 0;
     questionDisplayer();
    })
}

function handleAllFunctions() {
    goToNextQuestion();
    introScreen();
    respondToAnswer();   
    
}

$(handleAllFunctions);