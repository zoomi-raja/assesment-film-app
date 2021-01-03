// libraries
import { Fragment, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { NoRecord } from "../../compnents/ui/no-record/no-record";

//components
import {Spinner} from '../../compnents/ui/spinner';
import { requestApi } from "../../utilities/request";

// styles
import './index.css';

function Detail() {
  const { slug } = useParams();
  const [film,setFilm] = useState({});
  //fetch film by slug
  useEffect(()=>{
    async function fetchDate(){
      const films = await requestApi({url:`/film/${slug}`});
      if(films.statusCode == 404){
        setFilm({notfound:true});
      }else{
        setFilm({...films});
      }
    }
    fetchDate();
  },[setFilm]);

  let html = <Spinner />
  if(film.id){
    html = (
      <div
      style={{ backgroundImage: `linear-gradient(to left, #070707, #070707, transparent), url(${film.photo})` }}
      className="Detail"
      >
        <h4 className="Detail-price">Ticket Price: {film.ticket_price} AED</h4>
        <h2 className="Detail-heading">
          <strong>{film.name} </strong>
          <span>({film.rel_date})</span>
        </h2>
        <h3 className="Detail-genre">{film.genres.map((genre)=>{return genre.name}).join(', ')}</h3>

        <p className="Detail-plot">{film.description}</p>

        <div className="Detail-list">
          <span className="Detail-listKey">Country: </span>
          <span>{film.country}</span>
        </div>

        <div className="Detail-list">
          <span className="Detail-listKey">Rating: </span>
          <span>{film.rating}</span>
        </div>

        <div className="Detail-list">
          <span className="Detail-listKey">Ticket: </span>
          <span>{film.ticket_price} AED</span>
        </div>

        <div className="Detail-list">
          <span className="Detail-listKey">Released: </span>
          <span>{film.rel_date}</span>
        </div>
      </div>
    )
  }
  if(film.notfound)
    html = <NoRecord />
  
  return (
    <Fragment>
      {html}
    </Fragment>
  );
}

export default Detail;
