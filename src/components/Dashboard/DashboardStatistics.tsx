import './DashboardStatistics.css';
import Button from '@components/Button';
import { useCountries } from '@contexts/CountriesContext';
import { useState } from 'react';
import { BarChart } from './BarChart';

type Chart = 'population' | 'area';

export default function DashboardStatistics() {
    const [currentChart, setCurrentChart] = useState<Chart>('population');
    const { countries } = useCountries();

    const topFiveLanguages = Object.entries(
        countries.reduce(
            (acc, country) => {
                const firstLanguage = Object.values(country.languages || {})[0] ?? 'N/A';

                acc[firstLanguage] = (acc[firstLanguage] || 0) + 1;
                return acc;
            },
            {} as Record<string, number>
        )
    )
        .sort((a, b) => b[1] - a[1])
        .slice(0, 5);

    const topFiveCurrencies = Object.entries(
        countries.reduce(
            (acc, country) => {
                const firstCurrency = Object.values(country.currencies || {})[0];
                const firstCurrencyName = firstCurrency?.name ?? 'N/A';

                acc[firstCurrencyName] = (acc[firstCurrencyName] || 0) + 1;
                return acc;
            },
            {} as Record<string, number>
        )
    )
        .sort((a, b) => b[1] - a[1])
        .slice(0, 5);

    const averagePopulation = Math.floor(
        countries.reduce((acc, country) => acc + country.population, 0) / countries.length
    );

    const averageArea = Math.floor(
        countries.reduce((acc, country) => acc + country.area, 0) / countries.length
    );

    const averageNeighbours =
        countries.reduce((acc, country) => acc + country.borders.length, 0) / countries.length;

    const topTwentyByPopulation = [...countries]
        .sort((a, b) => b.population - a.population)
        .slice(0, 20);

    const populationlabels = topTwentyByPopulation.map(country => country.name.common);
    const populationData = topTwentyByPopulation.map(country => country.population / 1000000);

    const topTwentyByArea = [...countries].sort((a, b) => b.area - a.area).slice(0, 20);
    const areLabels = topTwentyByArea.map(country => country.name.common);
    const areaData = topTwentyByArea.map(country => country.area);

    return (
        <>
            <div className="dashboard-container">
                <h1 className="dashboard-title">🌍 Countries Statistics</h1>

                <div className="stats-grid">
                    <div className="stat-card">
                        <h2 className="stat-title">🌐 Total Countries</h2>
                        <p className="stat-value">{countries.length}</p>
                    </div>

                    <div className="stat-card">
                        <h2 className="stat-title">📊 Avg. Population</h2>
                        <p className="stat-value">{averagePopulation.toLocaleString()}</p>
                    </div>

                    <div className="stat-card">
                        <h2 className="stat-title">🗺️ Avg. Area</h2>
                        <p className="stat-value">{averageArea.toLocaleString()} km²</p>
                    </div>

                    <div className="stat-card">
                        <h2 className="stat-title">🤝 Avg. Neighbours</h2>
                        <p className="stat-value">{averageNeighbours.toFixed(2)}</p>
                    </div>
                </div>

                <div className="stat-section">
                    <h2 className="stat-subtitle">🗣️ Top 5 Languages</h2>
                    <ul className="stat-list">
                        {topFiveLanguages.map(([lang, count]) => (
                            <li key={lang} className="stat-badge">
                                {lang} ({count})
                            </li>
                        ))}
                    </ul>
                </div>

                <div className="stat-section">
                    <h2 className="stat-subtitle">💱 Top 5 Currencies</h2>
                    <ul className="stat-list">
                        {topFiveCurrencies.map(([currency, count]) => (
                            <li key={currency} className="stat-badge">
                                {currency} ({count})
                            </li>
                        ))}
                    </ul>
                </div>
            </div>

            <div className="chart-container">
                {currentChart === 'population' ? (
                    <BarChart
                        header="Top 20 Countries by Population in millions"
                        labels={populationlabels}
                        data={populationData}
                        datasetLabel="Population"
                    />
                ) : (
                    <BarChart
                        header="Top 20 Countries by Area"
                        labels={areLabels}
                        data={areaData}
                        datasetLabel="Area"
                    />
                )}
                <Button
                    text={`Switch chart to ${currentChart === 'area' ? 'population' : 'area'}`}
                    size="md"
                    onClick={() => setCurrentChart(currentChart === 'area' ? 'population' : 'area')}
                />
            </div>
        </>
    );
}
