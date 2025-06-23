import { createContext, useContext, useEffect, useState } from 'react';

interface CountriesContextProps {
    countries: Country[];
    isLoading: boolean;
}

const CountriesContext = createContext<CountriesContextProps | undefined>(undefined);

export const CountriesProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [countries, setCountries] = useState<Country[]>([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        async function fetchCountries() {
            try {
                const res = await fetch(
                    'https://restcountries.com/v3.1/all?fields=name,currencies,languages,population,area,flags,borders'
                );
                if (res.ok) {
                    const data = (await res.json()) as Country[];
                    setCountries(data);
                }
            } catch (error) {
                console.error(error);
            } finally {
                setIsLoading(false);
            }
        }

        void fetchCountries();
    }, []);

    return (
        <CountriesContext.Provider value={{ countries, isLoading }}>
            {children}
        </CountriesContext.Provider>
    );
};

export function useCountries() {
    const context = useContext(CountriesContext);
    if (!context) {
        throw new Error('useCountries must be used within a CountriesProvider');
    }
    return context;
}
