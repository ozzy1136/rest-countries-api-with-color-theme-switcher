import { useEffect, useState } from "react";

export default function useIsMobile(mediaQueryString) {
	const [matchesMedia, setMatchesMedia] = useState(
		window.matchMedia(mediaQueryString).matches
	);

	useEffect(() => {
		const mediaWatcher = window.matchMedia(mediaQueryString);

		function updateMatchesMedia(e) {
			setMatchesMedia(e.matches);
		}

		mediaWatcher.addEventListener("change", updateMatchesMedia);

		return () => {
			mediaWatcher.removeEventListener("change", updateMatchesMedia);
		};
	});

	return matchesMedia;
}
