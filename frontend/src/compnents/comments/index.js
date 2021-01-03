// styles
import { useState } from 'react';
import { requestApi } from '../../utilities/request';
import './index.css';

function Comment({data,film_id,onAdd}) {
  //states
  const [name,setName] = useState('');
  const [errors,setErrors] = useState({});
  const [comment,setComment] = useState('');
  let options = {  
    year: "numeric", month: "short",day: "numeric"  
  }; 
  let dumyImg = 'https://images-na.ssl-images-amazon.com/images/M/MV5BMjEyOTYyMzUxNl5BMl5BanBnXkFtZTcwNTg0MTUzNA@@._V1_SX1500_CR0,0,1500,999_AL_.jpg';

  //util function
  const setError = (errors) => {
    if(errors.length > 0){
      const errorObj = errors.reduce( (obj,error) => {
        obj[error.entity] = error.message;
        return obj;
      },{});
      setErrors(errorObj);
    }
  }
  const handleRegister = async(e) => {
    e.preventDefault();
    const data = {name, comment};
    try{
      const comment = await requestApi({url:`/film/${film_id}/comment`,data});
      if(comment.error)
        setError(comment.message);
      else{
        onAdd(comment);
        setComment('');
      }
    }catch(e){
      console.log(e);
    }

  }
  return (
    <div className="Comments">
      <h3 className="Comments-heading">Reviews</h3>

      <form action="post" className="Comments-form" onSubmit={handleRegister}>
        <label className="Form-label" htmlFor="name">
          <span className="Form-text">Name</span>
          <input value={name} onChange={(e)=>setName(e.target.value)} className="Form-input" name="name" type="text" placeholder="Place enter name" required/>
          {errors.name && <span className="error">{errors.name}</span>}
        </label>
        <label className="Form-label">
          <textarea value={comment} onChange={(e)=>setComment(e.target.value)} className="Form-textarea" placeholder="Share your thoughts..."/>
          {errors.comment && <span className="error">{errors.comment}</span>}
        </label>
        <button className="Form-btn" type="submit">Submit</button>
      </form>
      
      {(data || []).length > 0 && data.map(({ id,name,comment,created_at }) => (
        <div className="Comment" key={id}>
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
