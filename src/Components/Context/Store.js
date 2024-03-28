import { createContext } from "react";
import axios from "axios";
import React, { useLayoutEffect, useState } from "react";

export let movieContext=createContext(0);
export default function MovieContextProvider(params) {
  const [trendigMovies, setTrendigMovies] = useState([]);
  const [trendigSeries, setTrendigSeries] = useState([]);
  const [trendigPeople, setTrendigPeople] = useState([]);
  const [starColor, setStarColor] = useState("yellow");

  async function getTrending(MediaType, func) {
    let { data } = await axios.get(
      `https://api.themoviedb.org/3/trending/${MediaType}/week?api_key=f1aca93e54807386df3f6972a5c33b50`
    );
    func(data.results);
  }
  useLayoutEffect(() => {
    getTrending("movie", setTrendigMovies);
    getTrending("tv", setTrendigSeries);
    getTrending("person", setTrendigPeople);
  }, []);

  return<movieContext.Provider value={{starColor,setStarColor,trendigPeople,trendigSeries,trendigMovies}}>
    {params.children}
  </movieContext.Provider>
}