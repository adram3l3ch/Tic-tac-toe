import { WIN_COMBO } from "./WIN_COMBO";

export const checkWin = (newBoard, player, choices) => {
	let winorlose = WIN_COMBO.some((combo) => {
		return combo.every((value) => newBoard[value] === choices[player]);
	});
	return winorlose ? player : null;
};

export const checkDraw = (values, winner) => {
	if (emptyCells(values).length === 0 && !winner) return true;
	else return null;
};

export const emptyCells = (values) => {
	let arrayOfEmptyCells = [];
	values.forEach((value, index) => {
		if (typeof value === "number") arrayOfEmptyCells.push(index);
	});

	return arrayOfEmptyCells;
};

// ---------------------minimax-------------------

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

		if (player === choices.bot) {
			var result = minimax(newBoard, choices.user, choices, values);
			move.score = result.score;
		} else {
			var result = minimax(newBoard, choices.bot, choices, values);
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

export const botChoice = (choices, setIsBotTurn, setValues, values) => {
	let bestchoice = minimax(values, choices.bot, choices, values).index;
	setIsBotTurn(false);
	setValues((values) => [
		...values.slice(0, bestchoice),
		choices.bot,
		...values.slice(bestchoice + 1),
	]);
};
