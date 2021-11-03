let buttonColors = ["red", "yellow", "blue", "green"];
let userClickedPattern = [];
let gamePattern = [];
let started = false;
let level = 0;


$(document).keypress(function () {
    if (!started) {
        $("#level-title").text("Level " + level);
        nextSequence();
        started = true;
    }
});

function nextSequence() {
    //Increase level by 1
    level++;

    //change in the value of level.
    $("#level-title").text("Level " + level);

    let randomNumber = Math.floor(Math.random() * 4); //Assigning random number to desired color
    let randomChosenColor = buttonColors[randomNumber];
    gamePattern.push(randomChosenColor); //Animate flash using jquery

    $("#" + randomChosenColor).fadeIn(100).fadeOut(100).fadeIn(100);

    let audio = new Audio("sounds/" + randomChosenColor + ".mp3");
    audio.play();
}

$(".btn").click(function () {
    if (started) {
        let userChosenColor = $(this).attr("id");
        userClickedPattern.push(userChosenColor);

        playSound(userChosenColor);

        animatePress(userChosenColor);
        // Call checkAnswer() after a user has clicked and chosen their answer, passing in the index of the last answer in the user's sequence.
        console.log("userClickedPattern:", userClickedPattern);
        checkAnswer(userClickedPattern.length - 1);
    }

});


function playSound(name) {
    $("#" + name).fadeOut(100).fadeIn(100);
    let audio = new Audio("sounds/" + name + ".mp3");
    audio.play();
}

function animatePress(currentColor) {
    $('#' + currentColor).addClass("pressed");

    setTimeout(function () {
        $("#" + currentColor).removeClass("pressed")
    }, 100)
}

function checkAnswer(currentLevel) {
    // Check if the LAST button clicked is right
    console.log('userClickedPattern: ', userClickedPattern[currentLevel], "\tgamePattern: ", gamePattern[currentLevel]);
    if (userClickedPattern[currentLevel] === gamePattern[currentLevel]) {
        // set a variable to count how many colors the user got right
        let count = 0;
        // loop through the two arrays, and compare if EACH ONE of the values is the same as the other
        for (let i = 0; i <= gamePattern.length; i++) {
            if (gamePattern[i] === userClickedPattern[i]) {
                // if the two values matche, count + 1
                count++;
            }
        }
        // ONLY if the count is the same number as gamePattern length,
        // (meaning each one of the colors was right) then it's success
        if (userClickedPattern.length === gamePattern.length) {
            console.log("success");
            setTimeout(function () {
                nextSequence();
            }, 1000);
        }
        // otherwise, it's wrong and trigger Game Over
    } else {
        console.log("wrong");
        let wrongAudio = new Audio("sounds/wrong.mp3");
        wrongAudio.play();
        $("body").addClass("game-over");
        setTimeout(function () {
            $("body").removeClass("game-over");
        }, 200);
        $("#level-title").text("Game Over, Press Any Key to Restart");

        startOver();
    }
}

// Resets every variable -------------

function startOver() {
    level = 0;
    gamePattern = [];
    started = false;
    userClickedPattern = [];

}
