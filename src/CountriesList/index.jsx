import { useMemo } from "react";
import { ViewportList } from "react-viewport-list";

import { chunk, filterClassNames } from "../helpers";
import useViewportSize from "../useViewportSize";
import CountryCard from "../CountryCard";

export default function CountriesList({
	countries,
	isLoadingCountries,
	handleCardClick,
}) {
	const isTablet = useViewportSize("(min-width: 768px)");
	const isDesktop = useViewportSize("(min-width: 1024px)");
	const chunkedCountries = useMemo(
		() => chunk(countries, isDesktop ? 4 : isTablet ? 3 : 1),
		[countries, isDesktop, isTablet]
	);

	return (
		<div className="l-cards page-section-container">
			<div className="l-cards-status center-children" aria-live="polite">
				{isLoadingCountries ? (
					<h2>Loading list of countries</h2>
				) : chunkedCountries.length === 0 ? (
					<h2>
						Zero countries to show
						<br />
						Try adjusting the filters above
					</h2>
				) : (
					<h2 className="sr-only">List of countries is available</h2>
				)}
			</div>
			<div
				className={filterClassNames(
					"l-cards-list",
					isLoadingCountries ? "is-loading" : undefined
				)}
			>
				<ViewportList items={chunkedCountries}>
					{(row, index) => (
						<div
							className="l-cards-list-row"
							style={{ marginBottom: "4rem" }}
							key={index}
						>
							{row.map((curr) => (
								<CountryCard
									data={curr}
									handleCardClick={handleCardClick}
									key={curr.name.common}
								/>
							))}
						</div>
					)}
				</ViewportList>
			</div>
		</div>
	);
}
