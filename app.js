$('#start').on('click', function() {
    game.start();
});

var questions = [{
    question: "What was the first full length CGI movie?",
    answers: ["a bugs life", "monsters inc"],
    correctAnswer: "a bugs life"
}, {
    question: "What year was Justin Briones born?",
    answers: ["1992", "1994", "1991"],
    correctAnswer: "1992"

}, {
    question: "When should I quit my job?",
    answers: ["ASAP", "September", "All of the above"],
    correctAnswer: "All of the above"
}
];


//game object to modify by methods and functions
var game = {
    correct: 0,
    incorrect: 0,
    counter: 20,
    //countDown method
    countDown: function() {
      game.counter--;
      $('#counter').html(game.counter);
      if(game.counter <= 0) {
        console.log('Time is up');
        game.done();
      }
    },
    //start game method
    start: function() {
      timer = setInterval(game.countDown, 1000);
      $('#subWrapper').prepend('<h2> Time Remaining: <span id="counter"> 120 </span> Seconds </h2>');
      $('#start').remove();
      for(var i = 0; i < questions.length; i++) {
        $('#subWrapper').append('<h2>' + questions[i].question + '</h2>' );
        for(var j = 0; j < questions[i].answers.length; j++) {
          $('#subWrapper').append("<input type='radio' name='question-" + i +
          "' value='" + questions[i].answers[j] + "''>" + questions[i].answers[j]);
        }
      }
    },
    done: function() {
      $.each($('input[name="question-0"]: checked', function() {
          if($(this).val() == questions[0].correctAnswer) {
            game.correct++;
          }
          else {
            game.incorrect++;
          }
      }));

      $.each($('input[name="question-1"]: checked', function() {
          if($(this).val() == questions[1].correctAnswer) {
            game.correct++;
          }
          else {
            game.incorrect++;
          }
      }));

      $.each($('input[name="question-2"]: checked', function() {
          if($(this).val() == questions[2].correctAnswer) {
            game.correct++;
          }
          else {
            game.incorrect++;
          }
      }));
      this.result();
    },
    result: function() {
      clearInterval(timer);
      $('#subWrapper h2').remove();

      $('#subWrapper').html("<h2>All done!</h2>");
      $('#subWrapper').append("<h3>Correct Answers: " + this.correct + "</h3>");
      $('#subWrapper').append("<h3>Correct Answers: " + this.incorrect + "</h3>");
      $('#subWrapper').append("<h3>UnAnswered: " + (questions.length - (this.incorrect + this.correct)) + "</h3>");
    }
}
