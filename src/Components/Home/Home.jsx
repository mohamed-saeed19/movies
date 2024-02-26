import axios from "axios";
import { link } from "joi";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

export default function Home() {
  const [trendigMovies, setTrendigMovies] = useState([]);
  const [trendigSeries, setTrendigSeries] = useState([]);
  const [trendigPeople, setTrendigPeople] = useState([]);

  async function getTrending(MediaType, func) {
    let { data } = await axios.get(
      `https://api.themoviedb.org/3/trending/${MediaType}/week?api_key=f1aca93e54807386df3f6972a5c33b50`
    );
    func(data.results);
  }
  useEffect(() => {
    getTrending("movie", setTrendigMovies);
    getTrending("tv", setTrendigSeries);
    getTrending("person", setTrendigPeople);
  }, []);
  return (
    <>
      <div className="row">
        <div className="col-md-4 d-flex align-items-center">
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
              <Link to={`mediaItem/${movie.id}/${movie.media_type}`}>
              <div className=" position-relative scl  ">
              <img
              className="w-100 "
              src={"https://image.tmdb.org/t/p/w500" + movie.poster_path}
              alt="pho"
            />
            <div className="bg-transparent p-1 position-absolute top-0 end-0">
              {movie.vote_average.toFixed(1)}
            </div>
            </div>
          </Link>
            
            
            <h6 className="my-2">{movie.title}</h6>
            
          </div>
        ))}
      </div>
      <div className="row py-5">
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
              <Link to={`mediaItem/${movie.id}/${movie.media_type}`}>
              <div className=" position-relative scl  ">
              <img
              className="w-100 "
              src={"https://image.tmdb.org/t/p/w500" + movie.poster_path}
              alt="pho"
            />
            <div className="bg-transparent p-1 position-absolute top-0 end-0">
              {movie.vote_average.toFixed(1)}
            </div>
            </div>
                </Link>

            
            
            <h6 className="my-2">{movie.name}</h6>
            
          </div>
        ))}
      </div>
      <div className="row">
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
