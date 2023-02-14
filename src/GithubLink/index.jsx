import { ReactComponent as GithubLogo } from "./github-mark.svg";

export default function GithubLink() {
	return (
		<a
			className="github"
			href="https://github.com/ozzy1136/rest-countries-api-with-color-theme-switcher"
		>
			<span>View on GitHub</span>
			<GithubLogo className="github-logo" />
		</a>
	);
}
