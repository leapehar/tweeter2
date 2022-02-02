$(document).ready(function() {
  // --- our code goes here ---
  const textArea = document.getElementById("tweet-text");

  // 

  textArea.addEventListener('keydown', function(event) {
    // 0, 1, 2, 1, 0
    const output = $(this).next().find("output");
    let inputLength = $(this).val().length;

    // if ($(this).val().length == 0) {
    //   value = $(this).next().find("output").val();
    // }
    // ''
    let value = output.val();
    // 140, 140
    if (event.keyCode === 8 && inputLength > 0) {
      output.val(++value); // 138 + 1 = 139  
    } else if (event.keyCode !== 8 && inputLength > -1) {
      output.val(--value); // 140 - 1; ( 139)
      // 139 - 1 (138)
    }

    if (output.val() < 0) {
      output.addClass('negative-output');
    } else {
      output.removeClass('negative-output');
    }

  });


});




