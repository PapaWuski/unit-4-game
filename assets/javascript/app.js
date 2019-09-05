var char = {
  0: {
    name: "Obi-Wan Kenobi",
    hp: 120,
    atk: 8,
    def: 8
  },
  1: {
    name: "Luke Skywalker",
    hp: 100,
    atk: 5,
    def: 5
  },
  2: {
    name: "Darth Sidus",
    hp: 150,
    atk: 20,
    def: 20
  },
  3: {
    name: "Darth Maul",
    hp: 180,
    atk: 25,
    def: 25
  }
};

function createChar(num, target) {
  for (var i = 0; i < num; i++) {
    var $col = $("<div>");
    var $cardBody = $("<div>").addClass("card-body");
    var $cardName = $("<h3>");
    var $card = $("<div>");
    var $imgTag = $("<img>");
    var $cardText = $("<p>");
    $($card).addClass(`card`);
    $($col).attr("class", `col-md-3 characters char${i}`);

    $($cardName).addClass("card-title");
    $($cardName).text(`${char[i].name}`);

    $($imgTag).attr("class", "card-img-top");
    $($imgTag).attr("src", `https://picsum.photos/id/${i}/200`);

    $($cardText).addClass("card-text");
    $($cardText).append(`HP: <span class="health" >${char[i].hp}</span>`);
    $($cardText).attr("atk", `${char[i].atk}`);
    $($cardText).attr("atkBoost", `${char[i].atk}`);
    $($cardText).attr("def", `${char[i].def}`);

    $($cardBody).append($imgTag);
    $($cardBody).append($cardName);
    $($cardBody).append($cardText);
    $($card).append($cardBody);
    $($col).append($card);
    $(target).append($col);
  }
}

function generateBoard() {
  var $root = $(".container");
  var $btn = $("<button>");
  var $row = $("<div>");
  for (var i = 0; i < 4; i++) {
    $row = $("<div>");
    if (i === 0) {
      createChar(4, $row);
    }
    $($row).attr("class", `row row${i}`);
    $($root).append($row);
  }
  $col = $("<div>");
  $btn = $("<btn>");
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
    .addClass("standby")
    .removeClass("enemy");

  $(".enemy").not(this);

  $(".row3").append(this);
  $(this).addClass("currentTarget");
  $(".currentTarget .card").removeClass("bg-danger");
  $(".currentTarget .card").addClass("bg-warning");
  $(".attack").show();
});

$(document).on("click", ".attack", function() {
  let playerAttack = parseInt($(".mainCharacter .card-text").attr("atk"));
  let playerHealth = parseInt($(".mainCharacter .health").text());
  const enemyAttack = parseInt($(".currentTarget .card-text").attr("def"));
  let enemyHealth = parseInt($(".currentTarget .health").text());
  const playerBoost =parseInt($(".mainCharacter .card-text").attr("atkBoost"));
  enemyHealth -= playerAttack;
  $(".currentTarget .health").text(enemyHealth);
  if (enemyHealth <= 0) {
    $(".currentTarget").attr("class", "dead");
    $(".dead").hide();
    $(".standby")
      .addClass("enemy")
      .removeClass("standby");
    $(".mainCharacter .card-text").attr("atk",playerAttack+=playerBoost);
    $(".attack").hide();
    const remainingEnemies = $(".enemy").length + $(".standby").length;
    if (!remainingEnemies) {
      gameOver("Win")
    }
    return null;
  }
  playerHealth -= enemyAttack;
  $(".mainCharacter .health").text(playerHealth);
  if (playerHealth <= 0) {
    gameOver("Lose")
  }
  $(".mainCharacter .card-text").attr("atk",playerAttack+=playerBoost);
  console.log(playerAttack)
});

function gameOver(gameState){
  $(".container").empty();
  
  $(".container").empty();
  for (let i = 0; i < 2; i++) {
    var $row = $("<div>")
    $($row).addClass("row");
    var $col = $("<div>")
    $($col).addClass("col-md-12 text-center my-5");
    
    var $text =  $("<h1>")
    var $btn = $("<button>")
    if (i === 0){
      $($text).text(`You ${gameState}!`);
      $($col).append($text);
    } else {
      $($btn).text("Restart?");
      $($btn).addClass(" btn-lg btn-primary btn reset");
      $($col).append($btn);
    }
    $(".container").append($col);

    
  }
}

$(document).on("click", ".reset", function() {

  $(".container").empty();
  generateBoard();
});
