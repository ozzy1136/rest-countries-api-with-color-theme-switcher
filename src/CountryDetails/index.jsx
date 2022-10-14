import { useEffect, useRef } from "react";

import { focusFirstDescendant } from "../helpers";

export default function CountryDetails({ data, handleClosed }) {
	const container = useRef();

	useEffect(() => {
		focusFirstDescendant(container.current);
	}, []);

	useEffect(() => {
		document.addEventListener("keyup", handleEscape);

		return () => {
			document.removeEventListener("keyup", handleEscape);
		};
	});

	function handleEscape(event) {
		if (event.which === 27 || event.keyCode === 27) {
			handleClosed({ type: "country_details_closed" });
			event.stopPropagation();
		}
	}

	return (
		<section ref={container}>
			<button
				type="button"
				onClick={() => {
					handleClosed({ type: "country_details_closed" });
				}}
			>
				Back
			</button>
			<h2 id="country-details-heading">{data.name.common}</h2>
		</section>
	);
}
