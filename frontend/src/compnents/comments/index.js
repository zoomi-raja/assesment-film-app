// styles
import './index.css';

function Comment({data}) {
  let options = {  
    year: "numeric", month: "short",day: "numeric"  
  }; 
  let dumyImg = 'https://images-na.ssl-images-amazon.com/images/M/MV5BMjEyOTYyMzUxNl5BMl5BanBnXkFtZTcwNTg0MTUzNA@@._V1_SX1500_CR0,0,1500,999_AL_.jpg';

  return (
    <div className="Comments">
      <h3 className="Comments-heading">Reviews</h3>

      <form action="#" className="Comments-form">
        <textarea className="Form-textarea" placeholder="Share your thoughts..."/>
        <button className="Form-btn" type="submit">Submit</button>
      </form>
      
      {(data || []).length > 0 && data.map(({ name,comment,created_at }) => (
        <div className="Comment">
          <div style={{ backgroundImage: `url(${dumyImg})`}} className="Comment-image"/>
    
          <div className="Comment-details">
            <h5 className="Comment-name">{name}</h5>
            <p className="Comment-copy">{comment}</p>
      
            <div className="Comment-actions">
              <time className="Comment-copy" dateTime={created_at}>{new Date(created_at).toLocaleTimeString("en-us", options)}</time>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

export default Comment;
