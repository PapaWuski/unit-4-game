var $pTag = $("<p>");
var $root = $(".container");
var $btn = $("<button>");
var $row = $("<div>");
var $col = $("<div>");
var char = {
  0: {
    name: "asdf",
    hp: 50,
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
    var $cardText = $("<p>")
    $col = $("<div>")
    $($card).addClass(`card`);
    $($col).attr("class", `col-md-3 characters char${i}`);

    $($cardName).addClass("card-title");
    $($cardName).text(`${char[i].name}`);

    $($imgTag).attr("class", 'card-img-top');
    $($imgTag).attr("src", `https://picsum.photos/id/${i}/200`);

    $($cardText).addClass("card-text");
    $($cardText).text(`${char[i].hp}`);
    $($cardText).attr("atk",`${char[i].atk}`);
    $($cardText).attr("def",`${char[i].def}`);

    $($cardBody).append($imgTag);
    $($cardBody).append($cardName);
    $($cardBody).append($cardText);
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
  $btn = $("<btn>")
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
      .not(this).addClass("standby").removeClass("enemy");
      
    $(".enemy")
      .not(this);

  $(".row3").append(this);
  $(this).addClass("currentTarget");
    $(".currentTarget .card").removeClass("bg-danger");
    $(".currentTarget .card").addClass("bg-warning");
  $(".attack").show();
});

$(document).on("click",".attack", function () {
    let playerAttack = $(".mainCharacter .card-text").attr("atk");
    let playerHealth = $(".mainCharacter .card-text").text();
    const enemyAttack = $(".currentTarget .card-text").attr("def");
    let enemyHealth = $(".currentTarget .card-text").text();
    enemyHealth -= playerAttack;
    $(".currentTarget .card-text").text(enemyHealth);
    if (enemyHealth <= 0) {
      $(".currentTarget").attr("class","dead");
      $(".dead").hide();
      $(".standby").addClass("enemy").removeClass("standby");
      const remainingEnemies = $(".enemy").length + $(".standby").length;
      if (!remainingEnemies){
        console.log("youwin")
      }
      return null
    }
    playerHealth -= enemyAttack;
    $(".mainCharacter .card-text").text(playerHealth);
    if (playerHealth <= 0) {
      $(".container").empty();
      generateBoard()
      return null
    }

});

$(document).on("click","reset", function () {
  
});