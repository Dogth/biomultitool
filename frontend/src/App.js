import "./App.css";
import Tools from "./components/Tools/Tools";
import Bar from "./components/Bar/Bar";
import Nav from "./components/Nav/Nav";

import "./components/Utils/Utils.css";

function App() {
	return (
		<div className="Grid">
			<Bar />
			<Nav />
			<Tools />
		</div>
	);
}

export default App;
