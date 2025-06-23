import Navbar from '@components/NavBar';
import { CountriesProvider } from '@contexts/CountriesContext';
import { Dashboard } from '@routes/Dashboard/Dashboard';
import { BrowserRouter, Route, Routes } from 'react-router';
import { Index } from './routes/Index/Index';

export default function App() {
    return (
        <>
            <BrowserRouter>
                <CountriesProvider>
                    <Navbar />
                    <Routes>
                        <Route index element={<Index />} />
                        <Route path="dashboard" element={<Dashboard />} />
                    </Routes>
                </CountriesProvider>
            </BrowserRouter>
        </>
    );
}
