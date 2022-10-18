import { useEffect, useReducer } from "react";

const initialState = {
	data: null,
	error: null,
};

function fetchReducer(state, action) {
	switch (action.type) {
		case "loading": {
			return {
				...initialState,
			};
		}
		case "error": {
			return {
				...initialState,
				error: action.payload,
			};
		}
		case "fetched": {
			return {
				...initialState,
				data: action.payload,
			};
		}
		default:
			return state;
	}
}

export default function useFetch(url) {
	const [state, dispatch] = useReducer(fetchReducer, initialState);

	useEffect(() => {
		if (!url) return;

		const controller = new AbortController();

		(async () => {
			dispatch({ type: "loading" });
			try {
				const response = await fetch(url, {
					signal: controller.signal,
				});
				if (!response.ok) {
					throw new Error(response.statusText);
				}
				const data = await response.json();
				dispatch({
					type: "fetched",
					payload: data,
				});
			} catch (error) {
				dispatch({
					type: "error",
					payload: error,
				});
			}
		})();

		return () => {
			controller.abort();
		};
	}, [url]);

	return state;
}
