import ChoiceSelector from "./Pages/ChoiceSelector";
import Header from "./components/Header";
import Score from "./components/Score";
import Table from "./components/Table";
import { useGlobalContext } from "./context";
import PlayMode from "./Pages/PlayMode";
import { GrPowerReset } from "react-icons/gr";

function App() {
	const { reset, choices, isMultiplayer } = useGlobalContext();

	return (
		<main>
			<Header />
			<Table />
			<Score />
			<div className="btn" onClick={reset}>
				<GrPowerReset />
				<button>Reset</button>
			</div>
			{!choices.user && isMultiplayer !== null && <ChoiceSelector />}
			{isMultiplayer === null && <PlayMode />}
		</main>
	);
}

export default App;
