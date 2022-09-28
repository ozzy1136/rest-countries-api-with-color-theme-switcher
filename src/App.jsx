import "./App.css";

import { useState } from "react";
import AppHeader from "./AppHeader";
import SearchFilters from "./SearchFilters";

// https://restcountries.com/v3.1/all?fields=name,tld,currencies,capital,region,subregion,languages,borders,population,flags
export default function App() {
	// const apiFields = [
	// 	"name",
	// 	"tld",
	// 	"currencies",
	// 	"capital",
	// 	"region",
	// 	"subregion",
	// 	"languages",
	// 	"borders",
	// 	"population",
	// 	"flags",
	// ];
	const [darkMode, setDarkMode] = useState(false);

	return (
		<div
			className={["l-app", darkMode ? "dark" : undefined]
				.filter((curr) => curr)
				.join(" ")}
		>
			<AppHeader darkMode={darkMode} setDarkMode={setDarkMode} />
		</div>
	);
}
