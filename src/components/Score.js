import { useGlobalContext } from "../context";

const Score = () => {
	const { score } = useGlobalContext();
	return (
		<div className="score">
			<h2>Player : {score.user}</h2>
			<h2>Computer : {score.bot}</h2>
		</div>
	);
};

export default Score;
