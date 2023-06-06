// alert("Well hello there!");
var buttonColours = ["red", "blue", "green", "yellow"];
var gamePattern = [];
var userClickedPatterns = [];
var level = 0;

var isGameStarted = false;

$(document).keydown(function(){

    if(isGameStarted === false) {
        nextSequence();
        isGameStarted = true;
    }

});


function nextSequence(){
    
    level+=1;
    userClickedPatterns = [];
    $("#level-title").text("Level "+level);
    var randomNumber = Math.floor(Math.random() * 4);
    var randomChosenColour = buttonColours[randomNumber];
    gamePattern.push(randomChosenColour);
    $("#"+randomChosenColour).fadeOut().fadeIn();
    playSound(randomChosenColour);
}

$(".btn").on("click", function(){
    var userChosenColour = this.id;
    console.log(userChosenColour);
    
    userClickedPatterns.push(userChosenColour);
    // console.log(userClickedPatterns);
    // console.log(userChosenColour);
    playSound(userChosenColour);
    animatePress(userChosenColour);
    // var index = userClickedPatterns.indexOf(userChosenColour);

    // console.log(index);
    // checkAnswer(index);
    console.log(userClickedPatterns.length);
    console.log(userClickedPatterns.length-1);
    checkAnswer(userClickedPatterns.length-1);
})

function checkAnswer(currentLevel){

    if(gamePattern[currentLevel] === userClickedPatterns[currentLevel]) {
        console.log("success");
        if(gamePattern.length === userClickedPatterns.length) {
            // console.log("success");
            nextSequence();
        }
    }
    else {
        console.log("wrong");
        var wrongSound = new Audio("./sounds/wrong.mp3");
        wrongSound.play();
        $("body").addClass("game-over");
        setTimeout(function(){
            $("body").removeClass("game-over")
        },200);
        $("h1").text("Game Over, Press Any Key to Restart");
        startOver();
    }

}

function animatePress(currentColour) {

    var activeButton = "#"+currentColour;
    $(activeButton).addClass("pressed");
    setTimeout(function(){
        $(activeButton).removeClass("pressed")
    },100);

}

function startOver(){
    level=0;
    gamePattern = [];
    isGameStarted = false;
}

function playSound(randomChosenColour) {

    switch(randomChosenColour) {
        case "yellow":
        var yellowSound = new Audio("./sounds/yellow.mp3");
        yellowSound.play();
        break;
        case "green":
        var greenSound = new Audio("./sounds/green.mp3");
        greenSound.play();
        break;
        case "blue":
        var blueSound = new Audio("./sounds/blue.mp3");
        blueSound.play();
        break;
        case "red":
        var redSound = new Audio("./sounds/red.mp3");
        redSound.play();
        break;
    }

}
