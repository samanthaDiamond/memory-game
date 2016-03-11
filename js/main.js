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
      shuffledImages = this.shuffle(shuffledImages);
      var $row = $("<div>").addClass("rows" + j);
      $('.container').append($row);
      for (var k = 1; k <= columns; k++) {

        var $flipContainer = $("<div>").addClass('box').addClass("flip-container");
        var $flipper = $("<div>").addClass("flipper");
        var $front = $("<div>").addClass("front");
        var $back = $("<div>").addClass("back");

        $row.append($flipContainer);
        $flipContainer.append($flipper);

        $flipper.append($back);
        var $backImg = $("<img>").attr("src", shuffledImages[k-1]).addClass('inactive');
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

  checkIfPair : function ( el ) {
    if (this.compareImages.length === 2) {
      if (this.compareImages[0] === this.compareImages[1]) {
        console.log("pair");
        this.playerscore++;
        var correctImages = $(".flip-container.flip").find("img[src='" + game.compareImages[0] + "']");

        for (var i = 0; i < correctImages.length; i++) {
          var $currentImage = correctImages.eq(i);
          $currentImage.removeClass('inactive');
          $currentImage.parent().parent().parent().addClass("active");
        }

        this.compareImages = [];
        this.winner();

      } else {
        var flippedImgs = $(".flip")
        console.log("not a pair");
        $(".flip:not(.active)").removeClass("flip");
        this.compareImages = [];
      }

    }
    if (this.compareImages[1] && this.compareImages[0].attr('src') === this.compareImages[1].attr('src')) {
      console.log("pair");
      this.playerScore++;
      this.compareImages = [];

    } else if (this.compareImages.length === 2) {
      console.log("not pair");
      this.compareImages = [];
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
  game.drawBoard(2, 5);
});

$(document).ready(function () {
  $(".flip-container").on("click", function () {
    this.classList.toggle("flip");
    var imageName = $(this).find('img').attr("src");
    console.log(imageName);
    game.compareImages.push( imageName );
    game.checkIfPair( $(this) );
  })
});
