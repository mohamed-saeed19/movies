import React from "react";

export default function About({ setfavourites, favourites ,favouriteSeries,setfavouriteSeries }) {
  console.log(favourites);
  function DeleteMoviesFromFavourites(movie) {
    let filterFavourit = favourites.filter((item) => item.id !== movie.id);
    setfavourites(filterFavourit);
  }
  function DeleteSeriesFromFavourites(movie) {
    let filterFavourite = favouriteSeries.filter((item) => item.id !== movie.id);
    setfavouriteSeries(filterFavourite);
  }
  return (
    <>
      <div className="row  d-flex justify-content-center align-item-center">
        <h2 className="text-center pb-4">Favourites Movies</h2>
        {favourites.slice(0, 10).map((movie, index) => (
          <div key={index} className="col-md-2 ">
            <div className=" position-relative scl ">
              <img
                className="w-100 ContentImage"
                src={"https://image.tmdb.org/t/p/w500" + movie.poster_path}
                alt="pho"
              />
              <h6 className="my-2">{movie.title}</h6>
              <div className="bg-transparent p-1 position-absolute top-0 end-0">
                {movie.vote_average?.toFixed(1)}
              </div>
              <div>
                <button
                  className="star m-2"
                  onClick={()=>DeleteMoviesFromFavourites(movie)}
                >
                  <i className="fa-solid fa-trash" style={{ color: "red" }}></i>
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
      <div className="row  d-flex justify-content-center align-item-center">
        <h2 className="text-center py-4">Favourites Series</h2>
        {favouriteSeries.slice(0, 10).map((movie, index) => (
          <div key={index} className="col-md-2 ">
            <div className=" position-relative scl ">
              <img
                className="w-100 ContentImage"
                src={"https://image.tmdb.org/t/p/w500" + movie.poster_path}
                alt="pho"
              />
              <h6 className="my-2">{movie.title}</h6>
              <div className="bg-transparent p-1 position-absolute top-0 end-0">
                {movie.vote_average?.toFixed(1)}
              </div>
              <div>
                <button
                  className="star m-2"
                  onClick={()=>DeleteSeriesFromFavourites(movie)}
                >
                  <i className="fa-solid fa-trash" style={{ color: "red" }}></i>
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </>
  );
}
