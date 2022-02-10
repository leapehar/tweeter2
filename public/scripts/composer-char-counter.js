// implementing $(document).ready() function to ensure the DOM has loaded
$(document).ready(function() {
  //accessing the textarea by getElementById("tweet-text")
  //storing that access point in textArea vairable 
  const textArea = document.getElementById("tweet-text");
  // adding an event listening to the text area to listen for the keydown event. ie. listen for then a key in the text area is pressed
  textArea.addEventListener('keydown', function(event) {

    const output = $(this).next().find("output");

    // getting the length of the input and storing it in inputLength variable
    let inputLength = $(this).val().length;
    //value stores the remaining number of characters allow as the user types, or by how many characters they have gone over the allotted character limit
    let value = output.val();
    console.log(value);
    // if keyCode === 8, ie. is the space bar is pressed, it is considered towards the character count
    if (event.keyCode === 8 && inputLength > 0) {
      output.val(++value);
    } else if (event.keyCode !== 8 && inputLength > -1) {
      output.val(--value);
    }
    // if the counter displays less than 0, add class negative-output 
    if (output.val() < 0) {
      output.addClass('negative-output');
      // if the counter displays less than 0, remove class negative-output 
    } else {
      output.removeClass('negative-output');
    }
  });
});




