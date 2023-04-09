import "./App.css";
import Board from "./components/Board";
import Keyboard from "./components/Keyboard";
import React, { createContext, useState } from "react";
import { boardDefault } from "./Words";

// Allow states to be passed throughout the application using context API
export const AppContext = createContext();

function App() {
	const [board, setBoard] = useState(boardDefault);

	return (
		<div className='App'>
			<nav>
				<h1>Nerdle</h1>
			</nav>

			<AppContext.Provider value={{ board, setBoard }}>
				<div className='game'>
					<Board />
					<Keyboard />
				</div>
			</AppContext.Provider>
		</div>
	);
}

export default App;
