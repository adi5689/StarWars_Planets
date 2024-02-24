import React from "react";
//, { useState, useEffect } 
import Radar from "./components/radar/Radar";
// import useFetchData from "./services/useFetchData";
import PlanetsList from "./components/PlanetsList";

function App() {

  return (
    <div className="App bg-black text-white min-h-screen">
      <div className="flex flex-col lg:flex-row justify-center items-center w-full h-[25vh] lg:h-[70vh]">
        <div className="flex flex-col lg:flex-row justify-between gap-20 lg:gap-60">
          <div className="flex items-center justify-center">
            <img
              src="https://vectordiary.com/wp-content/uploads/2021/03/star-wars-logo-joe-johnston.jpg"
              alt="ass"
              className="w-40 lg:w-[60vw]"
            />
          </div>
          <div className="w-full lg:w-2/5 flex justify-center">
            <Radar />
          </div>
        </div>
      </div>
      <div>
        <div className="p-10 flex flex-col justify-center items-center">
          <h1 className="text-3xl lg:text-6xl font-bold text-yellow-400 text-center mb-14 mt-60 lg:mt-0">PLANETS</h1>
          <PlanetsList />
        </div>
      </div>
    </div>
  );
}

export default App;
