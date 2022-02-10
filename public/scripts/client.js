
// implementing $(document).ready() function to ensure the DOM has loaded
$(document).ready(function() {
  // implementing escape function to prevent Cross-Site Scripting
  const escape = function(str) {
    let div = document.createElement("div");
    div.appendChild(document.createTextNode(str));
    return div.innerHTML;
  };

  //takes array of tweet objects and appends the to one another 
  const renderTweets = function(tweetData) {
    //looping through array of tweets
    for (let tweet of tweetData) {

      //calling createTweetElement for each tweet
      const $tweet = createTweetElement(tweet);
      //appending tweets to container
      $("#tweets-container").append($tweet);
    }
  };

  const loadTweets = function() {
    $.ajax('/tweets', {method: 'GET'})
      .then(function(res, data) {
        //reversing the array so that the most recent tweet is on top
        res.reverse();
        $("#tweets-container").empty();
        //rendering the reversed array 
        renderTweets(res);
      });
  };

  // generates the DOM structure for a tweet and returns <article> element containing the tweet info
  const createTweetElement = function(tweetData) {
    //using timeahe to generate a timestamp for each tweet
    const timeStamp = timeago.format(tweetData.created_at);
    // storing the <article> element being generated in newTweet variable
    let newTweet = $(`
    <article class="tweet">
      <header>
        <div>
          <div class="userAvatar">
            <img src=${tweetData.user.avatars}>
          </div>
         <span class="userName">${tweetData.user.name}</span>
        </div>
        <span class="userHandle">${tweetData.user.handle}</span>
      </header>  
      <div class="middle">
        <p>${escape(tweetData.content.text)}</p> 
      </div>  
      <footer> 
        <span>${timeStamp}</span>
        <span class="tweetIcons">
          <i class="fas fa-flag"></i>
          <i class="fas fa-retweet"></i>
          <i class="fas fa-heart"></i>
        </span>
      </footer>
    </article>`);
    return newTweet;
  };

  // event handing on submit event:
  $("#tweetForm").submit(function(event) {
    event.preventDefault();
    const formContent = $(this).serialize();
    //if the text area is empty show error message: "you must enter a tweet before submitting"
    if ($('textarea').val().length === 0) {
      $('.messageTooLongError').slideUp(1000);
      $('.messageNoLengthError').slideDown(1000);
      return;
    }
    // if the tweet is too long show error message: "your tweet is too long (140 character max)"
    if ($('textarea').val().length > 140) {
      $('.messageTooLongError').slideDown(1000);
      $('.messageNoLengthError').slideUp(1000);
      return;
    }
    $.post("/tweets", formContent)
      // once the data is saved (the tweet),  call loadTweets 
      .then(function(res, data) {
        $('textarea').val("");
        loadTweets();
      })
  });
  loadTweets();
});

