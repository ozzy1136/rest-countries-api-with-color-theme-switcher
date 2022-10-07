import { useState, useEffect } from "react";

export default function useCountryArrayFilters(completeListOfCountries) {
	const [isLoadingCountries, setIsLoadingCountries] = useState(false);
	const [countries, setCountries] = useState([]);
	const [nameQuery, setNameQuery] = useState("");
	const [regionQuery, setRegionQuery] = useState("");

	useEffect(() => {
		(async () => {
			let res = [...completeListOfCountries];
			setIsLoadingCountries(true);

			await new Promise((resolve) => {
				if (regionQuery !== "") {
					res = res.filter((curr) =>
						curr.region
							.toLowerCase()
							.startsWith(regionQuery.toLowerCase())
					);
				}

				if (nameQuery !== "") {
					res = res.filter((curr) =>
						// Country common name is the name that is displayed in card component
						curr.name.common
							.toLowerCase()
							.startsWith(nameQuery.toLowerCase())
					);
				}

				resolve();
			});

			setCountries(res);
			await new Promise((resolve) => {
				setTimeout(resolve, 500);
			});
			setIsLoadingCountries(false);
		})();
	}, [nameQuery, regionQuery, completeListOfCountries]);

	return [isLoadingCountries, countries, setNameQuery, setRegionQuery];
}
