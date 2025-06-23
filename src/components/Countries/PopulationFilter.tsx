import './PopulationFilter.css';
import { type Dispatch, type SetStateAction, useEffect, useState } from 'react';
import { useDebounce } from 'use-debounce';
import type { PopulationFilter } from './FilterableCountriesTable';

interface Props {
    populationFilter: PopulationFilter;
    onPopulationFilterChange: Dispatch<SetStateAction<PopulationFilter>>;
}

export function PopulationFilter({ populationFilter, onPopulationFilterChange }: Props) {
    const [localFilter, setLocalFilter] = useState<PopulationFilter>(populationFilter);
    const [debouncedFilter] = useDebounce(localFilter, 200);

    useEffect(() => {
        onPopulationFilterChange(debouncedFilter);
    }, [debouncedFilter, onPopulationFilterChange]);

    return (
        <form className="population-form" onSubmit={e => e.preventDefault()}>
            <div className="input-group">
                <label htmlFor="minPopulation">Min Population</label>
                <input
                    type="number"
                    name="minPopulation"
                    id="minPopulation"
                    placeholder="Enter min population"
                    value={localFilter.minPopulation}
                    onChange={e =>
                        setLocalFilter({ ...localFilter, minPopulation: e.target.value })
                    }
                />
            </div>

            <div className="input-group">
                <label htmlFor="maxPopulation">Max Population</label>
                <input
                    type="number"
                    name="maxPopulation"
                    id="maxPopulation"
                    placeholder="Enter max population"
                    value={localFilter.maxPopulation}
                    onChange={e =>
                        setLocalFilter({ ...localFilter, maxPopulation: e.target.value })
                    }
                />
            </div>
        </form>
    );
}
