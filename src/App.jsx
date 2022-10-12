import "./App.css";

import { useState } from "react";

import { filterClassNames } from "./helpers";
import useCountryArrayFilters from "./useCountryArrayFilters";
import AppHeader from "./AppHeader";
import SearchFilters from "./SearchFilters";
import CountriesList from "./CountriesList";
import CountryDetails from "./CountryDetails";
// import { ReactComponent as LeftArrowIcon } from "./left-arrow.svg";
// Sample response from call to https://restcountries.com/v3.1/all?fields=name,tld,currencies,capital,region,subregion,languages,borders,population,flags
import countriesJson from "./data.json";

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

	const [darkMode, setDarkMode] = useState(true);
	const [isLoadingCountries, countries, setNameQuery, setRegionQuery] =
		useCountryArrayFilters(countriesJson);
	const [selectedCountry, setSelectedCountry] = useState();

	function addBodyNoScroll() {
		document.body.classList.toggle("no-scroll", true);
	}

	function removeBodyNoScroll() {
		document.body.classList.toggle("no-scroll", false);
	}

	return (
		<div
			className={filterClassNames([
				"l-app",
				darkMode ? "dark" : undefined,
			])}
		>
			<AppHeader darkMode={darkMode} setDarkMode={setDarkMode} />
			<main>
				<SearchFilters
					setNameQuery={setNameQuery}
					setRegionQuery={setRegionQuery}
				/>
				<CountriesList
					isLoadingCountries={isLoadingCountries}
					countries={countries}
					setSelectedCountry={setSelectedCountry}
				/>
				{/* TODO replace or cover <CountriesList> with <CountryDetails> when a card is clicked on */}
				<CountryDetails data={selectedCountry} />
			</main>
		</div>
	);
}
