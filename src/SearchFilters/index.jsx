import { ReactComponent as SearchIcon } from "./search.svg";
import { useState, useEffect } from "react";

export default function SearchFilters({ setNameQuery, setRegionQuery }) {
	const [searchValue, setSearchValue] = useState("");
	const [regionValue, setRegionValue] = useState("");

	useEffect(() => {
		const timeoutId = setTimeout(() => {
			setNameQuery(searchValue);
		}, 750);

		return () => {
			clearTimeout(timeoutId);
		};
	}, [setNameQuery, searchValue]);

	useEffect(() => {
		setRegionQuery(regionValue);
	}, [setRegionQuery, regionValue]);

	return (
		<div className="l-filters page-section-container">
			<div className="filters-name">
				<input
					className="filters-name-input"
					type="search"
					name="search-name"
					placeholder="Search for a country..."
					value={searchValue}
					onChange={(e) => setSearchValue(e.target.value)}
				/>
				<SearchIcon className="filters-name-icon" />
			</div>
			<div className="filters-region">
				<select
					className="filters-region-select"
					name="regions"
					value={regionValue}
					onChange={(e) => setRegionValue(e.target.value)}
				>
					<option value="">Filter by Region</option>
					<option>Africa</option>
					<option>America</option>
					<option>Asia</option>
					<option>Europe</option>
					<option>Oceania</option>
				</select>
			</div>
		</div>
	);
}
