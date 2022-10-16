export default function countryDetailsReducer(state, action) {
	switch (action.type) {
		case "country_details_opened": {
			return {
				...state,
				isVisible: true,
				data: action.payload,
				lastToggledButton: action.buttonEl,
				buttonRowIndex: action.rowIndex,
			};
		}
		case "country_details_closed": {
			return {
				...state,
				isVisible: false,
				data: {},
			};
		}
		default:
			throw new Error("Unknown action: " + action.type);
	}
}
