$(document).ready(function() {


	var currentPlayer = "";
	var opponent = "";
	var playerSelected = false;
	var opponentSelected = false;
	var gameOver = "no";
	var opponentsRemaining = 2;
	var opponentIndex = 0;



	function displayStartingPlayers() {
		$(".addCharacters").empty();
		for (var i = 1; i <= players.length; i++) {
			$(".addCharacters")
			.append("<img src = " + players[i-1].imgSource + " class = \"characters\" data-index = " + i+ ">");
		}
	};



	function displayAvailableOpponents () {
		$(".addOpponents").empty();
		for (var i = 0; i < availableOpponents.length; i++) {
			var possibleOpponent = availableOpponents[i];
			var dataIndex = possibleOpponent.id;
			$(".addOpponents")
			.append("<img src = " + possibleOpponent.imgSource + " class = \"characters opponents\" data-index = " + dataIndex + ">");
		}
	}



	function generatePlayer (firstName, lastName, id, attackValue, currentAttack, startingHP, currentHP, counterValue, imgSource) {
		var player = {
			firstName: firstName,
			lastName: lastName,
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

	var playerOne = generatePlayer("Hermione", "Granger", 1, 8, 8, 180,  180, 20, "assets/images/hermione.jpg");
	var playerTwo = generatePlayer("Luna", "Lovegood", 2, 6, 6, 120,  120, 5, "assets/images/luna.jpg");
	var playerThree = generatePlayer("Ginny", "Weasley", 3, 7, 7, 100,  100, 13, "assets/images/ginny.jpg");
	var playerFour = generatePlayer("Bellatrix", "Lestrange", 4, 5, 5, 150,  150, 25, "assets/images/bellatrix.jpg");
	var players = [playerOne, playerTwo, playerThree, playerFour];
	var currentPlayer = {};
	var availableOpponents = [playerOne, playerTwo, playerThree, playerFour];

	$(document).on("click", ".characters", selectPlayer);

	console.log(players);

	function selectPlayer() {
		var selection = parseInt($(this).attr("data-index"));
		if(!playerSelected) {
			currentPlayer = players[selection-1];
			var indexToSplice = availableOpponents.indexOf(currentPlayer);
			availableOpponents.splice(indexToSplice, 1);
			playerSelected = true;
			$(".addCharacters").empty();
			$(".addCurrentPlayer").append("<img src = \"" + currentPlayer.imgSource + "\" class = \"currentPlayer\">");
			console.log(currentPlayer);
			console.log(availableOpponents);
			displayAvailableOpponents();
		} else if (!opponentSelected) {
			opponent = players[selection-1];
			console.log(selection);
			console.log(opponent);
			var indexToSplice = availableOpponents.indexOf(opponent);
			availableOpponents.splice(indexToSplice, 1);
			opponentSelected = true;
			$(".addCurrentOpponent").append("<img src = \"" + opponent.imgSource + "\" class = \"currentOpponent\">");
			console.log(availableOpponents);
			displayAvailableOpponents();
		}
	};


	$(".attack").on("click", function() {
		if (!playerSelected) {
			alert("Select a player!")
		} else if (!opponentSelected) {
			alert("Select an opponent!")
		} else {
			attack(currentPlayer, opponent);
		}
	});




	function attack(player, opponent) {
		console.log("attacked!");
		if((gameOver === "no") && (opponentSelected = true)) {
			opponent.currentHP -= player.currentAttack;
			if (opponent.currentHP <= 0) {
				alert("You won");
				opponentSelected = false;
				opponentsRemaining--;
				
			} else if (opponentsRemaining == 0) {
					gameOver = "won"
			} else {
				player.currentHP -= opponent.counterValue;
				if (player.currentHP <= 0) {
					gameOver = "lost";

					alert("You lost");
				} else {
					player.currentAttack += player.attackValue;
				}
			}
			console.log("you: " + player.currentHP + "  them: " + opponent.currentHP)
		}
		
	}


	displayStartingPlayers();

});