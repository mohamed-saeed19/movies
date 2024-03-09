import axios from "axios";
import React, { useEffect, useLayoutEffect, useState } from "react";
import { Link } from "react-router-dom";
import "./Home.css";

export default function Home({
  setfavourites,
  favourites,
  favouriteSeries,
  setfavouriteSeries,
}) {
  const [trendigMovies, setTrendigMovies] = useState([]);
  const [trendigSeries, setTrendigSeries] = useState([]);
  const [trendigPeople, setTrendigPeople] = useState([]);

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
  const [starColor, setStarColor] = useState("yellow");

  function handleAddToFavourites(fav) {
    if (starColor === "white") {
      setStarColor("yellow");
    } else {
      setStarColor("white");
    }
  }

  function addMovieToFavourites(movie) {
    if (!Boolean(favourites.find((item) => item.id === movie.id))) {
      favourites.push(movie);
    } else {
      let filterFavourit = favourites.filter((item) => item.id !== movie.id);
      setfavourites(filterFavourit);
    }
  }
  function addSeriesToFavourites(movie) {
    if (!Boolean(favouriteSeries.find((item) => item.id === movie.id))) {
      favouriteSeries.push(movie);
    } else {
      let filterFavourit = favouriteSeries.filter(
        (item) => item.id !== movie.id
      );
      setfavouriteSeries(filterFavourit);
    }
  }

  return (
    <>
      <div className="row" id="Movies">
        <div
          className="col-md-4 d-flex align-items-center"
          href="TrendingMovies"
        >
          <div>
            <div className="brdr w-25 mb-3"></div>
            <h2 className="h4">
              Trending <br />
              Movies <br />
              To Watch Right Now
            </h2>
            <p className="text-secondary">Most Watched Movies By Days</p>
            <div className="brdr w-100 mt-3"></div>
          </div>
        </div>
        {trendigMovies.slice(0, 10).map((movie, index) => (
          <div key={index} className="col-md-2 ">
            <div className=" position-relative scl ">
              <Link to={`mediaItem/${movie.id}/${movie.media_type}`}>
                <img
                  className="w-100 ContentImage"
                  src={"https://image.tmdb.org/t/p/w500" + movie.poster_path}
                  alt="pho"
                />
                <h6 className="my-2">{movie.title}</h6>
              </Link>
              <div className="bg-transparent p-1 position-absolute top-0 end-0">
                {movie.vote_average.toFixed(1)}
              </div>
              <div>
                <button
                  className="star m-2"
                  onClick={() => {
                    handleAddToFavourites(movie);
                    addMovieToFavourites(movie);
                  }}
                >
                  <i
                    className="fa-solid fa-star"
                    style={{
                      color: Boolean(
                        favourites.find((item) => item.id === movie.id)
                      )
                        ? "yellow"
                        : "white",
                    }}
                  ></i>
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
      <div className="row py-5 " id="tv">
        <div className="col-md-4 d-flex align-items-center">
          <div>
            <div className="brdr w-25 mb-3"></div>
            <h2 className="h4">
              Trending <br />
              Series <br />
              To Watch Right Now
            </h2>
            <p className="text-secondary">Most Watched Series By Days</p>
            <div className="brdr w-100 mt-3"></div>
          </div>
        </div>

        {trendigSeries.slice(0, 10).map((movie, index) => (
          <div key={index} className="col-md-2 ">
            <div className=" position-relative scl  ">
              <Link to={`mediaItem/${movie.id}/${movie.media_type}`}>
                <img
                  className="w-100 ContentImage"
                  src={"https://image.tmdb.org/t/p/w500" + movie.poster_path}
                  alt="pho"
                />
                <h6 className="my-2">{movie.name}</h6>
              </Link>
              <div className="bg-transparent p-1 position-absolute top-0 end-0">
                {movie.vote_average.toFixed(1)}
              </div>
              <div>
                <button
                  className="star m-2"
                  onClick={() => {
                    handleAddToFavourites(movie);
                    addSeriesToFavourites(movie);
                  }}
                >
                  <i
                    className="fa-solid fa-star"
                    style={{
                      color: Boolean(
                        favouriteSeries.find((item) => item.id === movie.id)
                      )
                        ? "yellow"
                        : "white",
                    }}
                  ></i>
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
      <div className="row " id="People">
        <div className="col-md-4 d-flex align-items-center">
          <div>
            <div className="brdr w-25 mb-3"></div>
            <h2 className="h4">
              Trending <br />
              Actors <br />
              To Watch Right Now
            </h2>
            <p className="text-secondary">Most Watched Actors By Days</p>
            <div className="brdr w-100 mt-3"></div>
          </div>
        </div>

        {trendigPeople.slice(0, 10).map((movie, index) => (
          <div key={index} className="col-md-2 ">
            <Link to={`mediaItem/${movie.id}/${movie.media_type}`}>
              <div className=" position-relative scl  ">
                <img
                  className="w-100 "
                  src={"https://image.tmdb.org/t/p/w500" + movie.profile_path}
                  alt="pho"
                />
                <div className="bg-transparent p-1 position-absolute top-0 end-0">
                  {movie.popularity.toFixed(1)}
                </div>
              </div>
            </Link>

            <h6 className="my-2">{movie.name}</h6>
          </div>
        ))}
      </div>
    </>
  );
}
