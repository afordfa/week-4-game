$(document).ready(function() {

	// VARIABLES ----------------------------------------------

	var currentPlayer = "";
	var opponent = "";
	var playerSelected = false;
	var opponentSelected = false;
	var gameOver = "no";
	var opponentsRemaining = 2;
	var opponentIndex = 0;

	var playerOne = generatePlayer("Hermione Granger", 1, 8, 8, 180,  180, 20, "assets/images/hermione.jpg");
	var playerTwo = generatePlayer("Luna Lovegood", 2, 6, 6, 120,  120, 5, "assets/images/luna.jpg");
	var playerThree = generatePlayer("Ginny Weasley", 3, 7, 7, 100,  100, 13, "assets/images/ginny.jpg");
	var playerFour = generatePlayer("Bellatrix Lestrange",  4, 5, 5, 150,  150, 25, "assets/images/bellatrix.jpg");
	var players = [playerOne, playerTwo, playerThree, playerFour];
	var availableOpponents = [playerOne, playerTwo, playerThree, playerFour];
	var currentPlayer = {};



	// FUNCTIONS ----------------------------------------------

	function displayCurrentPlayer() {
		$(".addCurrentPlayer").empty();
		$(".addCurrentPlayer").append("<p class = \"name\">" + currentPlayer.name + "</p>");
		$(".addCurrentPlayer").append("<img src = \"" + currentPlayer.imgSource + "\" class = \"currentPlayer\">");
		$(".addCurrentPlayer").append("<p class = \"name\">" + currentPlayer.currentHP + "</p>");
	};


	function displayCurrentOpponent() {
		$(".addCurrentOpponent").empty();
		$(".addCurrentOpponent").append("<p class = \"name\">" + opponent.name + "</p>");
		$(".addCurrentOpponent").append("<img src = \"" + opponent.imgSource + "\" class = \"currentOpponent\">");
		$(".addCurrentOpponent").append("<p class = \"name\">" + opponent.currentHP + "</p>");
	};

	function displayStartingPlayers() {
		$(".playerBox1").empty();
		$(".playerBox2").empty();
		$(".playerBox3").empty();
		$(".playerBox4").empty();
		for (var i = 1; i <= players.length; i++) {
			$(".playerBox"+i).append("<p class = \"name\">" + players[i-1].name + "</p>");
			$(".playerBox"+i).append("<img src = " + players[i-1].imgSource + " class = \"characters\" data-index = " + i+ ">");
			$(".playerBox"+i).append("<p class = \"name\">" + players[i-1].currentHP + "</p>");
		}
	};

	function displayAvailableOpponents () {
		$(".opponentArea").empty();
		for (var i = 0; i < availableOpponents.length; i++) {
			var possibleOpponent = availableOpponents[i];
			var dataIndex = possibleOpponent.id;
			$(".opponentArea").append("<div class=\"col-md-2 text-center addOpponent" + (i+1) + "\">");
			$(".addOpponent"+(i+1)).append("<p class = \"name\">" + possibleOpponent.name + "</p>");
			$(".addOpponent"+(i+1)).append("<img src = " + possibleOpponent.imgSource + " class = \"characters opponents\" data-index = " + dataIndex + ">");
			$(".addOpponent"+(i+1)).append("<p class = \"name\">" + possibleOpponent.currentHP + "</p>");
		}
	}

	function generatePlayer (name, id, attackValue, currentAttack, startingHP, currentHP, counterValue, imgSource) {
		var player = {
			name: name,
			id:  id,
			attackValue: attackValue,
			currentAttack: currentAttack,
			startingHP: startingHP,
			currentHP: currentHP,
			counterValue: counterValue,
			imgSource: imgSource
		}
		return player;
	}

	function selectPlayer() {
		var selection = parseInt($(this).attr("data-index"));
		if(!playerSelected) {
			currentPlayer = players[selection-1];
			var indexToSplice = availableOpponents.indexOf(currentPlayer);
			availableOpponents.splice(indexToSplice, 1);
			playerSelected = true;
			displayCurrentPlayer();
			$(".playerBox1").empty();
			$(".playerBox2").empty();
			$(".playerBox3").empty();
			$(".playerBox4").empty();
			displayAvailableOpponents();
		} else if (!opponentSelected) {
			opponent = players[selection-1];
			var indexToSplice = availableOpponents.indexOf(opponent);
			availableOpponents.splice(indexToSplice, 1);
			opponentSelected = true;
			displayCurrentOpponent();
			displayAvailableOpponents();
		}
	};

	function describeAttack () {
		if (gameOver === "lost") {
			$(".fightDescription").empty();
			$(".fightDescription").append("<p>You attacked " + opponent.name + " for " + currentPlayer.currentAttack + " damage.</p>");
			$(".fightDescription").append("<p>" + opponent.name + " attacked you back for " + opponent.counterValue + " damage.</p>");
			$(".fightDescription").append("<p>You have been defeated.");
			$(".buttonArea").append("<button class = \"btn btn-default restart\">Play Again</button>");
		} else if (gameOver === "won") {
			$(".fightDescription").empty();
			$(".fightDescription").append("<p>You attacked " + opponent.name + " for " + currentPlayer.currentAttack + " damage.</p>");
			$(".fightDescription").append("<p>" + opponent.name + " attacked you back for " + opponent.counterValue + " damage.</p>");
			$(".fightDescription").append("<p>You have conquered all your opponents.");
			$(".buttonArea").append("<button class = \"btn btn-default restart\">Play Again</button>");
		} else if ((currentPlayer.currentHP > 0) && (opponent.currentHP > 0)) {
			$(".fightDescription").empty();
			$(".fightDescription").append("<p>You attacked " + opponent.name + " for " + currentPlayer.currentAttack + " damage.</p>");
			$(".fightDescription").append("<p>" + opponent.name + " attacked you back for " + opponent.counterValue + " damage.</p>");
		} else if ((gameOver === "no") && (opponent.currentHP <= 0)) {
			$(".fightDescription").append("<p>You defeated " + opponent.name + ". Pick another opponent </p>");
		}
	};

	function attack(player, opponent) {
		if(gameOver === "no") {
			opponent.currentHP -= player.currentAttack;
			if ((opponentsRemaining > 0) && (opponent.currentHP <= 0)) {
				displayCurrentPlayer();
				displayCurrentOpponent();
				describeAttack();
				opponentSelected = false;
				opponentsRemaining--;
				console.log(gameOver);
			} else if ((opponentsRemaining == 0) && (opponent.currentHP <= 0)) {
					gameOver = "won"
					describeAttack();
					console.log(gameOver);
			} else {
				player.currentHP -= opponent.counterValue;
				displayCurrentPlayer();
				displayCurrentOpponent();
				describeAttack();
				if (player.currentHP <= 0) {
					gameOver = "lost";
					describeAttack();
				console.log(gameOver);
				} else {
					player.currentAttack += player.attackValue;
				}
			}
		}
	}



	// CLICK HANDLERS----------------------------------------------

	$(".attack").on("click", function() {
		
		if (!playerSelected) {
			$(".fightDescription").empty();
			$(".fightDescription").append("<p>Select a player!</p>");
		} else if (!opponentSelected) {
			$(".fightDescription").empty();
			$(".fightDescription").append("<p>Select an opponent!</p>");
		} else {
			attack(currentPlayer, opponent);
		}
	});


	$(".restart").on("click", function() {
		console.log("clicked");
		currentPlayer = "";
		opponent = "";
		playerSelected = false;
		opponentSelected = false;
		gameOver = "no";
		opponentsRemaining = 2;
		opponentIndex = 0;
		playerOne = generatePlayer("Hermione Granger", 1, 8, 8, 180,  180, 20, "assets/images/hermione.jpg");
		playerTwo = generatePlayer("Luna Lovegood", 2, 6, 6, 120,  120, 5, "assets/images/luna.jpg");
		playerThree = generatePlayer("Ginny Weasley", 3, 7, 7, 100,  100, 13, "assets/images/ginny.jpg");
		playerFour = generatePlayer("Bellatrix Lestrange",  4, 5, 5, 150,  150, 25, "assets/images/bellatrix.jpg");
		players = [playerOne, playerTwo, playerThree, playerFour];
		availableOpponents = [playerOne, playerTwo, playerThree, playerFour];
		currentPlayer = {};
		$(".addCurrentPlayer").empty();
		$(".addCurrentOpponent").empty();
		$(".opponentArea").empty();
		$(".fightDescription").empty();
		displayStartingPlayers();
	});


	// MAIN ----------------------------------------------

	displayStartingPlayers();

	if (gameOver === "no") {
		$(document).on("click", ".characters", selectPlayer);
	}

});