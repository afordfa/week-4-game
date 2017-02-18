$(document).ready(function() {


	var currentPlayer = "";
	var opponent = "";
	var playerSelected = false;
	var opponentSelected = false;
	var gameOver = "no";
	var opponentsRemaining = 2;


	function generatePlayer (firstName, lastName, id, attackValue, currentAttack, startingHP, currentHP, counterValue) {
		var player = {
			firstName: firstName,
			lastName: lastName,
			id:  id,
			attackValue: attackValue,
			currentAttack: currentAttack,
			startingHP: startingHP,
			currentHP: currentHP,
			counterValue: counterValue
		}
		return player;
	}

	var playerOne = generatePlayer("Hermione", "Granger", 1, 8, 8, 180,  180, 25);
	var playerTwo = generatePlayer("Luna", "Lovegood", 2, 6, 6, 10,  10, 25);
	var playerThree = generatePlayer("Ginny", "Weasley", 3, 7, 7, 40,  40, 25);
	var playerFour = generatePlayer("Bellatrix", "Lestrange", 4, 5, 5, 1,  1, 25);



	function selectPlayer() {
		$(".player-one").on("click", function() {
			if (!playerSelected) {
				currentPlayer = playerOne;
				playerSelected = true;
				console.log(currentPlayer);
			} else if (!opponentSelected) {
				opponent = playerOne;
				opponentSelected = true;
				console.log(opponent);
			}
		})
	
		$(".player-two").on("click", function() {
			if (!playerSelected) {
				currentPlayer = playerTwo;
				playerSelected = true;
				console.log(currentPlayer);
			} else if (!opponentSelected) {
				opponent = playerTwo;
				opponentSelected = true;
				console.log(opponent);
			}
		})
	
		
		$(".player-three").on("click", function() {
			if (!playerSelected) {
				currentPlayer = playerThree;
				playerSelected = true;
				console.log(currentPlayer);
			} else if (!opponentSelected) {
				opponent = playerThree;
				opponentSelected = true;
				console.log(opponent);
			}
		})
	
	
		$(".player-four").on("click", function() {
			if (!playerSelected) {
				currentPlayer = playerFour;
				playerSelected = true;
				console.log(currentPlayer);
			} else if (!opponentSelected) {
				opponent = playerFour;
				opponentSelected = true;
				console.log(opponent);
			}
		})
	};


	selectPlayer();
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
				opponentSelected = false;
				opponentsRemaining--;
				if (opponentsRemaining == 0) {
					gameOver = "won"
				}
				alert("You won");
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
});