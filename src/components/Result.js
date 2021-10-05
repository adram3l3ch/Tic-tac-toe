import React from "react";
import { useGlobalContext } from "../context";

const Result = () => {
	const { winner, choices, isMultiplayer } = useGlobalContext();
	return (
		<div className="result">
			{isMultiplayer === false
				? winner === "Draw"
					? winner
					: choices[winner] === choices.user
					? "You Win"
					: "You Lost"
				: winner === "Draw"
				? winner
				: choices[winner] === choices.user
				? "Player 1 Win"
				: "Player 2 Win"}
		</div>
	);
};

export default Result;
