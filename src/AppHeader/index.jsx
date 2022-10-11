import { ReactComponent as MoonIcon } from "./icon-moon.svg";
import { ReactComponent as SunIcon } from "./icon-sun.svg";

export default function AppHeader({ darkMode, setDarkMode }) {
	return (
		<header className="l-app-header page-section-container">
			<div className="app-header-heading">
				<h1 className="app-header-heading-text">Where in the world?</h1>
			</div>
			<div className="app-header-themeToggle">
				<label
					className="app-header-themeToggle-label"
					htmlFor="theme-toggle"
				>
					Dark mode theme toggle
				</label>
				<input
					className="sr-only"
					id="theme-toggle"
					type="checkbox"
					checked={darkMode ? true : false}
					onChange={() => setDarkMode(!darkMode)}
				/>

				<div
					className="app-header-themeToggle-currValue center-children"
					aria-hidden="true"
				>
					{darkMode ? (
						<>
							<SunIcon />
							<span>&ensp;Light Mode</span>
						</>
					) : (
						<>
							<MoonIcon />
							<span>&ensp;Dark Mode</span>
						</>
					)}
				</div>
			</div>
		</header>
	);
}
