
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
  target: setTarget()
}

function setTarget(){
  return Math.floor((Math.random() * 100) + 1);
}

function newGame(e){
  GAME.running = true;
  GAME.target = setTarget();
  console.log(GAME.target);
  clearDisplays();
}

function endGame(){
  GAME.running = false;
  // disable all buttons except New
}

function clearDisplays(){
  sendFeedback('Make your Guess!');
  setGuessCount(0);
  setGuessList([]);
  resetGuessInput();
}

function resetGuessInput(){
  $('#userGuess').val('');
}

function setGuessCount(count){
  $('.game #count').text(count);
}

function setGuessList(guesses){
  if (guesses.length < 1){
    $('.game #guessList').html('');
  } else {
    guesses.forEach(function(guess){
      $('.game #guessList').append('<li>' + guess + '</li>');    
    });
  }
}

function submitGuess(e){
  e.preventDefault();
  var validatedGuess = validateGuess(parseInt($('#userGuess').val()));
  
  if (validatedGuess.error) {
    sendFeedback(validatedGuess.error);
  } else {
    evaluateGuess(validatedGuess.guess);
  }
  
  resetGuessInput();
}

function sendFeedback(msg){
  $('#feedback').text(msg);
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
  //check for win condition
  //add guess to list
  //send feedback
  sendFeedback('Must implement');
}