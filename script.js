let questionCounter = 0;
let scoreCounter = 0;

function introScreen() {
    $(document).on('click', '.begin_button', function() {
        renderQuestion();
    })
    $('.question_counter').html('Get ready!')

}
        
function renderQuestion() {
    let question = questionBank[questionCounter].question;
    let answer = questionBank[questionCounter].answers;
    
    $('.content_container').html(
        `
        <div>
            <h2 class="question_formatter">${question}</h2>
        </div>
        <fieldset class="four_choices">
        <legend>Choose a composer:</legend>
        <form class="answer_container"> 
            <label class="answer_formatter" for="${answer[0]}">
                <input id="${answer[0]}" type="radio" value="${answer[0]}" name="answer" required>
                <span>${answer[0]}</span> 
                </label>
            <label class="answer_formatter" for="${answer[1]}">
                <input id="${answer[1]}" type="radio" value="${answer[1]}" name="answer" required>
                <span>${answer[1]}</span> 
                </label>
            <label class="answer_formatter" for="${answer[2]}">
                <input id="${answer[2]}" type="radio" value="${answer[2]}" name="answer" required>
                <span>${answer[2]}</span> 
                </label>
            <label class="answer_formatter" for="${answer[3]}">
                <input id="${answer[3]}" type="radio" value="${answer[3]}" name="answer" required>
                <span>${answer[3]}</span> 
                </label>
            <button type="submit" class="answer_submit">Check your answer!</button>
        </form>
        </fieldset>`)
    $('.question_counter').text(`Question ${questionCounter + 1} out of 7`)
    $('.score_counter').text(`${scoreCounter} correct, ${7-questionCounter} left`)
}


$(document).on('click', '.answer_submit', function () {
    event.preventDefault();
    console.log('Assessing answer!');
    if ($('input:checked').val() === questionBank[questionCounter].correctAnswer) {
        console.log('answer was correct, running feedback');
        feedback(true);
    }
    else {
        console.log('answer was incorrect, running feedback');
        feedback(false);
    }
})


function feedback(response) {
    console.log('feedback ran!')
    let correct = questionBank[questionCounter].correctAnswer;
    if (response === true) {
        scoreCounter++;
        $('.content_container').html(`
        <div class="correct_container">
            <h2>Well done! It was indeed ${correct}.</h2>
        <button class="next_question">Next question!</button>
        </div>
    `)}
    else {
        console.log('feedback ran!')
        $('.content_container').html(`
        <div class="wrong_container">
            <h2>So sorry.  The answer was ${correct}.</h2>
            <button class="next_question">Next question!</button>
        </div>
        `)}
}
// would love to make this work eventually...
// function pictureSorter(correct) {
//     if (correct === 'Brahms') {
//         return "https://cdn.britannica.com/s:300x300/01/8501-004-E3E15D16.jpg";
//     }
//     else {
//         console.log('Nothing to see here!')
//     }
// }

$(document).on('click', '.next_question', function(){
    questionCounter ++;
    if (questionCounter < questionBank.length ) {
        renderQuestion();
    }
    else {
        endScreen();
    }})

function endScreen() {
    console.log('endScreen ran');
    $('.content_container').html(`
    <div class="end_screen">
        <h1>You have reached the end.</h1>
        <h2>You correctly answered ${scoreCounter} out of 7 questions.</h2>
    </div>
    <button class="start_over">Try again?</button>
    `)
    $('.score_counter').html('')
    $('.question_counter').html('')

}

$(document).on('click', '.start_over', function () {
     questionCounter = 0;
     scoreCounter = 0;
     renderQuestion();
    })

$(introScreen);
