import { useReducer } from "react";

const initialState = { isVisible: false, data: null };

function countryDetailsReducer(state, action) {
	switch (action.type) {
		case "country_details_opened": {
			return {
				...state,
				isVisible: true,
				data: action.payload,
				lastToggledButton: action.buttonId,
				buttonRowIndex: action.rowIndex,
			};
		}
		case "country_details_closed": {
			return {
				...state,
				...initialState,
			};
		}
		default:
			throw new Error("Unknown action: " + action.type);
	}
}

export default function useDetailsDialogStatus() {
	const [state, dispatch] = useReducer(countryDetailsReducer, initialState);

	return [state, dispatch];
}
