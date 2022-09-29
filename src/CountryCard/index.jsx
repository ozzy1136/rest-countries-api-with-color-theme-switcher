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
export default function CountryCard({ data }) {
	return (
		<article className="card">
			<object
				className="card-flag"
				data-svg={data.flags.svg}
				type="image/svg+xml"
			>{`National flag of ${data.name.official}`}</object>
			<div className="card-info">
				<h2 className="card-info-name">{data.name.common}</h2>
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
