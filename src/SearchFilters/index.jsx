import { ReactComponent as SearchIcon } from "./search.svg";
import { useState, useEffect } from "react";

export default function SearchFilters({ updateQuery }) {
	const [searchValue, setSearchValue] = useState("");
	const [regionValue, setRegionValue] = useState("");

	useEffect(() => {
		updateQuery({
			type: "update_region_query",
			payload: regionValue,
		});
	}, [updateQuery, regionValue]);

	useEffect(() => {
		const timeoutId = setTimeout(() => {
			updateQuery({
				type: "update_name_query",
				payload: searchValue,
			});
		}, 750);

		return () => {
			clearTimeout(timeoutId);
		};
	}, [updateQuery, searchValue]);

	return (
		<div className="l-filters page-section-container">
			<div className="filters-name">
				<SearchIcon className="filters-name-icon" />
				<input
					className="filters-name-input"
					type="search"
					placeholder="Search for a country..."
					value={searchValue}
					onChange={(e) => setSearchValue(e.target.value)}
				/>
			</div>
			<div className="filters-region">
				<select
					className="filters-region-select"
					aria-label="Filter countries by region"
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
