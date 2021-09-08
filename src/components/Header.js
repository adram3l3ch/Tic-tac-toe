import React from "react";
import { useGlobalContext } from "../context";

const Header = () => {
	const { isBotTurn } = useGlobalContext();
	return (
		<header>
			<h1>TIC TAC TOE</h1>
			<h2>
				It's
				<span>{isBotTurn ? " Bot's " : " Your "}</span>
				Turn
			</h2>
		</header>
	);
};

export default Header;
