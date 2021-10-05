import { useGlobalContext } from "../context";

const ChoiceSelector = () => {
	const { setChoices } = useGlobalContext();
	return (
		<div className="choices-main">
			<h3>Select Your Choice</h3>
			<div className="choices">
				<button
					id="X"
					onClick={() => setChoices({ user: "X", bot: "O" })}
				>
					X
				</button>
				<button
					id="O"
					onClick={() => setChoices({ user: "O", bot: "X" })}
				>
					O
				</button>
			</div>
		</div>
	);
};

export default ChoiceSelector;
