import { createContext, useContext, useState, useEffect } from "react";
import { initialValue } from "./WIN_COMBO";

const AppContext = createContext();

const ContextProvider = ({ children }) => {
	const [values, setValues] = useState(initialValue);
	const [isBotTurn, setIsBotTurn] = useState(false);
	const [choices, setChoices] = useState({ user: null, bot: null });
	const [winner, setWinner] = useState(null);
	const [score, setScore] = useState({ user: 0, bot: 0 });

	const reset = () => {
		setValues(initialValue);
		setWinner(null);
		setIsBotTurn(false);
		setChoices({ user: null, bot: null });
		setScore({ user: 0, bot: 0 });
	};

	useEffect(() => {
		if (winner) {
			setTimeout(() => {
				setValues(initialValue);
				setIsBotTurn(false);
			}, 3000);
		}
		if (winner !== "Draw")
			setScore((score) => ({ ...score, [winner]: score[winner] + 1 }));
	}, [winner]);

	return (
		<AppContext.Provider
			value={{
				values,
				setValues,
				isBotTurn,
				setIsBotTurn,
				choices,
				setChoices,
				winner,
				setWinner,
				score,
				setScore,
				reset,
			}}
		>
			{children}
		</AppContext.Provider>
	);
};

// -------------custom hook-----------------

const useGlobalContext = () => {
	return useContext(AppContext);
};

export { ContextProvider, useGlobalContext };
