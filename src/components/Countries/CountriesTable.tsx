import Button from '@components/Button';
import { useMemo, useState } from 'react';
import { FixedSizeList, type ListChildComponentProps } from 'react-window';
import { CountryRow } from './CountryRow';

interface Props {
    countries: Country[];
}

type SortColumn = 'name' | 'currency' | 'language' | 'area' | 'population';
type SortDirection = 'asc' | 'desc';

export function CountryTable({ countries }: Props) {
    const [sortColumn, setSortColumn] = useState<SortColumn | null>(null);
    const [sortDirection, setSortDirection] = useState<SortDirection>('asc');

    const toggleSort = (column: SortColumn) => {
        if (sortColumn === column) {
            setSortDirection(prev => (prev === 'asc' ? 'desc' : 'asc'));
        } else {
            setSortColumn(column);
            setSortDirection('asc');
        }
    };

    const sortedCountries = useMemo(() => {
        if (!sortColumn) {
            return countries;
        }

        return [...countries].sort((a, b) => {
            let aVal: string | number = '';
            let bVal: string | number = '';

            switch (sortColumn) {
                case 'name':
                    aVal = a.name.common;
                    bVal = b.name.common;
                    break;
                case 'currency':
                    aVal = Object.values(a.currencies || {})[0]?.name || '';
                    bVal = Object.values(b.currencies || {})[0]?.name || '';
                    break;
                case 'language':
                    aVal = Object.values(a.languages || {})[0] || '';
                    bVal = Object.values(b.languages || {})[0] || '';
                    break;
                case 'area':
                    aVal = a.area;
                    bVal = b.area;
                    break;
                case 'population':
                    aVal = a.population;
                    bVal = b.population;
                    break;
            }

            if (typeof aVal === 'string' && typeof bVal === 'string') {
                return sortDirection === 'asc'
                    ? aVal.localeCompare(bVal)
                    : bVal.localeCompare(aVal);
            }

            if (typeof aVal === 'number' && typeof bVal === 'number') {
                return sortDirection === 'asc' ? aVal - bVal : bVal - aVal;
            }

            return 0;
        });
    }, [countries, sortColumn, sortDirection]);

    const getSortIcon = (column: SortColumn) => {
        if (sortColumn !== column) {
            return '↕';
        }
        return sortDirection === 'asc' ? '↑' : '↓';
    };

    const Row = ({ index, style, data }: ListChildComponentProps<Country[]>) => {
        const country = data[index];
        return <CountryRow country={country} style={style} />;
    };

    return (
        <div style={{ width: '100%', overflowX: 'auto', maxWidth: '1000px', marginBottom: '20px' }}>
            <div style={{ minWidth: '600px' }}>
                <div
                    style={{
                        display: 'flex',
                        fontSize: '20px',
                        fontWeight: 'bold',
                        borderBottom: '2px solid #aaa',
                        alignItems: 'center',
                        padding: '10px 0',
                        width: '100%'
                    }}
                >
                    <div style={{ flex: 2, textAlign: 'center' }}>
                        <Button
                            size="sm"
                            text={`name ${getSortIcon('name')}`}
                            onClick={() => toggleSort('name')}
                        />
                    </div>
                    <div style={{ flex: 2, textAlign: 'center' }}>
                        <Button
                            size="sm"
                            text={`currency ${getSortIcon('currency')}`}
                            onClick={() => toggleSort('currency')}
                        />
                    </div>
                    <div style={{ flex: 2, textAlign: 'center' }}>
                        <Button
                            size="sm"
                            text={`language ${getSortIcon('language')}`}
                            onClick={() => toggleSort('language')}
                        />
                    </div>
                    <div style={{ flex: 1, textAlign: 'center' }}>
                        <Button
                            size="sm"
                            text={`area ${getSortIcon('area')}`}
                            onClick={() => toggleSort('area')}
                        />
                    </div>
                    <div style={{ flex: 2, textAlign: 'center' }}>
                        <Button
                            size="sm"
                            text={`population ${getSortIcon('population')}`}
                            onClick={() => toggleSort('population')}
                        />
                    </div>
                    <div style={{ flex: 1, textAlign: 'center' }}>flag</div>
                </div>

                <FixedSizeList
                    height={500}
                    width={'100%'}
                    itemSize={60}
                    itemCount={sortedCountries.length}
                    itemData={sortedCountries}
                >
                    {Row}
                </FixedSizeList>
            </div>
        </div>
    );
}
