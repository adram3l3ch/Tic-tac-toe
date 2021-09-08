import ChoiceSelector from "./components/ChoiceSelector";
import Header from "./components/Header";
import Score from "./components/Score";
import Table from "./components/Table";
import { useGlobalContext } from "./context";

function App() {
	const { reset, choices } = useGlobalContext();

	return (
		<main>
			<Header />
			<Table />
			<Score />
			<button onClick={reset}>Reset</button>
			{!choices.user && <ChoiceSelector />}
		</main>
	);
}

export default App;
