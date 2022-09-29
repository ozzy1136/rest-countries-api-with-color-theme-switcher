import "./App.css";

import { useState, useEffect } from "react";
import AppHeader from "./AppHeader";
import SearchFilters from "./SearchFilters";
import CountryCard from "./CountryCard";
import countriesJson from "./data.json";

export default function App() {
	const [darkMode, setDarkMode] = useState(false);
	const [isLoadingCountries, setIsLoadingCountries] = useState(false);
	const [countries, setCountries] = useState([]);

	useEffect(() => {
		// Async function wil be used for fetch call to api
		(async () => {
			setIsLoadingCountries(true);
			setCountries([]);
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
			// Call to https://restcountries.com/v3.1/all?fields=name,tld,currencies,capital,region,subregion,languages,borders,population,flags
			await new Promise((resolve) => setTimeout(resolve, 2000));
			const res = await orderCountriesAlphabetically(countriesJson);
			setCountries(res);
			setIsLoadingCountries(false);
		})();
	}, []);

	function orderCountriesAlphabetically(data) {
		return data.sort((a, b) => (a.name.common > b.name.common ? 1 : -1));
	}

	return (
		<div
			className={["l-app", darkMode ? "dark" : undefined]
				.filter((curr) => curr)
				.join(" ")}
		>
			<AppHeader darkMode={darkMode} setDarkMode={setDarkMode} />
			<SearchFilters />
			<section className="l-cards page-section-container">
				{isLoadingCountries ? (
					<div className="l-loading">
						<p>Loading list of countries</p>
					</div>
				) : countries.length > 0 ? (
					countries.map((curr, i) => (
						<CountryCard data={curr} key={i} />
					))
				) : (
					<div className="l-emptyList">
						<p>Zero countries to show</p>
					</div>
				)}
			</section>
		</div>
	);
}
