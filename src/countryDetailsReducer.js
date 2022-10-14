export default function countryDetailsReducer(state, action) {
	switch (action.type) {
		case "country_details_opened": {
			return {
				...state,
				data: action.payload,
				isVisible: true,
				lastToggledButton: action.buttonEl,
			};
		}
		case "country_details_closed": {
			return {
				...state,
				data: {},
				isVisible: false,
			};
		}
		default:
			throw new Error("Unknown action: " + action.type);
	}
}
