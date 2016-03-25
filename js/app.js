
$(document).ready(function(){
	
	/*--- Display information modal box ---*/
  	$(".what").click(function(){
    	$(".overlay").fadeIn(1000);

  	});

  	/*--- Hide information modal box ---*/
  	$("a.close").click(function(){
  		$(".overlay").fadeOut(1000);
  	});

});

function newGame(){
  
}

function makeGuess(e){
  e.preventDefault();
  var userGuess = parseInt($('#userGuess').val());
  var validatedGuess = validateGuess(userGuess);
  
  if (validatedGuess.error) {
    sendFeedback(validatedGuess.error);
  } else {
    sendFeedback('implement ' + validatedGuess.num);
  }
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
    res.num = userGuess;
  }
  return res;
}

/************
 * Listeners
 ************/
 
 $('#guessButton').click(makeGuess);