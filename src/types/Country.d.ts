interface Country {
    name: {
        common: string;
        official: string;
        nativeName: Record<
            string,
            {
                official: string;
                common: string;
            }
        >;
    };
    currencies: Record<
        string,
        {
            name: string;
            symbol: string;
        }
    >;
    languages: Record<string, string>;
    population: number;
    area: number;
    flags: {
        png: string;
        svg: string;
        alt: string;
    };
    borders: string[];
}
