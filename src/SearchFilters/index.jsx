import { ReactComponent as SearchIcon } from "./search.svg";

export default function SearchFilters() {
	return (
		<div className="l-filters page-section-container">
			<div className="filters-name">
				<input
					className="filters-name-input"
					type="search"
					name="Search by name"
					id="text-search-input"
					placeholder="Search for a country..."
				/>
				<SearchIcon className="filters-name-icon" />
			</div>
			<div className="filters-region">
				<select
					className="filters-region-select"
					name="regions"
					id="search-region"
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
