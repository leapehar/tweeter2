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
  const tweetData = [
    {
      user: {
        name: "Newton",
        avatars: "https://i.imgur.com/73hZDYK.png",
        handle: "@SirIsaac",
      },
      content: {
        text: "If I have seen further it is by standing on the shoulders of giants",
      },
      created_at: 1643618373314,
    },
    {
      user: {
        name: "Descartes",
        avatars: "https://i.imgur.com/nlhLi3I.png",
        handle: "@rd",
      },
      content: {
        text: "Je pense , donc je suis",
      },
      created_at: 1643704773314,
    },
  ];

  // renderTweets function
  // takes in an arary of tweets
  // appends each item in the array to #tweets-container
  // leverages createTweetElement function
  const renderTweets = function(tweetData) {
    for (let tweet of tweetData) {
      const $tweet = createTweetElement(tweet);
      $("#tweets-container").append($tweet);
    }
  };

  // createTweetElement function
  //takes in a tweet object and returns a tweet <article> element containing the entire HTML structure of the tweet.
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
    <p>${tweetData.content.text}</p>
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

  renderTweets(tweetData);

  $("#tweetForm").submit(function(event) {
    console.log("Handler for .submit() called.");
    event.preventDefault();
    const formContent = $(this).serialize();

    $.post("/tweets", formContent);

  });
});

