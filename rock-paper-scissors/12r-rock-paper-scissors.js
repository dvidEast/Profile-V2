let score = JSON.parse(localStorage.getItem('score')) || {
  wins: 0,
  losses: 0,
  ties: 0
};

updateScoreElement()

//function that determines result
function playGame(playerMove) {
  const computerMove = pickComputerMove()

  let result = ''; 
  
  //function body
  if (playerMove === 'scissors') {
    if (computerMove === 'rock') {
      result = 'You lose.';
    } else if (computerMove === 'paper') {
      result = 'You win.';
   } else if (computerMove === 'scissors') {
      result = 'Tie.';
    }  
  } else if (playerMove === 'paper') {
    if (computerMove === 'paper') {
      result = 'Tie.';
    } else if (computerMove === 'rock') {
      result = 'You win.';
    } else if (computerMove === 'scissors') {
      result = 'You lose.';
    }  
  } else if (playerMove === 'rock') {
    if (computerMove === 'rock') {
      result = 'Tie.';
    } else if (computerMove === 'scissors') {
      result = 'You win.';
    } else if (computerMove === 'paper') {
      result = 'You lose.';
    }  
  }

  //update the score
  if (result === 'You win.') {
    score.wins += 1;
  } else if (result === 'You lose.') {
    score.losses += 1;
  } else if (result === 'Tie.') {
    score.ties += 1;
  }

  //put in local storage
  localStorage.setItem('score', JSON.stringify(score));

  updateScoreElement();

  document.querySelector('.js-result')
    .innerHTML = result;

  document.querySelector('.js-moves')
    .innerHTML = `You
<img class="move-icon" src="${playerMove}.jpeg">
VS
<img class="move-icon" src="${computerMove}.jpeg">
Computer}`;
}

function updateScoreElement() {
  //makes sure to update whenever we call function
  document.querySelector('.js-score')
    .innerHTML = `Wins: ${score.wins}, Losses: ${score. losses}, Ties: ${score.ties}`
}

 //function to generate a random move
 function pickComputerMove() {
  const randomNumber = Math.random();

  let computerMove = '';

  if (randomNumber >= 0 && randomNumber < 1/3) {
    computerMove = 'rock';
  } else if (randomNumber >= 1/3 && randomNumber < 2/3) {
    computerMove = 'paper';
  } else if (randomNumber >= 2/3) {
    computerMove = 'scissors';
  }

  return computerMove;
};

let isAutoPlaying = false;
let intervalId;

//const autoPlay = () => {

//}
// we could use this but it's visually more easier to read the function below and it also allows hoisting so we don't need to worry about the order (since we're call the function as a variable and not our shortened form)

function autoPlay() {
  if (!isAutoPlaying) {
    intervalId = setInterval(() => {
      const playerMove = pickComputerMove();
  
      playGame(playerMove);
    }, 1000);
    isAutoPlaying = true;
    
    document.querySelector('.js-auto-play-button').innerHTML = 'Stop Playing';
  } else {
    clearInterval(intervalId);
    isAutoPlaying = false;

    document.querySelector('.js-auto-play-button').innerHTML = 'Auto Play';
  }
}

// event listener for 'a', then will start playing

document.body.addEventListener('keydown', event => {
  if (event.key === 'a') {
    autoPlay();
  }  
});

 
//onclick attributes for rock, paper, scissors playerMove and reset button and autoplay button
document.querySelector('.js-rock-button').addEventListener('click', () => {
  playGame('rock');
});

document.querySelector('.js-paper-button').addEventListener('click', () => {
  playGame('paper');
});

document.querySelector('.js-scissors-button').addEventListener('click', () => {
  playGame('scissors');
});

document.querySelector('.js-auto-play-button').addEventListener('click', () => {
  autoPlay();
});

document.body.addEventListener('keydown', (event) => {
  if (event.key === 'r') {
    playGame('rock');
  } else if (event.key === 'p') {
    playGame('paper');
  } else if (event.key === 's') {
    playGame('scissors');
  }
});

// all our pleasant reset score shit

// produces reset score confirmation
document.querySelector('.js-reset-score-button').addEventListener('click', () => {
  document.querySelector('.js-reset-confirmation').innerHTML = `<p class="confirmation-title">Are you sure you want to reset the score?</p>
  <button class="confirmation-button js-confirmation-button-yes">Yes</button>
  <button class="confirmation-button js-confirmation-button-no">No</button>`;
  // make the buttons interactive
  document.querySelector('.js-confirmation-button-yes').addEventListener('click', () => {
    document.querySelector('.js-reset-confirmation').innerHTML = '';
    resetScore();
  });

  document.querySelector('.js-confirmation-button-no').addEventListener('click', () => {
    document.querySelector('.js-reset-confirmation').innerHTML = '';
  }); 
});

function resetScore() {
  document.querySelector('.js-reset-score-button').addEventListener('click', () => {
    score.wins = 0;
    score.losses = 0;
    score.ties = 0;
    localStorage.removeItem('score');
    updateScoreElement();
  });
}

// event listener for 'backspace'

document.addEventListener('keydown', event => {
  if (event.key === 'Backspace') {
    score.wins = 0;
    score.losses = 0;
    score.ties = 0;
    localStorage.removeItem('score');
    updateScoreElement();
  }
})
