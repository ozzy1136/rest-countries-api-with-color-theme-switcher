import { useMemo } from "react";
import { ViewportList } from "react-viewport-list";

import { chunk, filterClassNames } from "../helpers";
import useMatchMedia from "../useMatchMedia";
import CountryCard from "../CountryCard";

/**
 * @param {Object} props
 * @param {boolean} props.isLoadingCountries
 * @param {Array.<Object>} props.countries
 */
export default function CountriesList({ isLoadingCountries, countries }) {
	const isTablet = useMatchMedia("(min-width: 768px)");
	const isLaptop = useMatchMedia("(min-width: 1024px)");
	const chunkedCountries = useMemo(
		() => chunk(countries, isLaptop ? 4 : isTablet ? 3 : 1),
		[countries, isLaptop, isTablet]
	);

	return (
		// TODO use aria to announce countries list is updating
		<section className="l-cards page-section-container">
			{isLoadingCountries ? (
				<div className="l-loadingCountries">
					<p>Loading list of countries</p>
				</div>
			) : chunkedCountries.length === 0 ? (
				<div className="l-zeroCountries">
					<p>Zero countries to show</p>
					<p>Try adjusting the filters above</p>
				</div>
			) : null}
			<div
				className={filterClassNames([
					"l-cards-list",
					!isLoadingCountries && chunkedCountries.length > 0
						? undefined
						: "is-loading",
				])}
			>
				<ViewportList items={chunkedCountries}>
					{(row) => (
						<div
							className="l-cards-list-row"
							style={{ marginBottom: "4rem" }}
							key={row[0].name.common}
						>
							{row.map((curr) => (
								<CountryCard
									data={curr}
									key={curr.name.common}
								/>
							))}
						</div>
					)}
				</ViewportList>
			</div>
		</section>
	);
}
