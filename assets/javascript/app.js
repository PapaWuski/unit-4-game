var $pTag = $("<p>")
var $root = $(".container")
var $imgTag = $("<img>")

var char0 = {
    hp:20,
    atk:5,
    def:5
}
var char1 = {
    hp:20,
    atk:5,
    def:5
}
var char2 = {
    hp:20,
    atk:5,
    def:5
}
var char3 = {
    hp:20,
    atk:5,
    def:5
}


function createImages(num,target) {
    for (var i=0; i< num; i++ ){
        $imgTag = $("<img>")
        $($imgTag).attr("class", `img-thumbnail characters char${i}`);
        $($imgTag).attr("src", `https://picsum.photos/id/${i}/200`);
        $(target).append($imgTag);
    }
}
createImages(4)

function generateBoard(){
    for (let i = 0; i < 3; i++) {
        var $row = $("<div>")
        var $col = $("<div>")
        $($col).attr("class", `col-md-12`);
        if (i===0){
        createImages(4,$col)
        }
        $($row).attr("class", `row row${i}`);
        $($row).append($col);
        $($root).append($row);
    }

}

function moveChars() {
    
}

generateBoard()

$(document).on("click",".characters", function () {
    $("img").removeClass("characters");
    $(this).addClass("mainCharacter");
    $("img").not(this).addClass("enemy");
    $(".row1").append($(".enemy"));
});


$(document).on("click",".enemy", function () {
    $(".row2").append(this);
    $(this).addClass("currentTarget");
    $("img").not(this).removeClass("enemy");
});
