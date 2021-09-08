import { useEffect } from "react";
import { useGlobalContext } from "../context";
import { WIN_COMBO } from "../WIN_COMBO";

const Cell = ({ value, index }) => {
	const {
		setValues,
		choices,
		values,
		isBotTurn,
		setIsBotTurn,
		setWinner,
		winner,
	} = useGlobalContext();
	useEffect(
		() =>
			setWinner(
				checkDraw()
					? "Draw"
					: checkWin(values, isBotTurn ? "user" : "bot")
			),
		[values]
	);

	useEffect(() => {
		if (isBotTurn && !!emptyCells() && !winner) {
			var timeout = setTimeout(botChoice, 1000);
		}
		return () => clearTimeout(timeout);
	}, [isBotTurn, winner]);

	// ---------------------minimax-------------------

	function minimax(newBoard, player) {
		var availSpots = emptyCells();

		if (checkWin(newBoard, "user")) {
			return { score: -10 };
		} else if (checkWin(newBoard, "bot")) {
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

	const botChoice = () => {
		let bestchoice = minimax(values, choices.bot).index;
		setIsBotTurn(false);
		setValues((values) => [
			...values.slice(0, bestchoice),
			choices.bot,
			...values.slice(bestchoice + 1),
		]);
	};

	const checkWin = (newBoard, player) => {
		let winorlose = WIN_COMBO.some((combo) => {
			return combo.every((value) => newBoard[value] === choices[player]);
		});
		return winorlose ? player : null;
	};

	const emptyCells = () => {
		let arrayOfEmptyCells = [];
		values.map((value, index) => {
			if (typeof value === "number") arrayOfEmptyCells.push(index);
		});
		return arrayOfEmptyCells;
	};

	const checkDraw = () => {
		if (emptyCells().length === 0 && !winner) return true;
		else return null;
	};

	const clickHandler = () => {
		if (!isBotTurn && !winner) {
			setValues((values) => [
				...values.slice(0, index),
				choices.user,
				...values.slice(index + 1),
			]);
			if (!winner) {
				setIsBotTurn(true);
			}
		}
	};

	return (
		<div
			className="cell"
			onClick={clickHandler}
			style={{ color: value === "X" ? "#F2E17D" : "#7893AA" }}
		>
			<h2>{typeof value == "number" ? "" : value}</h2>
		</div>
	);
};

export default Cell;
