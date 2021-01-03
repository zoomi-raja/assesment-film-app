// styles
import { Link } from 'react-router-dom';
import { NoRecord } from '../../compnents/ui/no-record/no-record';
import './index.css';

function List({ data = [] }) {
  if (!data.length) {
    return (<NoRecord />);
  }

  return (
    <div className="List-wrapper">
      <div className="List">
        {data && data.map((item, index) => (
          <div className="List-item" key={index}>
            <Link
              to={`/films/${item.slug}`}
              className="List-itemLink"
            >
              <div
                style={{ backgroundImage: `url(${item.photo})`}}
                className="List-itemImg"
              />
  
              <div className="List-itemTitle">{item.name} ({item.rel_date})</div>
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
}

export default List;
