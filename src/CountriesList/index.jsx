import { useEffect, useMemo, useRef } from "react";
import { ViewportList } from "react-viewport-list";

import { chunk, filterClassNames, attemptFocus } from "../helpers";
import useViewportSize from "../hooks/useViewportSize";
import CountryCard from "../CountryCard";

export default function CountriesList({
	countriesArr,
	countryDetails,
	handleCardClick,
}) {
	const listRef = useRef(null);
	const isTablet = useViewportSize("(min-width: 768px)");
	const isDesktop = useViewportSize("(min-width: 1024px)");
	// TODO add timeout so loading message is shown
	const chunkedCountries = useMemo(() => {
		if (countriesArr)
			return chunk(countriesArr, isDesktop ? 4 : isTablet ? 3 : 1);
	}, [countriesArr, isDesktop, isTablet]);

	useEffect(() => {
		if (!!countryDetails.lastToggledButton && !countryDetails.isVisible) {
			listRef.current.scrollToIndex(countryDetails.buttonRowIndex);
			function focusLastToggledButton() {
				let btn = document.getElementById(
					countryDetails.lastToggledButton
				);
				if (!btn) {
					requestAnimationFrame(focusLastToggledButton);
				} else if (!attemptFocus(btn)) {
					requestAnimationFrame(focusLastToggledButton);
				}
			}
			requestAnimationFrame(focusLastToggledButton);
		}
	}, [countryDetails]);

	return (
		<div className="l-cards page-section-container">
			<div className="l-cards-status center-children" aria-live="polite">
				{!countriesArr ? (
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
					!countriesArr ? "is-loading" : undefined
				)}
			>
				{countryDetails.isVisible ? null : (
					<ViewportList items={chunkedCountries} ref={listRef}>
						{(row, rowIndex) => (
							<div
								className="l-cards-list-row"
								style={{ marginBottom: "4rem" }}
								key={rowIndex}
							>
								{row.map((curr) => (
									<CountryCard
										data={curr}
										handleCardClick={handleCardClick}
										rowIndex={rowIndex}
										key={curr.name.common}
									/>
								))}
							</div>
						)}
					</ViewportList>
				)}
			</div>
		</div>
	);
}
