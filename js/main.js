/*
PLAN:
1 box structure
2 click function
3 JS:
  Psuedo code:
    - randomly shuffle frontImages
    - when square clicked, show image
    - if pairs match, remove from game (blur)
    - if no pair, flip over again
    - when all pairs found count each players num of pairs and player with highest no. pairs wins
    - random shuffle sqaures for new game
  Code structure:
    Obj:
    - game

      Methods:
      - randomShuffle
        im stuggling to work out how to shuffle images

      - playerMove
          input: row, col, player
          rtn: null

      - checkIfPair
          input: null
          rtn: true or false
          ? determine via comparing image class (e.g. .img1 = .img1, .img2 = .img2)
          if pair add point to player1Score/player2Score variables (will need to include in obj) - should I include this in this function or somewhere else.
          And if i include it here should i have player as input?

      -  winner
          input: player1Score, player2Score
          rtn: winn
          ? count total possible pairs and when player1Score + player2Score = total no pairs game over. Compare player1Score and player2Score to decide winner.
          If equal pairs, its a draw.
          Then randomShuffle board again

      Remember:
      player moves twice per turn - if 1 click do nothing, only check on second function
      cant select same img for both turns
      if pair remove from play (can no longer click)
*/


var game = {
  frontImages : ['css/images/panda.jpg', 'css/images/leopard.jpg', 'css/images/baby_orangutan.jpg', 'css/images/Animal-Planets-3.jpg', 'css/images/bee.jpg', 'css/images/bird.jpg', 'css/images/butterfly.jpg', 'css/images/cute.jpg', 'css/images/girraff.jpg', 'css/images/harp-seal-baby.jpg', 'css/images/hummingbird.jpg', 'css/images/kaisers_spotted_newt.jpg', 'css/images/koala.jpg', 'css/images/ng.jpg', 'css/images/turtle.jpg', 'css/images/zebra.jpg'],
  compareImages : [],
  imgForGame : [],
  playerScore: 0,

  drawBoard: function (rows, columns) {
    var numImages = rows * columns / 2;
    for (var i = 0; i < numImages; i++) {
      this.imgForGame.push( this.frontImages[i] );
    }
    var shuffledImages = this.shuffle( this.imgForGame );
    for (var j = 1; j <= rows; j++) {
      // shuffle images
      shuffledImages = this.shuffle(shuffledImages);
      // create row
      var $row = $("<div>").addClass("rows" + j);
      $('.container').append($row);
      // create columns
      for (var k = 1; k <= columns; k++) {

        var $flipContainer = $("<div>").addClass('box').addClass("flip-container");
        var $flipper = $("<div>").addClass("flipper");
        var $front = $("<div>").addClass("front");
        var $back = $("<div>").addClass("back");

        $row.append($flipContainer);
        $flipContainer.append($flipper);

        $flipper.append($back);
        var $backImg = $("<img>").attr("src", shuffledImages[k-1]);
        $back.append($backImg);

        $flipper.append($front);
        var $frontImg = $("<img>").attr("src", 'css/images/background.jpg');
        $front.append($frontImg);

      }
    }
  },

  shuffle : function (array) {
    return array.sort(function () {
      return 0.5 - Math.random();
    });

  },
  playerMove : function (img, player) {
    this.frontImages[img] = player;
  },

  // // attempt
  // playerTurn : function() {
  //   var cardSelection = 0;
  //   var totalPlayerTurns = 0
  //   if (cardSelection === 2) {
  //     totalPlayerTurns++;
  //     cardSelection = 0;
  //
  //     //on click cardSelection++
  //   };
  //   if (totalPlayerTurns % 2 !== 0) {
  //     return player1 = player;
  //     console.log("player1")
  //   } else {
  //     return player2 = player;
  //     console.log("player2")
  //   }
  // },

  checkIfPair : function () {
    if (this.compareImages.length === 2) {
      if (this.compareImages[0] === this.compareImages[1]) {
        console.log("pair");
        this.playerscore++;
        this.compareImages = [];
      } else {
        var flippedImgs = $(".flip")
        for (flippedImg in flippedImgs) {
          if (flippedImg === )
        }
        console.log("not a pair");
        $(".flip").removeClass("flip");
        this.compareImages = [];
      }

    }
    if (this.compareImages[1] && this.compareImages[0].attr('src') === this.compareImages[1].attr('src')) {
      console.log("pair");
      this.playerScore++;
      // this.compareImages[0].removeClass("inactive").addClass("active");
      // this.compareImages[1].removeClass("inactive").addClass("active");
      this.compareImages = [];
    } else if (this.compareImages.length === 2) {
      console.log("not pair");
      this.compareImages = [];
      // $(".box img.inactive").delay(600).fadeOut(500);
      $(".flip-container").delay(600).fadeOut(500);
    } else {
      return;
    }
  },
  winner : function () {
    if ($(".inactive").length === 0) {
      swal("Game over", "Ready for another game?");
    }
  }
};

$(document).ready(function () {
  game.drawBoard(2, 4);
});

$(document).ready(function () {
  $(".flip-container").on("click", function () {
    this.classList.toggle("flip");

    // delay
    var imageName = $(this).find('img').attr("src");
    console.log(imageName);
    game.compareImages.push( imageName );

    game.checkIfPair();
    // game.winner(); THIS NEEDS WORK
  })
});
