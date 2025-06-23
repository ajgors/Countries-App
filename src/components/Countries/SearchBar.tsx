import './SearchBar.css';
import { type Dispatch, type SetStateAction, useEffect, useState } from 'react';
import { useDebounce } from 'use-debounce';

interface Props {
    filterText: string;
    onFilterTextChange: Dispatch<SetStateAction<string>>;
}

export function SearchBar({ filterText, onFilterTextChange }: Props) {
    const [inputValue, setInputValue] = useState(filterText);
    const [debouncedValue] = useDebounce(inputValue, 200);

    useEffect(() => {
        onFilterTextChange(debouncedValue);
    }, [debouncedValue, onFilterTextChange]);

    return (
        <form className="search-form" onSubmit={e => e.preventDefault()}>
            <label htmlFor="country" className="search-label">
                🌍 Search Country
            </label>
            <input
                type="text"
                name="country"
                className="search-input"
                placeholder="Type a country filter..."
                value={inputValue}
                onChange={e => setInputValue(e.target.value)}
            />
        </form>
    );
}
