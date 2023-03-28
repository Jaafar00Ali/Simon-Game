
//#region preallocation

let isTouch = ('ontouchstart' in document);

let score = [];

let gamePattern = [];

let userClickedPattern = [];

let buttonColours = ["red", "blue", "green", "yellow"];

let level = 0;

let started = false;

//#endregion


//#region greeting flash

$(".blue").addClass("startFlash");

        setTimeout(function () {

            $(".blue").removeClass("startFlash");

             $(".yellow").addClass("startFlash");

            setTimeout(function () {

            $(".yellow").removeClass("startFlash");

                $(".green").addClass("startFlash");

                setTimeout(function () {

                    $(".green").removeClass("startFlash");

                    $(".red").addClass("startFlash");

                    setTimeout(function () {

                    $(".red").removeClass("startFlash");

                    $(".blue").addClass("startFlash");

                    setTimeout(function () {

                    $(".blue").removeClass("startFlash");

                    $(".yellow").addClass("startFlash");

                        setTimeout(function () {

                        $(".yellow").removeClass("startFlash");

                        $(".green").addClass("startFlash");

                            setTimeout(function () {

                            $(".green").removeClass("startFlash");

                            $(".red").addClass("startFlash");

                                setTimeout(function () {

                                $(".red").removeClass("startFlash");

                                    $(".btn").addClass("startFlash");

                                    setTimeout(function () {

                                        $(".btn").removeClass("startFlash");

                                        setTimeout ( function () {$(".btn").addClass("startFlash");

                                        setTimeout(function () {

                                        $(".btn").removeClass("startFlash");

                                        }, 150);

                                    },150);

                                    }, 150);

                            }, 150);

                        }, 150);

                    }, 150);

                }, 150);

                    }, 150);

                }, 150);

            }, 150);

        }, 150);

        setTimeout(function () { 

            if (isTouch === true) {

                $("h1").html("<button id='touchButton' class='restartButton font'>START</button>");

                document.querySelector("#touchButton").addEventListener("click", touchStart);


            }

            else {

                $("h1").text("Press A Key to Start");
            }

        },1800);

//#endregion


//#region Start gameplay 

$(document).keydown(function() {

    if (started === false) {

        $("#level-title").text("Level " + level);

        nextSequence();

        started = true;

    } 

});

//#endregion
 

//#region (TOUCHSCREEN) Start gameplay 


//#endregion


//#region start next sequence 

function nextSequence () {

    console.log(score);

    userClickedPattern = [];

    level++;

    $("h1").text("Level " + level);

    if (score.length>=1) {

    let highScore = score.reduce((a, b) => Math.max(a, b), -Infinity);

    $("h2").html("Highscore = Level " + highScore);

    }

    let randomNumber = Math.floor(Math.random()*4);

    let randomChosenColour = buttonColours[randomNumber];

    gamePattern.push(randomChosenColour);

    $("#" + randomChosenColour).fadeIn(100).fadeOut(100).fadeIn(100);

    playSound(randomChosenColour);

}

//#endregion


//#region Check answer

function checkAnswer (currentLevel) {

    if (gamePattern[currentLevel] == userClickedPattern[currentLevel]) {

        if (userClickedPattern.length == gamePattern.length) {

            setTimeout(function () {nextSequence();}, 1000);

        }

    }

    else {

        let wrongAudio = new Audio ("wrong.mp3");

        score.push(level);

        wrongAudio.play();

        $("body").addClass("game-over");

        setTimeout(function(){ $("body").removeClass("game-over");}, 300);

        if (isTouch == true) {

            $("h1").html("<button id='touchButton2' class='restartButton font'>TRY AGAIN</button>");
                
            document.querySelector("#touchButton2").addEventListener("click", touchStart);

        }
        else {
        $("h1").text("GAME OVER, press any key to restart!");
        }

        startOver();

    }

}

//#endregion


//#region animation and sound for clicked button

$(".btn").on("click", function () {

    let userChosenColour = $(this).attr("id");

    userClickedPattern.push(userChosenColour);

    playSound(userChosenColour);

    animatePress(userChosenColour);

    checkAnswer(userClickedPattern.length-1);

});

//#endregion


//#region (TOUCHSCREEN) animation and sound for clicked button

$(".btn").on("tap", function () {

    let userChosenColour = $(this).attr("id");

    userClickedPattern.push(userChosenColour);

    playSound(userChosenColour);

    animatePress(userChosenColour);

    checkAnswer(userClickedPattern.length-1);

});

//#endregion


//#region animation 

function animatePress (currentColour) {

    $("." + currentColour).addClass("pressed");

    setTimeout (function() {
        $("." + currentColour).removeClass("pressed");
    }, 100);

}

//#endregion


//#region sound

function playSound (name){

    let audio = new Audio (name + ".mp3");

    audio.play();

}

//#endregion


//#region Restart

function startOver () {

    level = 0;

    gamePattern = [];

    started = false;

}

//#endregion


//#region Restart Button

$(".restartButton").on("click", function() {location.reload();})

//#endregion


//#region (TOUCHSCREEN) Restart Button

$(".restartButton").on("tap", function() {location.reload();})

//#endregion


//#region (TOUCHSCREEN) touchSTART

function touchStart () {
    if (started === false) {

        console.log('hello')

        $("#level-title").text("Level " + level);

        nextSequence();

        started = true;

    } 
}

//#endregion