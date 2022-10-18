import { useEffect, useRef } from "react";
import { LazyLoadImage } from "react-lazy-load-image-component";

import { focusFirstDescendant } from "../helpers";
import useFetch from "../hooks/useFetch";
import { ReactComponent as BackButtonIcon } from "./left-arrow.svg";

/**
 * @param {Object} props
 * @param {Object} props.data
 * @param {{png: string, svg: string}} props.data.flags - String values are URLs
 * @param {{
 *   common: string,
 *   official: string,
 *   nativeName: Object.<string, {official: string, common: string}>
 * }} props.data.name - nativeName uses props.data.languages keys for own keys
 * @param {Array.<string>} props.data.tld
 * @param {Object.<string, {name: string, symbol: string}>} props.data.currencies
 * @param {Array.<string>} props.data.capital
 * @param {string} props.data.region
 * @param {string} props.data.subregion
 * @param {Object.<string, string>} props.data.languages - Keys are the language initials
 * @param {Array.<string>} props.data.borders
 * @param {number} props.data.population
 */
export default function CountryDetails({ data, handleClosed }) {
	const container = useRef(null);
	const { data: borders, error: fetchBordersError } = useFetch(
		!data.borders.length
			? null
			: `https://restcountries.com/v3.1/alpha?codes=${data.borders.join(
					","
			  )}&fields=name`
	);

	useEffect(() => {
		focusFirstDescendant(container.current);
	}, []);

	useEffect(() => {
		document.addEventListener("keyup", handleEscape);

		return () => {
			document.removeEventListener("keyup", handleEscape);
		};
	});

	function handleEscape(event) {
		if (event.which === 27 || event.keyCode === 27) {
			handleClosed({ type: "country_details_closed" });
			event.stopPropagation();
		}
	}

	return (
		<section className="l-details page-section-container" ref={container}>
			<div className="details-backButton">
				<button
					className="details-backButton-el"
					type="button"
					onClick={() => {
						handleClosed({ type: "country_details_closed" });
					}}
				>
					<BackButtonIcon className="details-backButton-el-icon" />{" "}
					Back
				</button>
			</div>
			<article className="details">
				<div className="details-heading details-child">
					<h2 id="country-details-heading">{data.name.common}</h2>
				</div>
				<div className="details-flag details-child">
					<LazyLoadImage
						src={data.flags.png}
						alt={`National flag of ${data.name.common}`}
						threshold={0}
						className="card-flag-img"
					/>
					<img
						className="details-flag-img"
						alt={`National flag of ${data.name.common}`}
					/>
				</div>
				<div className="details-info details-child">
					<div className="details-info-primary">
						<div className="list-commas details-info-content">
							<p className="details-info-category list-commas-title">
								Native names:&nbsp;
							</p>
							{!!Object.keys(data.name.nativeName).length ? (
								<ul className="list-commas-content">
									{Object.values(data.name.nativeName).map(
										(curr, index) => (
											<li
												className="details-info-value list-commas-content-item"
												key={index}
											>
												{curr.common}
											</li>
										)
									)}
								</ul>
							) : (
								<p className="details-info-value">None</p>
							)}
						</div>
						<p className="details-info-category details-info-content">
							Population:{" "}
							<span className="details-info-value">
								{data.population.toLocaleString()}
							</span>
						</p>
						<p className="details-info-category details-info-content">
							Region:{" "}
							<span className="details-info-value">
								{data.region}
							</span>
						</p>
						<p className="details-info-category details-info-content">
							Sub Region:{" "}
							<span className="details-info-value">
								{!!data.subregion ? data.subregion : "None"}
							</span>
						</p>
						<p className="details-info-category details-info-content">
							Capital:{" "}
							<span className="details-info-value">
								{!!data.capital.length
									? data.capital[0]
									: "None"}
							</span>
						</p>
					</div>
					<div className="details-info-secondary">
						<p className="details-info-category details-info-content">
							Top Level Domain:{" "}
							<span className="details-info-value">
								{!!data.tld.length ? data.tld[0] : "None"}
							</span>
						</p>
						<div className="list-commas details-info-content">
							<p className="details-info-category list-commas-title">
								Currencies:&nbsp;
							</p>
							{!!Object.keys(data.currencies).length ? (
								<ul className="list-commas-content">
									{Object.values(data.currencies).map(
										(curr, index) => (
											<li
												className="details-info-value list-commas-content-item"
												key={index}
											>
												{curr.name}
											</li>
										)
									)}
								</ul>
							) : (
								<p className="details-info-value">None</p>
							)}
						</div>
						<div className="list-commas details-info-content">
							<p className="details-info-category list-commas-title">
								Languages:&nbsp;
							</p>
							{!!Object.keys(data.languages).length ? (
								<ul className="list-commas-content">
									{Object.values(data.languages).map(
										(curr, index) => (
											<li
												className="details-info-value list-commas-content-item"
												key={index}
											>
												{curr}
											</li>
										)
									)}
								</ul>
							) : (
								<p className="details-info-value">None</p>
							)}
						</div>
					</div>
				</div>
				<div className="details-borders details-child">
					<p className="details-borders-category">
						Border Countries:&nbsp;
					</p>
					{!data.borders.length ? (
						<p className="details-borders-value">None</p>
					) : fetchBordersError ? (
						<p className="details-borders-value">
							There was an error getting the border countries
						</p>
					) : !borders ? (
						<p className="details-borders-value">
							Loading borders...
						</p>
					) : (
						<ul className="details-borders-list">
							{borders.map((curr, index) => (
								<li
									className="details-borders-value details-borders-list-item"
									key={index}
								>
									{curr.name.common}
								</li>
							))}
						</ul>
					)}
				</div>
			</article>
		</section>
	);
}
