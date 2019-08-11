let questionCounter = 0;
let scoreCounter = 0;

function introScreen() {
    $(document).on('click', '.begin_button', function() {
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
            <button type="submit" class="answer_submit">Check your answer!</button>
        </form>`)
    $('.question_counter').text(`${questionCounter + 1} out of 7`)
    $('.score_counter').text(`${scoreCounter} correct, ${7-questionCounter} questions left`)
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
            <h1>Well done!</h1>  
        <h2>It was indeed ${correct}.</h2>
        <button class="next_question">Next question!</button>
        </div>
    `)}
    else {
        console.log('feedback ran!')
        $('.content_container').html(`
        <div class="wrong_container">
            <h1>So sorry.  The answer was ${correct}.</h1>
            <button class="next_question">Next question!</button>
        </div>
        `)}
}
// would love to make this work...
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
    <div>
        <h1>You have reached the end.</h1>
        <h2>You correctly answered ${scoreCounter} out of 7 questions.</h2>
    </div>
    <button class="start_over">Try again?</button>
    `)}

$(document).on('click', '.start_over', function () {
     questionCounter = 0;
     scoreCounter = 0;
     renderQuestion();
    })

$(introScreen);
