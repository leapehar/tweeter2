$(document).ready(function() {
  // --- our code goes here ---
  const textArea = document.getElementById("tweet-text");



  textArea.addEventListener('keydown', function(event) {

    const output = $(this).next().find("output");
    let inputLength = $(this).val().length;

    let value = output.val();

    if (event.keyCode === 8 && inputLength > 0) {
      output.val(++value);
    } else if (event.keyCode !== 8 && inputLength > -1) {
      output.val(--value);
    }

    if (output.val() < 0) {
      output.addClass('negative-output');
    } else {
      output.removeClass('negative-output');
    }
  });
});




