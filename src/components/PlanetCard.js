import React, { useState, useEffect } from "react";
import axios from "axios";
import { motion } from "framer-motion";

const PlanetCard = ({ planet }) => {
  const [residents, setResidents] = useState([]);
  const [showResidents, setShowResidents] = useState(false);

  useEffect(() => {
    const fetchResidents = async () => {
      const residentPromises = planet.residents.map((url) => axios.get(url));
      const residentData = await Promise.all(residentPromises);
      setResidents(residentData.map((res) => res.data));
    };

    fetchResidents();
  }, [planet]);

  const toggleResidentsDropdown = () => {
    setShowResidents(!showResidents);
  };

  const formatPopulation = (population) => {
    if (population >=  1000000000) {
      return `${(population /  1000000000).toFixed(1)}B`;
    } else if (population >=  1000000) {
      return `${(population /  1000000).toFixed(1)}M`;
    } else if (population >=  1000) {
      return `${(population /  1000).toFixed(1)}k`;
    } else {
      return population;
    }
  };

  const cardVariants = {
    hidden: { opacity:   0, scale:   0.9 },
    visible: { opacity:   1, scale:   1 },
    exit: { opacity:   0, scale:   0.9 },
  };

  return (
    <motion.div
      className="rounded overflow-hidden shadow-lg m-4 w-[60vw] lg:w-[60vw] bg-black ring-2 ring-[#ffde04] ring-opacity-50"
      initial="hidden"
      animate="visible"
      exit="exit"
      variants={cardVariants}
    >
      <div className="px-6 py-4 flex flex-col lg:flex-row justify-center lg:justify-between">
        <div>
          <div className="font-bold text-xl mb-2 text-[#ffde04]">
            {planet.name}
          </div>
          <div>
            <p className="text-gray-400 text-base">
              <span className="text-[#ffde04]">Climate: </span>{planet.climate} <br />
            </p>
          </div>
          <div>
            <p className="text-gray-400 text-base">
            <span className="text-[#ffde04]">Population: </span>{formatPopulation(planet.population)} <br />
            </p>
          </div>
          <div>
            <p className="text-gray-400 text-base"><span className="text-[#ffde04]">Terrain: </span>{planet.terrain}</p>
          </div>
        </div>
        <div>
          <button
            onClick={toggleResidentsDropdown}
            className="mt-4 bg-[#ffde04] hover:bg-[#ffc004] text-black font-bold py-1 px-2 rounded transition duration-200 ease-in-out transform hover:scale-105"
          >
            View Residents
          </button>
          {showResidents && (
            <motion.div
              className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
              initial={{ opacity:   0 }}
              animate={{ opacity:   1 }}
              exit={{ opacity:   0 }}
              transition={{ duration:   0.5 }}
            >
              <motion.div
                className="bg-[#0000004b] rounded-lg p-4 shadow-lg"
                initial={{ scale:   0.9 }}
                animate={{ scale:   1 }}
                exit={{ scale:   0.9 }}
                transition={{ duration:   0.5 }}
              >
                <h2 className="text-2xl font-bold mb-4 text-center">Residents</h2>
                <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-2">
                  {residents.map((resident, index) => (
                    <div
                      key={index}
                      className="bg-black rounded-lg p-1 lg:p-3 shadow-md flex flex-col"
                      style={{ boxShadow: '0  4px  6px rgba(255,  204,  0,  0.6),  0  1px  3px rgba(255,  204,  0,  0.06)' }}
                    >
                      <h3 className="text-md lg:text-xl font-semibold mb-2 text-[#ffde04]">{resident.name}</h3>
                      <p className="text-gray-400"><span className="text-[#ffde04]">Height: </span>{resident.height}</p>
                      <p className="text-gray-400"><span className="text-[#ffde04]">Mass: </span>{resident.mass}</p>
                      <p className="text-gray-400"><span className="text-[#ffde04]">Gender: </span>{resident.gender}</p>
                    </div>
                   ))}
                </div>
                <button
                  onClick={toggleResidentsDropdown}
                  className="mt-4 bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded mx-auto"
                >
                  Close
                </button>
              </motion.div>
            </motion.div>
          )}
        </div>
      </div>
    </motion.div>
  );
};

export default PlanetCard;