$(document).ready(function() {

    // Array of our trivia questions with true or false answers
    var triviaQuestions = [
        { 
            question: "On a farm, a kid is a baby goat.", 
            choices: ["True", "False"],
            answer: 0,
            photo: "assets/images/goat.jpg"
        },
        { 
            question: "There are 4 colors in a rainbow.",
            choices: ["True", "False"],
            answer: 1,
            photo: "assets/images/rainbow.jpg"
        },
        { 
            question: "The Italian city Pisa is famous for its leaning tower.",
            choices: ["True", "False"], 
            answer: 0,
            photo: "assets/images/tower.jpg"
        },
        { 
            question: "The cowboy from Toy Story is named Whoopie.",
            choices: ["True", "False"], 
            answer: 1,
            photo: "assets/images/woody.gif"
        },
        { 
            question: "Baloo was the name of the bear in The Jungle Book.",
            choices: ["True", "False"], 
            answer: 0,
            photo: "assets/images/baloo.gif"
        },
        {
            question: "The 70+-year-old mother of Hideo Kojima, creator of the Metal Gear Solid series, played completely through Metal Gear Solid 3.",
            choices: ["True", "False"],
            answer: 0,
            photo: "assets/images/kojima.gif"
        },
        { 
            question: "Chicago is the third largest city in the United States.",
            choices: ["True", "False"], 
            answer: 0,
            photo: "assets/images/chicago.jpg"
        },
        { 
            question: "You are great and cool.",
            choices: ["True", "False"], 
            answer: 0,
            photo: "assets/images/great.jpg"
        },
    ];

    // Global question/quiz variables
    var timeCounter = 30;
    var intervalId;
    var running = false;
    var correctAnswers = 0;
    var wrongAnswers = 0;
    var unansweredQuestions = 0;
    var questionCount = triviaQuestions.length;
    var userGuess = "";
    var pick;
    var index;
    var newArray= [];
    var holder = [];

    // Reset button hidden until end of game
    $("#reset").hide();

    // Show start button, click to start game
    $("#start").on("click", function() {
        $("#start").hide();
        runTimer();
        renderQuestion();
        
        for (var i = 0; i < triviaQuestions.length; i++) {
            holder.push(triviaQuestions[i]);
        };
    });

    // Begin timer
    function runTimer() {
        if (!running){
            intervalId = setInterval(countDown, 1000);
            running = true;
        }
    };

    // Countdown timer function
    function countDown() {
        $("#timer").html(`<h3>Time Remaining: ${timeCounter}</h3>`);
        timeCounter--;

        // Stops timer if timer reaches 0
        if (timeCounter === 0) {
            unansweredQuestions++;
            
            stop();

            $("#answer-section").html(`<p>Ouch! It seems like we're out of time. The correct answer is: ${pick.choices[pick.answer]}</p`);
            
            hidePicture();
        };
    };

    // Stop timer function
    function stop() {
        running = false;
        clearInterval(intervalId);
    };

    // Renders questions on the screen
    function renderQuestion() {
        // Generates random index out of the questions and displays it on the screen
        index = Math.floor(Math.random() * triviaQuestions.length);
        pick = triviaQuestions[index];

        $("#question-section").html(`<h2>${pick.question}</h2>`);

        for (var i = 0; i < pick.choices.length; i++) {
            var userChoice = $("<div>");

            userChoice.addClass("answer-choice");
            userChoice.html(pick.choices[i]); 
            userChoice.attr("data-guess-value", i);
            $("#answer-section").append(userChoice);
        };

        $(".answer-choice").on("click", function () {
            // Grab array position from userGuess
            userGuess = parseInt($(this).attr("data-guess-value"));

            // If statement for right/wrong outcomes
            if (userGuess === pick.answer) {
                stop();

                correctAnswers++;
                userGuess = "";

                $("#answer-section").html("<p>Correct!</p>");
                hidePicture();
            }
            else {
                stop();

                wrongAnswers++;
                userGuess = "";
                $("#answer-section").html(`<p>Wrong!! The correct answer is: ${pick.choices[pick.answer]}</p>`)
                hidePicture();
            };
        });
    };

    function hidePicture() {
        $("#answer-section").append(`<img src = ${pick.photo} >`);

        newArray.push(pick);
        triviaQuestions.splice(index, 1);

        var hidpic = setTimeout(function() {
            $("#answer-section").empty();
            timeCounter = 30;

            // Run the end game screen if all questions are answered
            if ((wrongAnswers + correctAnswers + unansweredQuestions) === questionCount) {
                $("#question-section").empty();
                $("#question-section").html("<h3>Game Over! Here's How You Did: </h3>");
                $("#answer-section").append(`<h4>Correct: ${correctAnswers}</h4>`);
                $("#answer-section").append(`<h4>Incorrect: ${wrongAnswers}</h4>`);
                $("#answer-section").append(`<h4>Unanswered: ${unansweredQuestions}</h4>`);
                $("#reset").show();            
            }
            else {
                runTimer();
                renderQuestion();
            };
        }, 3000);
    };

    $("#reset").on("click", function() {
        $("#reset").hide();
        $("#answer-section").empty();
        $("#question-section").empty();

        for (var i = 0; i < holder.length; i++) {
            triviaQuestions.push(holder[i]);
        }

        runTimer();
        renderQuestion();
    });
});