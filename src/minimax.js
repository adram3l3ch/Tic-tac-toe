import { WIN_COMBO } from "./WIN_COMBO";

function minimax(newBoard, player, choices, values) {
	var availSpots = emptyCells(values);

	if (checkWin(newBoard, "user", choices)) {
		return { score: -10 };
	} else if (checkWin(newBoard, "bot", choices)) {
		return { score: 10 };
	} else if (availSpots.length === 0) {
		return { score: 0 };
	}
	var moves = [];
	for (var i = 0; i < availSpots.length; i++) {
		var move = {};
		move.index = newBoard[availSpots[i]];
		newBoard[availSpots[i]] = player;

		if (player == choices.bot) {
			var result = minimax(newBoard, choices.user);
			move.score = result.score;
		} else {
			var result = minimax(newBoard, choices.bot);
			move.score = result.score;
		}

		newBoard[availSpots[i]] = move.index;

		moves.push(move);
	}

	var bestMove;
	if (player === choices.bot) {
		var bestScore = -10000;
		for (var i = 0; i < moves.length; i++) {
			if (moves[i].score > bestScore) {
				bestScore = moves[i].score;
				bestMove = i;
			}
		}
	} else {
		var bestScore = 10000;
		for (var i = 0; i < moves.length; i++) {
			if (moves[i].score < bestScore) {
				bestScore = moves[i].score;
				bestMove = i;
			}
		}
	}
	return moves[bestMove];
}

// ---------------------minimax-------------------

const botChoice = (choices, values, setValues, setIsBotTurn) => {
	let bestchoice = minimax(values, choices.bot, choices, values).index;
	setIsBotTurn(false);
	setValues((values) => [
		...values.slice(0, bestchoice),
		choices.bot,
		...values.slice(bestchoice + 1),
	]);
};

const checkWin = (newBoard, player, choices) => {
	let winorlose = WIN_COMBO.some((combo) => {
		return combo.every((value) => newBoard[value] === choices[player]);
	});
	return winorlose ? player : null;
};

const emptyCells = (values) => {
	let arrayOfEmptyCells = [];
	values.map((value, index) => {
		if (typeof value === "number") arrayOfEmptyCells.push(index);
	});
	return arrayOfEmptyCells;
};

const checkDraw = (winner, values) => {
	if (emptyCells(values).length === 0 && !winner) return true;
	else return null;
};

export { botChoice, checkDraw, checkWin, emptyCells };
