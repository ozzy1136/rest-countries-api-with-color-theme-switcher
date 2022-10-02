import "./App.css";

import { useState, useEffect } from "react";
import AppHeader from "./AppHeader";
import SearchFilters from "./SearchFilters";
import CountryCard from "./CountryCard";

// Sample response from call to https://restcountries.com/v3.1/all?fields=name,tld,currencies,capital,region,subregion,languages,borders,population,flags
import countriesJson from "./data.json";

export default function App() {
	const [darkMode, setDarkMode] = useState(true);
	const [isLoadingCountries, setIsLoadingCountries] = useState(false);
	const [countries, setCountries] = useState([]);
	const [nameQuery, setNameQuery] = useState("");
	const [regionQuery, setRegionQuery] = useState("");
	const cardsObserver = new IntersectionObserver(
		(entries, observer) => {
			entries.forEach((curr) => {
				if (curr.isIntersecting) {
					const [imageEl] = curr.target.childNodes;
					imageEl.src = imageEl.dataset.src;
					curr.target.classList.add("loaded");
					observer.unobserve(curr.target);
				}
			});
		},
		{
			root: null,
			rootMargin: "0px",
			threshold: 1.0,
		}
	);
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

	useEffect(() => {
		// Async function wil be used for fetch call to api
		(async () => {
			let res = [...countriesJson];

			setIsLoadingCountries(true);

			await new Promise((resolve) => {
				if (nameQuery !== "") {
					res = res.filter((curr) =>
						// Country common name is the one that is displayed in card component
						curr.name.common
							.toLowerCase()
							.startsWith(nameQuery.toLowerCase())
					);
				}
				resolve();
			});
			await new Promise((resolve) => {
				if (regionQuery !== "") {
					res = res.filter((curr) =>
						curr.region
							.toLowerCase()
							.startsWith(regionQuery.toLowerCase())
					);
				}
				resolve();
			});
			res = await new Promise((resolve) => {
				resolve(
					res.sort((a, b) => (a.name.common > b.name.common ? 1 : -1))
				);
			});
			setCountries(res);
			await new Promise((resolve) => {
				setTimeout(() => {
					resolve();
				}, 500);
			});
			setIsLoadingCountries(false);
		})();
	}, [nameQuery, regionQuery]);

	useEffect(() => {
		return () => {
			cardsObserver.disconnect();
		};
	}, []);

	return (
		<div
			className={["l-app", darkMode ? "dark" : undefined]
				.filter((curr) => curr)
				.join(" ")}
		>
			<AppHeader darkMode={darkMode} setDarkMode={setDarkMode} />
			<SearchFilters
				setNameQuery={setNameQuery}
				regionQuery={regionQuery}
				setRegionQuery={setRegionQuery}
			/>
			<section className="l-cards page-section-container">
				{isLoadingCountries ? (
					<div className="l-loading">
						<p>Loading list of countries</p>
					</div>
				) : countries.length > 0 ? (
					countries.map((curr, i) => (
						<CountryCard
							data={curr}
							observer={cardsObserver}
							key={curr.name.common}
						/>
					))
				) : (
					<div className="l-emptyMsg">
						<p>Zero countries to show</p>
					</div>
				)}
			</section>
		</div>
	);
}
