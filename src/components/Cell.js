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
	} = useGlobalContext();

	useEffect(() => {
		if (values) {
			setWinner((winner) =>
				checkDraw(values, winner)
					? "Draw"
					: checkWin(values, isBotTurn ? "user" : "bot", choices)
			);
		}
	}, [values, choices, isBotTurn, setWinner]);

	useEffect(() => {
		if (isBotTurn && !!emptyCells(values) && !winner) {
			var timeout = setTimeout(
				() => botChoice(choices, setIsBotTurn, setValues, values),
				1000
			);
		}
		return () => clearTimeout(timeout);
	}, [isBotTurn, winner, choices, setIsBotTurn, setValues, values]);

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
