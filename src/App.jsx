import "./App.css";

import { useEffect, useReducer, useState } from "react";

import { filterClassNames } from "./helpers";
import useCountryArrayFilters from "./useCountryArrayFilters";
import countryDetailsReducer from "./countryDetailsReducer";
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
	// TODO refactor useCountryArrayFilters so that it uses useReducer
	const [isLoadingCountries, countries, setNameQuery, setRegionQuery] =
		useCountryArrayFilters(countriesJson);
	const [countryDetails, dispatchCountryDetails] = useReducer(
		countryDetailsReducer,
		{ data: {}, isVisible: false, lastToggledButton: undefined }
	);

	useEffect(() => {
		if (!countryDetails.isVisible && countryDetails.lastToggledButton) {
			countryDetails.lastToggledButton.focus();
		}
	}, [countryDetails]);

	return (
		<div
			className={filterClassNames("l-app", darkMode ? "dark" : undefined)}
		>
			<AppHeader darkMode={darkMode} setDarkMode={setDarkMode} />
			{/* TODO fix forced reflow while executing JavaScript */}
			<main>
				<section hidden={countryDetails.isVisible ? true : undefined}>
					<SearchFilters
						setNameQuery={setNameQuery}
						setRegionQuery={setRegionQuery}
					/>
					<CountriesList
						countries={countries}
						isLoadingCountries={isLoadingCountries}
						handleCardClick={dispatchCountryDetails}
					/>
				</section>
				{countryDetails.isVisible ? (
					<CountryDetails
						data={countryDetails.data}
						handleClosed={dispatchCountryDetails}
					/>
				) : null}
			</main>
		</div>
	);
}
