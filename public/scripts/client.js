

$(document).ready(function() {


  const escape = function(str) {
    let div = document.createElement("div");
    div.appendChild(document.createTextNode(str));
    return div.innerHTML;
  };


  const renderTweets = function(tweetData) {
    for (let tweet of tweetData) {
      const $tweet = createTweetElement(tweet);
      $("#tweets-container").append($tweet);
    }
  };

  const loadTweets = function() {
    $.ajax('/tweets', {method: 'GET'})
      .then(function(res) {
        renderTweets(res);
      });
  };

  const createTweetElement = function(tweetData) {
    const timeStamp = timeago.format(tweetData.created_at);

    let newTweet = $(`<article class="tweet">
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


  $("#tweetForm").submit(function(event) {
    event.preventDefault();
    const formContent = $(this).serialize();

    if ($('textarea').val().length === 0) {
      $('.messageTooLongError').slideUp(1000);
      $('.messageNoLengthError').slideDown(1000);
      return;
    }

    if ($('textarea').val().length > 140) {
      $('.messageTooLongError').slideDown(1000);
      $('.messageNoLengthError').slideUp(1000);
      return;

    }

    $.post("/tweets", formContent);

    $.ajax('/tweets', {method: 'POST'})
      .then(function(res) {
        renderTweets(res);
      });
  });

  loadTweets();
});

