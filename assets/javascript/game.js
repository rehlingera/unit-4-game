window.onload = function () {
    
$("#charAreaTitle").html("<br/><div class=col-md-12><h1 style='align: center'>W E L C O M E</h1><p>(Press Any Key to Play<p></div>")

var playGame = function () {

    var playerPicked = false;
    var playerHealth = 0;
    var playerAttack = 0;
    var playerNewAttack = 0;
    var playerId = 0;
    var playerHealthBar=100;
    var enemyHealth = 0;
    var enemyAttack = 0;
    var enemyId = 0;
    var enemyHealthBar=100;
    var winRounds=0;
    var newPlayerHealthBar = "";
    var newEnemyHealthBar = "";
    var characters = [
        {name: "Aragorn",
        healthPoints: 150,
        attackPower: 5,
        counterAttack: 7,
        waitPic: "assets/images/AragornWait.png",
        fightPic: "assets/images/AragornFight.png",
        defeatPic: "assets/images/AragornDefeat.png"},
        {name: "Arwen",
        healthPoints: 140,
        attackPower: 6,
        counterAttack: 8,
        waitPic: "assets/images/ArwenWait.png",
        fightPic: "assets/images/ArwenFight.png",
        defeatPic: "assets/images/ArwenDefeat.png"},
        {name: "Gollum",
        healthPoints: 180,
        attackPower: 4,
        counterAttack: 6,
        waitPic: "assets/images/GollumWait.png",
        fightPic: "assets/images/GollumFight.png",
        defeatPic: "assets/images/GollumDefeat.png"},
        {name: "Eowyn",
        healthPoints: 120,
        attackPower: 8,
        counterAttack: 10,
        waitPic: "assets/images/EowynWait.png",
        fightPic: "assets/images/EowynFight.png",
        defeatPic: "assets/images/EowynDefeat.png"},
        {name: "Lurtz",
        healthPoints: 130,
        attackPower: 7,
        counterAttack: 9,
        waitPic: "assets/images/LurtzWait.png",
        fightPic: "assets/images/LurtzFight.png",
        defeatPic: "assets/images/LurtzDefeat.png"},
        {name: "Treebeard",
        healthPoints: 100,
        attackPower: 10,
        counterAttack: 12,
        waitPic: "assets/images/TreebeardWait.png",
        fightPic: "assets/images/TreebeardFight.png",
        defeatPic: "assets/images/TreebeardDefeat.png"},
];
    
    $("#charAreaTitle").html("<h2>Characters</h2><div class='row' id='charArea'></div>");
    $("#playerArea").empty();
    $("#enemyArea").empty();
    $("#defeatedArea").empty();

    for (i = 0; i < characters.length; i++) {
        $("#charArea").append(
            "<div class = 'col-md-2 charPick' id='p" + i + "'><div class = 'charPickBack' id = " + i + "><img src = " + characters[i].waitPic + " alt = " + characters[i].name + "><h4 class = 'charPickName'>" + characters[i].name + "</h4></div>");
    };    
    
    var characterPick = function () {
        if (playerPicked === false) {
            var i = this.id
            console.log (i);
            $("#p" + i).empty();
            $(".charPickBack").attr("class","enemyPickBack");
            $("#playerArea").append(
                "<div id=" + i + " class='charPickBack' style='width:100%'><img id='playerImg' src = " + characters[i].fightPic + " alt = " + characters[i].name + "><div id='healthBar"+[i] +"' style='width: "+playerHealthBar+"%; height: 10px; background-color: RGBA(150,0,0,1)'></div><h4 class='playerPickName'>" + characters[i].name + "</h4></div>");
            $(".charPickName").css("color","RGBA(255,255,255,1)");
            playerHealth = characters[i].healthPoints;
            playerAttack = characters[i].attackPower;
            playerNewAttack = playerAttack;
            playerId = this.id
            console.log ("Stats: " + playerHealth + " " + playerAttack)
            playerPicked = true}

        else if (playerPicked === true) {
            var i = this.id;
            enemyHealthBar = 100;
            console.log (i);
            $("#p" + i).empty();
            $(".enemyPickBack").off("click");
            $("#enemyArea").append(
                "<div id=" + i + " class='enemyPickBack' style='width: 100%'><img id='enemyImg' src = " + characters[i].fightPic + " alt = " + characters[i].name + "><div id='healthBar"+[i]+"' style='width: "+enemyHealthBar+"%; height: 10px; background-color: RGBA(150,0,0,1)'></div><h4 class='enemyPickName'>" + characters[i].name + "</h4></div>");
            enemyHealth = characters[i].healthPoints;
            enemyAttack = characters[i].counterAttack;
            enemyId = this.id;
            $("#attackButton").on("click", attack);
            console.log ("Stats: " + enemyHealth + " " + enemyAttack);
        };
    };

    $(".charPickBack").on("click", characterPick);
    $(".enemyPickBack").on("click", characterPick);

    var attack = function() {
        $("#playerHit").html("<h4 id='playerHitNumber' style='color:RGBA(255,255,255,1); position:relative; top: 30%'>-" + enemyAttack + "</h4>");
        $("#playerHitNumber").animate({
            opacity: 0,
            top: "-=50",
        }, 1000, function() {
        });
        $("#enemyHit").html("<h4 id='enemyHitNumber' style='color:RGBA(255,255,255,1); position:relative; top: 30%'>-" + playerNewAttack + "</h4>");
        $("#enemyHitNumber").animate({
            opacity: 0,
            top: "-=50",
        }, 1000, function() {
        });
        playerHealth = playerHealth-enemyAttack;
        enemyHealth = enemyHealth-playerNewAttack;
        playerNewAttack = playerAttack + playerNewAttack;
        playerHealthBar = playerHealth/characters[playerId].healthPoints;
        enemyHealthBar = enemyHealth/characters[enemyId].healthPoints;
        newPlayerHealthBar = playerHealthBar*100+"%";
        newEnemyHealthBar = enemyHealthBar*100+"%";
        $("#healthBar"+playerId).css("width",newPlayerHealthBar);
        $("#healthBar"+enemyId).css("width",newEnemyHealthBar);
        
              

        console.log (playerId);
        console.log ("Player health bar: "+newPlayerHealthBar);
        console.log ("Player stats: "+playerHealth+" "+playerNewAttack);
        console.log ("Enemy stats: "+enemyHealth+" "+enemyAttack);

        if (enemyHealth <= 0) {
            $("#enemyArea").empty();
            $("#defeatedArea").append(
                "<div class = 'col-md-2 defeated' id = " + enemyId + "><div class = 'charPickBack'><img src = " + characters[enemyId].defeatPic + " alt = " + characters[enemyId].name + "><h4 class = 'charPickName'>" + characters[enemyId].name + "</h4></div></div>");
            $("#attackButton").off("click");
            $(".enemyPickBack").on("click", characterPick);
            winRounds++
        }

        if (playerHealth <= 0) {
            $("attackButton").off("click");
            $("#playerImg").attr("src",characters[playerId].defeatPic);
            $("#charAreaTitle").empty();
            $("#charAreaTitle").html("<br/><div class=col-md-12><h1 style='align: center'>Y O U &nbsp L O S E</h1><p>(Press Any Key to Play Again)</p><div>");
        }

        if (winRounds===5) {
            $("attackButton").off("click");
            $("#charAreaTitle").empty();
            $("#charAreaTitle").html("<br/><div class=col-md-12><h1 style='align: center'>Y O U &nbsp W I N</h1><p>(Press Any Key to Play Again)</p><div>");  
        }
          
    };

};

document.onkeyup = function() {
    playGame();
};

};