
import React, { useState } from 'react';
import axios from 'axios';
import './assets/estilo.css';

const Countries = () => {
    const [countryName, setCountryName] = useState('');
    const [countries, setCountries] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const API_URL = `https://restcountries.com/v3.1/name/${countryName}`;

    const fetchCountries = async () => {
        setLoading(true);
        setError(null);

        try {
            const response = await axios.get(API_URL);
            setCountries(response.data);
        } catch (err) {
            setError('Não foi possível buscar os dados dos países. Verifique o nome e tente novamente.');
        } finally {
            setLoading(false);
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        fetchCountries();
    };

    return (
        <body>
            <div>
                <h2>Informações sobre Países</h2>
                <form onSubmit={handleSubmit}>
                    <input
                        type="text"
                        value={countryName}
                        onChange={(e) => setCountryName(e.target.value)}
                        placeholder="Digite o nome do país"
                    />
                    <button type="submit">Buscar</button>
                </form>

                {loading && <p>Carregando...</p>}
                {error && <p style={{ color: 'red' }}>{error}</p>}
                {countries.length > 0 && (
                    <div id='card-pais'>
                        {countries.map((country) => (
                            <div key={country.cca3}>
                                <h3>{country.name.common}</h3>
                                <p>Capital: {country.capital ? country.capital[0] : 'N/A'}</p>
                                <p>População: {country.population.toLocaleString()}</p>
                                <p>Região: {country.region}</p>
                                <p>Sub-região: {country.subregion}</p>
                                <p>Área: {country.area.toLocaleString()} km²</p>
                                <img src={country.flags.png} alt={`Flag of ${country.name.common}`} width="100" />
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </body>
    );
};

export default Countries;
