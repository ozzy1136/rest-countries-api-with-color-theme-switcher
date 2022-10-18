import { useEffect, useReducer, useState } from "react";

function queryReducer(state, action) {
	switch (action.type) {
		case "update_region_query": {
			return {
				...state,
				regionQuery: action.payload,
			};
		}
		case "update_name_query": {
			return {
				...state,
				nameQuery: action.payload,
			};
		}
		default:
			throw new Error("Unknown action: " + action.type);
	}
}

export default function useCountryFilters(completeListOfCountries) {
	const initialState = {
		regionQuery: null,
		nameQuery: null,
	};
	const [state, dispatch] = useReducer(queryReducer, initialState);
	const [countriesList, setCountriesList] = useState([]);

	useEffect(() => {
		let res = [...completeListOfCountries];
		if (!!state.regionQuery) {
			res = res.filter((curr) =>
				curr.region
					.toLowerCase()
					.startsWith(state.regionQuery.toLowerCase())
			);
		}
		if (!!state.nameQuery) {
			res = res.filter((curr) =>
				curr.name.common
					.toLowerCase()
					.startsWith(state.nameQuery.toLowerCase())
			);
		}
		setCountriesList(res);
	}, [completeListOfCountries, state.regionQuery, state.nameQuery]);

	return [countriesList, dispatch];
}
