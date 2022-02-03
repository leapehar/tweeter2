/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */

// function : createTweetElement 
//generates the DOM structure for a tweet
// takes tweet object
// returns <article> element containing the info 


$(document).ready(function() {

  const tweetData = {
    "user": {
      "name": "Newton",
      "avatars": "https://i.imgur.com/73hZDYK.png",
      "handle": "@SirIsaac"
    },
    "content": {
      "text": "If I have seen further it is by standing on the shoulders of giants"
    },
    "created_at": 1461116232227
  }

  const createTweetElement = function(tweetObj) {

    const newTweet =
      $(`<article class="tweet">
      <header>
      <div>

        <div class="userAvatar">
          <img src=${tweetObj.user.avatars}>
        </div>
        <span class="userName">${tweetObj.user.name}</span>

      </div>
        <span class="userHandle">${tweetObj.user.handle}</span>
      </header>

      <div class="middle">
        <p>${tweetObj.content.text}</p>
      </div>

      <footer>

        <span>${tweetObj.created_at}</span>
        <span class="tweetIcons">
          <i class="fas fa-flag"></i>
          <i class="fas fa-retweet"></i>
          <i class="fas fa-heart"></i>
        </span>

      </footer>
      </article>`);

    return newTweet;

  }


  const $tweet = createTweetElement(tweetData);

  console.log($tweet);
  $('#tweets-container').append($tweet);

});