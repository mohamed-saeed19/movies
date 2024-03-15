import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
export default function MediaItem() {
  let params = useParams();
const [itemDetails, setitemDetails] = useState({})  

  async  function getItemDetails() {
    let {data} =  await axios.get(`https://api.themoviedb.org/3/${params.mediaType}/${params.id}?api_key=f1aca93e54807386df3f6972a5c33b50`)
  setitemDetails(data);
  }
useEffect(() => {
  getItemDetails();
}, []); 

  return (
    <>
    <div className="row pt-2">
    <div className="col-md-4">
        {itemDetails.poster_path?<img className="w-100 "src={"https://image.tmdb.org/t/p/w500" + itemDetails.poster_path}alt="pho"/>:''}
        {itemDetails.profile_path?<img className="w-100 "src={"https://image.tmdb.org/t/p/w500" + itemDetails.profile_path}alt="pho"/>:''}
      </div>
      <div className="col-md-8">
        <h2>{itemDetails.title} {itemDetails.name}</h2>
        {itemDetails.birthday?<p className="py-2">Birthday : {itemDetails.birthday}</p>:""}
        {itemDetails.gender?<p className="py-2">Gender : {itemDetails.gender===1?'Female':'Male'}</p>:""}
        {itemDetails.place_of_birth?<p className="py-2">Place Of Birth : {itemDetails.place_of_birth}</p>:""}
        {itemDetails.biography?<p className="py-2">Biography : {itemDetails.biography}</p>:""}
        {itemDetails.vote_average?<p className="py-2">Vote : {itemDetails.vote_average?.toFixed(1)}</p>:""}
        {itemDetails.vote_count?<p className="py-2">Vote Count : {itemDetails.vote_count}</p>:""}
        <p className="py-2">Popularity : {itemDetails.popularity}</p>
        {itemDetails.release_date?<p className="py-2">ReleaseDate : {itemDetails.release_date}</p>:""}
        <p className="text-secondary">{itemDetails.overview}</p>

      </div>
    </div>
      
    </>
  );
}
