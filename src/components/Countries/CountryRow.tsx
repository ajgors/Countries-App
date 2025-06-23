interface Props {
    country: Country;
    style: React.CSSProperties;
}

export function CountryRow({ country, style }: Props) {
    const firstCurrency = Object.values(country.currencies || {})[0];
    const firstCurrencyName = firstCurrency?.name ?? 'N/A';

    const firstLanguage = Object.values(country.languages || {})[0] ?? 'N/A';

    return (
        <div
            style={{ ...style, display: 'flex', borderBottom: '1px solid #ddd', padding: '8px 0' }}
        >
            <div style={{ flex: 2, textAlign: 'center' }}>{country.name.common}</div>
            <div style={{ flex: 2, textAlign: 'center' }}>{firstCurrencyName}</div>
            <div style={{ flex: 2, textAlign: 'center' }}>{firstLanguage}</div>
            <div style={{ flex: 1, textAlign: 'center' }}>{country.area}</div>
            <div style={{ flex: 2, textAlign: 'center' }}>{country.population}</div>
            <div style={{ flex: 1, textAlign: 'center' }}>
                <img
                    src={country.flags.png}
                    alt={country.flags.alt}
                    style={{ width: '40px', display: 'inline-block' }}
                />
            </div>
        </div>
    );
}
