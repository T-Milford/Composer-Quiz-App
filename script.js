
// Current problems:
//  When button class is included in .on parameters, things get ugly
//      the problem is without those classes, it won't be clear to the DOM which button in content_container 
//      has been clicked
//  Without having '.answer_submit' class, first answer is correctly evaluated...but then feedback is run too!
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
    $('.js-intro').on('click', '.begin_button', function() {
        $('.js-intro').remove();
        renderQuestion();
    })
}
        
function renderQuestion() {
    let question = questionBank[questionCounter].question;
    let answer = questionBank[questionCounter].answers;
    
    $('.content_container').html(
        `
        <div class="question_formatter">
            <h2>${question}</h2>
        </div>
        <form class="answer_container"> 
            <label class="answer_formatter">
                <input type="radio" value="${answer[0]}" name="answer" required>
                <span>${answer[0]}</span> 
                </label>
            <label class="answer_formatter">
                <input type="radio" value="${answer[1]}" name="answer" required>
                <span>${answer[1]}</span> 
                </label>
            <label class="answer_formatter">
                <input type="radio" value="${answer[2]}" name="answer" required>
                <span>${answer[2]}</span> 
                </label>
            <label class="answer_formatter">
                <input type="radio" value="${answer[3]}" name="answer" required>
                <span>${answer[3]}</span> 
                </label>
            <button class="answer_submit" type="submit">Check your answer!</button>
        </form>
        `
    )}


$('.answer_submit').on('click', function () {
    console.log('Assessing answer!');
    // event.preventDefault(); don't need?
    if ($('input:checked').val() === questionBank[questionCounter].correctAnswer) {
        console.log('answer was correct, running feedback');
        feedback(true);
    }
    else {
        console.log('answer was incorrect, running feedback');
        feedback(false);
    }
}
    )


function feedback(response) {
    console.log('feedback ran!')
    if (response === true) {
        // increment score
        $('.content_container').html(`
        <div class="correct_container">
            <h1>Well done!</h1>  
        <h2>It was indeed ${questionBank[questionCounter].correctAnswer}.</h2>
        <button class="next_question" type='submit'>Next question!</button>
        </div>
    `
    )}
    else {
        console.log('feedback ran!')
        $('.content_container').html(`
        <div class="wrong_container">
            <h1>So sorry.  The answer was ${questionBank[questionCounter].correctAnswer}.</h1>
        <button class="next_question" type='submit'>Next question!</button>
        </div>
        `
    )}
}

$('.next_question').on('click', function(){
    // increment questionCounter
    if (questionCounter < questionBank.length ) {
        renderQuestion();
    }
    else {
        endScreen();
    }
})

function endScreen() {
    console.log('endScreen ran');
    $('.content_container').html(`
    <div>
        <h1>You have reached the end.</h1>
    </div>
    <button class="start_over" type='submit'>Start over!</button>
    `)
}

$('.start_over').on('click', function () {
     questionCounter = 0;
     renderQuestion();
    })

function handleFunctions() {
    introScreen();

}

$(handleFunctions);


// function nextQuestion() {
//     
// }

// function renderQuestion() {
//     console.log('renderQuestion ran');
//     $('.correct_container').on('submit', function () {
//         event.preventDefault();
//         event.stopPropagation();
//         //increment score here
//         questionCounter++;
//         renderQuestion();
//         }
//         )


//     $('.wrong_container').on('submit', function () {
//         event.preventDefault();
//         event.stopPropagation();
//         questionCounter++;
//         renderQuestion();
//         }
//         )

// }


//called when questionCounter = questionBank.length
