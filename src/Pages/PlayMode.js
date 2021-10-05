import React from "react";
import { useGlobalContext } from "../context";

const PlayMode = () => {
	const { setIsMultiplayer } = useGlobalContext();
	return (
		<div className="playMode">
			<h2>Select Playing Mode</h2>
			<div className="btns">
				<button onClick={() => setIsMultiplayer(false)}>Play with Bot</button>
				<button onClick={() => setIsMultiplayer(true)}>Multiplayer</button>
			</div>
		</div>
	);
};

export default PlayMode;
