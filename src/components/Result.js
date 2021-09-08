import React from "react";
import { useGlobalContext } from "../context";

const Result = () => {
	const { winner, choices } = useGlobalContext();
	return (
		<div className="result">
			{winner === "Draw"
				? winner
				: choices[winner] === choices.user
				? "You Win"
				: "You Lost"}
		</div>
	);
};

export default Result;
