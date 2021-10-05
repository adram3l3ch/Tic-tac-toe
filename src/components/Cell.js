import { useEffect } from "react";
import { useGlobalContext } from "../context";
import { checkWin, emptyCells, checkDraw, botChoice } from "../minimax";

const Cell = ({ value, index }) => {
	const {
		setValues,
		choices,
		values,
		isBotTurn,
		setIsBotTurn,
		setWinner,
		winner,
		isMultiplayer,
	} = useGlobalContext();

	useEffect(() => {
		if (values) {
			setWinner(winner =>
				checkDraw(values, winner)
					? "Draw"
					: checkWin(values, isBotTurn ? "user" : "bot", choices)
			);
		}
	}, [values, choices, isBotTurn, setWinner]);

	useEffect(() => {
		if (isBotTurn && !!emptyCells(values) && !winner && !isMultiplayer) {
			var timeout = setTimeout(
				() => botChoice(choices, setIsBotTurn, setValues, values),
				500
			);
		}
		return () => clearTimeout(timeout);
	}, [isBotTurn, winner, choices, setIsBotTurn, setValues, values, isMultiplayer]);

	const updateValues = player => {
		setValues(values => [
			...values.slice(0, index),
			choices[player],
			...values.slice(index + 1),
		]);
	};

	const clickHandler = () => {
		if (typeof values[index] === "string") return;
		if (!isBotTurn && !winner && !isMultiplayer) {
			updateValues("user");
			setIsBotTurn(true);
		} else if (!winner) {
			updateValues(isBotTurn ? "bot" : "user");
			setIsBotTurn(!isBotTurn);
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
