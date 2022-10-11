import { useMemo } from "react";
import { ViewportList } from "react-viewport-list";

import { chunk, filterClassNames } from "../helpers";
import useViewportSize from "../useViewportSize";
import CountryCard from "../CountryCard";

export default function CountriesList({
	isLoadingCountries,
	countries,
	detailsDialog,
	setSelectedCountry,
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
					<p>Loading list of countries</p>
				) : chunkedCountries.length === 0 ? (
					// TODO Make details always available to screen readers
					<p>
						Zero countries to show
						<br />
						Try adjusting the filters above
					</p>
				) : (
					<p className="sr-only">List of countries has loaded</p>
				)}
			</div>
			<ul
				className={filterClassNames([
					"l-cards-list",
					isLoadingCountries ? "is-loading" : undefined,
				])}
				aria-label="List of countries"
			>
				<ViewportList items={chunkedCountries}>
					{(row, index) => (
						<div
							className="l-cards-list-row"
							style={{ marginBottom: "4rem" }}
							key={index}
							role="presentation"
						>
							{row.map((curr) => (
								<CountryCard
									data={curr}
									detailsDialog={detailsDialog}
									setSelectedCountry={setSelectedCountry}
									key={curr.name.common}
								/>
							))}
						</div>
					)}
				</ViewportList>
			</ul>
		</div>
	);
}
