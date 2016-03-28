
$(document).ready(function(){
	
  /************
   * Listeners
   ************/
  
  /*--- Display information modal box ---*/
  	$(".what").click(function(){
    	$(".overlay").fadeIn(1000);

  	});

  /*--- Hide information modal box ---*/
  	$("a.close").click(function(){
  		$(".overlay").fadeOut(1000);
  	});

  /*--- Send guess when submit button clicks ---*/
  $('#guessButton').click(submitGuess);
  
  /*--- Reset or start new game ---*/
  $('nav a.new').click(newGame);

});

var GAME = {
  running: false,
  set runStatus(state){
    if (state) {
      this.running = true;
      setButtonsDisabledState(false);
    } else {
      this.running = false;
      setButtonsDisabledState(true);
    }
  },
  target: setTarget(),
  guesses: []
};

var DISPLAY = {
  updateDisplays: function(){
    this.setGuessCount();
    this.setGuessList();
    this.resetGuessInput();
  },
  
  resetGuessInput: function(){
    $('#userGuess').val('');
  },
  
  setGuessCount: function(){
    $('.game #count').text(GAME.guesses.length);
  },
  
  setGuessList: function(){
    $('#guessList').html(generateGuessListHtml());
  },
  
  sendFeedback: function(msg){
    $('#feedback').text(msg);
  }
};

function setTarget(){
  return Math.floor((Math.random() * 100) + 1);
}

function newGame(e){
  GAME.runStatus = true;
  GAME.target = setTarget();
  GAME.guesses = [];

  DISPLAY.updateDisplays();
  DISPLAY.sendFeedback('Make your Guess!');
}

function endGame(){
  GAME.runStatus = false;
}

function generateGuessListHtml(){
  var html = "";
  GAME.guesses.forEach(function(guess){
    html += "<li>" + guess + "</li>";
  });
  return html;
}

function addGuess(guess){
  GAME.guesses.push(guess);  
}

function submitGuess(e){
  e.preventDefault();
  var validatedGuess = validateGuess(parseInt($('#userGuess').val()));
  
  if (validatedGuess.error) {
    DISPLAY.sendFeedback(validatedGuess.error);
  } else {
    evaluateGuess(validatedGuess.guess);
  }
  
  DISPLAY.resetGuessInput();
}

function validateGuess(userGuess){
  var res = {};
  if (userGuess === '') {
    res.error = 'Must enter guess!';
  } else if ( Number.isNaN(userGuess) || userGuess < 1 || userGuess > 100 ) {
    res.error = 'Must be no. between 1 and 100';
  } else {
    res.guess = userGuess;
  }
  return res;
}

function evaluateGuess(guess){
  //determine hot/cold
  let hotRating = getHotRating(guess);

  //check for win condition
  if (hotRating === 'WINNER!!') endGame();
  
  //add guess to list
  addGuess(guess);
  DISPLAY.updateDisplays();

  //send feedback
  DISPLAY.sendFeedback(hotRating);
}

function getHotRating(guess){
  let target = GAME.target;
  let diff;
  
  if ( guess === target ) return "WINNER!!";
  
  if ( guess < target ) diff = target - guess;
  if ( guess > target ) diff = guess - target;
  
  if ( diff >= 20 ) {
    return "ICE ICE BABY";
  } else if ( diff >= 15 ) {
    return "Cold";
  } else if ( diff >= 12 ) {
    return "Getting warmer...";
  } else if ( diff >= 8 ) {
    return "Pretty hot";
  } else if ( diff >= 4 ) {
    return "Sweating!!";
  } else {
    return "BOILING!";
  }
  
}

function setButtonsDisabledState(state){
  $('#guessButton').attr('disabled', state);
  $('#userGuess').attr('disabled', state);
}