import "./App.css";

import { useState } from "react";

import { filterClassNames } from "./helpers";
import useCountryFilters from "./hooks/useCountryFilters";
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
	const [countriesArr, updateQuery] = useCountryFilters(countriesJson);
	const [countryDetails, dispatchCountryDetails] = useDetailsDialogStatus();

	return (
		<div
			className={filterClassNames("l-app", darkMode ? "dark" : undefined)}
		>
			<AppHeader darkMode={darkMode} setDarkMode={setDarkMode} />
			<main>
				<section hidden={countryDetails.isVisible ? true : undefined}>
					<SearchFilters updateQuery={updateQuery} />
					<CountriesList
						countriesArr={countriesArr}
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
