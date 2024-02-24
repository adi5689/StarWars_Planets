// src/components/PlanetsList.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import PlanetCard from './PlanetCard';

const PlanetsList = () => {
  const [planets, setPlanets] = useState([]);
  const [nextPage, setNextPage] = useState('https://swapi.dev/api/planets/?format=json');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchPlanets = async (url) => {
    setLoading(true);
    setError(null);
    try {
      const response = await axios.get(url);
      setPlanets(prev => [...prev, ...response.data.results]);
      setNextPage(response.data.next);
    } catch (error) {
      setError('Failed to load planets. Please try again later.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    // Fetch planets only when the component mounts
    if (nextPage) {
      fetchPlanets(nextPage);
    }
    // eslint-disable-next-line
  }, []); // Empty dependency array ensures this runs only on mount

  console.log(planets);

  const loadMore = () => {
    if (nextPage) {
      fetchPlanets(nextPage);
    }
  };

  return (
    <div>
      {planets.map((planet,i) => (
        <div key={i}> {/* Use a unique identifier as the key */}
          <PlanetCard planet={planet} />
        </div>
      ))}
      {loading && <div>Loading...</div>}
      {error && <div>{error}</div>}
      {!loading && nextPage && (
        <button onClick={loadMore} className="mt-4 bg-[#ffde04] hover:bg-[#ffc004] text-black font-bold py-2 px-4 rounded">
          Load More
        </button>
      )}
    </div>
  );
};

export default PlanetsList;
