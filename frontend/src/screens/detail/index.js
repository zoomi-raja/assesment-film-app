// libraries
import { useLocation, useParams } from "react-router-dom";

// data
import films from '../../movies.json';

// styles
import './index.css';

function Detail() {
  const { slug } = useParams();
  const film = films.find(film => film.slug === slug);

  return (
    <div
      style={{ backgroundImage: `linear-gradient(to left, #070707, #070707, transparent), url(${film.photo})` }}
      className="Detail"
    >
      <h4 className="Detail-price">Ticket Price: {film.ticket_price} AED</h4>
      <h2 className="Detail-heading">
        <strong>{film.name} </strong>
        <span>({film.rel_date})</span>
      </h2>
      <h3 className="Detail-genre">{film.genre}</h3>

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
  );
}

export default Detail;
