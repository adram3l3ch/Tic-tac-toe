import React from "react";
import { useGlobalContext } from "../context";

const Header = () => {
	const { isBotTurn, isMultiplayer } = useGlobalContext();
	return (
		<header>
			<h1>TIC TAC TOE</h1>
			<h2>
				It's
				{isMultiplayer === false ? (
					<span>{isBotTurn ? " Bot's " : " Your "}</span>
				) : (
					<span>{isBotTurn ? " Player 2's " : " Player 1's "}</span>
				)}
				Turn
			</h2>
		</header>
	);
};

export default Header;
