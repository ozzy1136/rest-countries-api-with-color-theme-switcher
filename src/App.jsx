import "./App.css";

import { useState } from "react";

import { filterClassNames } from "./helpers";
import useCountryArrayFilters from "./hooks/useCountryFilters";
import useDetailsDialogStatus from "./hooks/useDetailsDialogStatus";
import AppHeader from "./AppHeader";
import SearchFilters from "./SearchFilters";
import CountriesList from "./CountriesList";
import CountryDetails from "./CountryDetails";
// import { ReactComponent as LeftArrowIcon } from "./left-arrow.svg";
// Sample response from call to https://restcountries.com/v3.1/all?fields=name,tld,currencies,capital,region,subregion,languages,borders,population,flags
import countriesJson from "./data.json";

export default function App() {
	// https://restcountries.com/v3.1/all?fields=
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
	const [countryDetails, dispatchCountryDetails] = useDetailsDialogStatus();

	return (
		<div
			className={filterClassNames("l-app", darkMode ? "dark" : undefined)}
		>
			<AppHeader darkMode={darkMode} setDarkMode={setDarkMode} />
			<main>
				<section hidden={countryDetails.isVisible ? true : undefined}>
					<SearchFilters
						setNameQuery={setNameQuery}
						setRegionQuery={setRegionQuery}
					/>
					<CountriesList
						countries={countries}
						isLoadingCountries={isLoadingCountries}
						countryDetails={countryDetails}
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
