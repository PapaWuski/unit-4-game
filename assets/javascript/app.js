var char = {
  0: {
    name: "Char1",
    hp: 50,
    atk: 5,
    def: 5
  },
  1: {
    name: "Char2",
    hp: 20,
    atk: 5,
    def: 5
  },
  2: {
    name: "Char3",
    hp: 20,
    atk: 5,
    def: 5
  },
  3: {
    name: "Char4",
    hp: 20,
    atk: 5,
    def: 5
  }
};

function createChar(num, target) {
  var $col = $("<div>");
  for (var i = 0; i < num; i++) {
    var $cardBody = $("<div>").addClass("card-body");
    var $cardName = $("<h3>");
    var $card = $("<div>");
    var $imgTag = $("<img>");
    var $cardText = $("<p>");
    $col = $("<div>");
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
      console.log("youwin"); // place function for victory
    }
    return null;
  }
  playerHealth -= enemyAttack;
  $(".mainCharacter .health").text(playerHealth);
  if (playerHealth <= 0) {
    $(".container").empty(); //place function for losing
    generateBoard();
    return null;
  }
  $(".mainCharacter .card-text").attr("atk",playerAttack+=playerBoost);
  console.log(playerAttack)
});

$(document).on("click", "reset", function() {});
