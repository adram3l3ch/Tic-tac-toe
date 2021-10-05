import { useGlobalContext } from "../context";

const Score = () => {
	const { score, isMultiplayer } = useGlobalContext();
	return (
		<div className="score">
			{isMultiplayer === false ? (
				<>
					<h2>Player : {score.user}</h2>
					<h2>Computer : {score.bot}</h2>
				</>
			) : (
				<>
					<h2>Player 1 : {score.user}</h2>
					<h2>Player 2 : {score.bot}</h2>
				</>
			)}
		</div>
	);
};

export default Score;
