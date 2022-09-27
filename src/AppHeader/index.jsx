import { ReactComponent as ToggleMoon } from "./toggle-moon.svg";
import { ReactComponent as ToggleSun } from "./toggle-sun.svg";

export default function AppHeader({ darkMode, setDarkMode }) {
	return (
		<header className="app-header page-section-container">
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
							<ToggleSun />
							&ensp;Light Mode
						</span>
					) : (
						<span>
							<ToggleMoon />
							&ensp;Dark Mode
						</span>
					)}
				</button>
			</div>
		</header>
	);
}
