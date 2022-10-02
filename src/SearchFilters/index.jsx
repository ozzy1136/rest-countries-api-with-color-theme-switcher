import { ReactComponent as SearchIcon } from "./search.svg";
import { useState, useEffect } from "react";

export default function SearchFilters({
	setNameQuery,
	regionQuery,
	setRegionQuery,
}) {
	const [searchValue, setSearchValue] = useState("");

	useEffect(() => {
		const timeoutId = setTimeout(() => {
			setNameQuery(searchValue);
			console.log("nameQuery was set");
		}, 1000);

		return () => {
			clearTimeout(timeoutId);
		};
	}, [searchValue]);

	return (
		<div className="l-filters page-section-container">
			<div className="filters-name">
				<input
					className="filters-name-input"
					type="search"
					name="Search by name"
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
					value={regionQuery}
					onChange={(e) => setRegionQuery(e.target.value)}
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
