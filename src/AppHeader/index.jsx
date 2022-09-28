import { ReactComponent as MoonIcon } from "./icon-moon.svg";
import { ReactComponent as SunIcon } from "./icon-sun.svg";

export default function AppHeader({ darkMode, setDarkMode }) {
	return (
		<header className="l-app-header page-section-container">
			<div className="app-header-heading">
				<h1 className="app-header-heading-text">Where in the world?</h1>
			</div>
			<div className="app-header-themeToggle">
				<button
					className="app-header-themeToggle-button"
					type="button"
					onClick={() => setDarkMode(!darkMode)}
				>
					{darkMode ? (
						<span>
							<SunIcon />
							&ensp;Light Mode
						</span>
					) : (
						<span>
							<MoonIcon />
							&ensp;Dark Mode
						</span>
					)}
				</button>
			</div>
		</header>
	);
}
