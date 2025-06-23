import './FilterableCountriesTable.css';
import { useCountries } from '@contexts/CountriesContext';
import { useState } from 'react';
import { CountryTable } from './CountriesTable';
import { PopulationFilter } from './PopulationFilter';
import { SearchBar } from './SearchBar';

export interface PopulationFilter {
    minPopulation: string;
    maxPopulation: string;
}

export function FilterableCountryTable() {
    const [filterText, setFilterText] = useState<string>('');
    const [populationFilter, setPopulationFilter] = useState<PopulationFilter>({
        maxPopulation: '',
        minPopulation: ''
    });

    const { countries } = useCountries();

    const filteredCountries = countries.filter(country => {
        const matchesName = country.name.common.toLowerCase().startsWith(filterText.toLowerCase());

        const firstCurrency = Object.values(country.currencies || {})[0];
        const firstCurrencyName = firstCurrency?.name ?? 'N/A';

        const firstLanguage = Object.values(country.languages || {})[0] ?? 'N/A';

        const matchesCurrency = firstCurrencyName
            .toLocaleLowerCase()
            .startsWith(filterText.toLocaleLowerCase());
        const matchesLanguage = firstLanguage
            .toLocaleUpperCase()
            .startsWith(filterText.toLocaleUpperCase());
        const matchesPopulation = country.population
            .toString()
            .startsWith(filterText.toLocaleUpperCase());
        const matchesArea = country.area.toString().startsWith(filterText.toLocaleUpperCase());

        const minPop = parseInt(populationFilter.minPopulation, 10);
        const maxPop = parseInt(populationFilter.maxPopulation, 10);
        const pop = country.population;

        const matchesMin = isNaN(minPop) ? true : pop >= minPop;
        const matchesMax = isNaN(maxPop) ? true : pop <= maxPop;

        return (
            (matchesName ||
                matchesCurrency ||
                matchesLanguage ||
                matchesPopulation ||
                matchesArea) &&
            matchesMin &&
            matchesMax
        );
    });

    return (
        <>
            <div className="countries-container">
                <div className="countries-inner-container">
                    <SearchBar filterText={filterText} onFilterTextChange={setFilterText} />
                    <PopulationFilter
                        populationFilter={populationFilter}
                        onPopulationFilterChange={setPopulationFilter}
                    />
                </div>
                <CountryTable countries={filteredCountries} />
            </div>
        </>
    );
}
