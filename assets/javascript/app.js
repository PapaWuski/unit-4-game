var $pTag = $("<p>");
var $root = $(".container");
var $btn = $("<button>");
var $row = $("<div>");
var $col = $("<div>");
var char = {
  0: {
    name: "asdf",
    hp: 20,
    atk: 5,
    def: 5
  },
  1: {
    name: "asdf2",
    hp: 20,
    atk: 5,
    def: 5
  },
  2: {
    name: "asdf3",
    hp: 20,
    atk: 5,
    def: 5
  },
  3: {
    name: "asd3",
    hp: 20,
    atk: 5,
    def: 5
  }
};

function createChar(num, target) {
  for (var i = 0; i < num; i++) {
    var $cardBody = $("<div>").addClass("card-body")
    var $cardName = $("<h3>");
    var $card = $("<div>");
    var $imgTag = $("<img>");
    $col = $("<div>")
    $($card).addClass(`card`);
    $($col).attr("class", `col-md-3 characters char${i}`);
    $($cardName).addClass("card-title");
    $($cardName).text(`${char[i].name}`);
    $($imgTag).attr("class", 'card-img-top');
    $($imgTag).attr("src", `https://picsum.photos/id/${i}/200`);
    $($cardBody).append($imgTag);
    $($cardBody).append($cardName);
    $($card).append($cardBody);
    $($col).append($card);
    $(target).append($col);

  }
}

function generateBoard() {
  for (var i = 0; i < 4; i++) {
    $row = $("<div>");
    if (i === 0) {
        createChar(4, $row);
    }
    $($row).attr("class", `row row${i}`);
    $($root).append($row);
  }
  $col = $("<div>")
  $($col).addClass("col-md-3");
  $($btn).addClass("attack btn-lg btn-primary btn m-1");
  $($btn).text("Attack!");
  $($col).append($btn);
  $(".row2").append($col);
  $($btn).hide();
}

generateBoard();

$(document).on("click", ".characters", function() {
    $(".characters")
      .not(this)
      .addClass("enemy");
  $(".characters").removeClass("characters");
  $(this).addClass("mainCharacter");
  $(".row1").append($(".enemy"));
  $(".enemy .card").addClass("bg-danger");
  $(".mainCharacter .card").addClass("bg-primary");
});

$(document).on("click", ".enemy", function() {
    $(".enemy")
      .not(this)
      .removeClass("enemy");
  $(".row3").append(this);
  $(this).addClass("currentTarget");
    $(".currentTarget .card").removeClass("bg-danger");
    $(".currentTarget .card").addClass("bg-warning");
  $($btn).show();
});
$(document).on("click","attack", function () {
    $(selector).val();
});