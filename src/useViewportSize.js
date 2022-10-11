import { useEffect, useState } from "react";

export default function useViewportSize(viewportQuery) {
	const [matchesMedia, setMatchesMedia] = useState(
		window.matchMedia(viewportQuery).matches
	);

	useEffect(() => {
		function updateMatchesMedia(e) {
			setMatchesMedia(e.matches);
		}

		const mediaWatcher = window.matchMedia(viewportQuery);
		mediaWatcher.addEventListener("change", updateMatchesMedia);

		return () => {
			mediaWatcher.removeEventListener("change", updateMatchesMedia);
		};
	}, [viewportQuery]);

	return matchesMedia;
}
