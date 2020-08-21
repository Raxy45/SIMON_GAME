var colorArray = ["red", "yellow", "blue", "green"];
var gamePattern = [];
var userClickedPattern = [];
var level = 1;
var started = false;

$(".btn").click(handleClick);
$("#level-title").click(function () {
  if (!started) {
    setTimeout(nextSequence, 500);
    started = true;
  }
});

function nextSequence() {
  userClickedPattern = [];
  $("#level-title").text("Level " + level);
  var randomNumber = Math.floor(Math.random() * 4);
  var randomColor = colorArray[randomNumber];
  gamePattern.push(randomColor);
  $("#" + randomColor)
    .fadeOut(100)
    .fadeIn(100);
  playSound(randomColor);
  level++;
}

function handleClick() {
  userClickedPattern.push(this.id);
  //   console.log(userClickedPattern);
  animatePress(this.id);
  playSound(this.id);
  checkAnswer(userClickedPattern.length - 1);
}

function checkAnswer(gameLevel) {
  if (userClickedPattern[gameLevel] === gamePattern[gameLevel]) {
    if (userClickedPattern.length === gamePattern.length) {
      console.log("right");
      setTimeout(nextSequence, 1000);
    }
  } else {
    playSound("wrong");
    $("body").addClass("game-over");
    setTimeout(function () {
      $("body").removeClass("game-over");
    }, 200);
    $("h1").text("Game over");
    startover();
  }
}

function startover() {
  gamePattern = [];
  level = 1;
  started = false;
  $("#level-title").text("Press Me To restart");
}
function animatePress(buttonColor) {
  $("#" + buttonColor).addClass("pressed");
  setTimeout(function () {
    $("#" + buttonColor).removeClass("pressed");
  }, 100);
}
function playSound(buttonColor) {
  const audio = new Audio("sounds/" + buttonColor + ".mp3");
  audio.play();
}
