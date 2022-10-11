import { useRef, useEffect } from "react";
import { LazyLoadImage } from "react-lazy-load-image-component";

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
export default function CountryCard({
	data,
	detailsDialog,
	setSelectedCountry,
}) {
	const container = useRef();
	const button = useRef();
	let down, up;

	function handleMousedown(e) {
		if (button.current !== e.target) {
			down = +new Date();
		}
	}

	function handleMouseup(e) {
		if (button.current !== e.target) {
			up = +new Date();

			if (up - down < 250) {
				button.current.focus();
				button.current.click();
			}
		}
	}

	useEffect(() => {
		let curr = container.current;
		if (curr) {
			curr.addEventListener("mousedown", handleMousedown);
			curr.addEventListener("mouseup", handleMouseup);
		}

		return () => {
			if (curr) {
				curr.removeEventListener("mousedown", handleMousedown);
				curr.removeEventListener("mouseup", handleMouseup);
			}
		};
	});

	return (
		<article className="card" ref={container}>
			<div className="card-heading">
				<h3 className="card-heading-title">{data.name.common}</h3>
				<button
					className="card-heading-button"
					type="button"
					ref={button}
					onClick={() => {
						setSelectedCountry(data);
						detailsDialog.current.show();
					}}
				>
					Open {data.name.common} details dialog
				</button>
			</div>
			<div className="card-flag">
				<LazyLoadImage
					src={data.flags.png}
					alt={`National flag of ${data.name.common}`}
					threshold={0}
					className="card-flag-img"
				/>
			</div>
			<div className="card-info">
				<p className="card-info-population card-info-text">
					<span className="card-info-category">Population:</span>{" "}
					{data.population.toLocaleString()}
				</p>
				<p className="card-info-region card-info-text">
					<span className="card-info-category">Region:</span>{" "}
					{data.region}
				</p>
				<p className="card-info-capital card-info-text">
					<span className="card-info-category">Capital:</span>{" "}
					{data.capital}
				</p>
			</div>
		</article>
	);
}
