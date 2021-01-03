// styles
import { useState } from 'react';
import '../../form.css';

function Create() {
  //states
  const[name,setName] = useState('');
  const[rating,setRating] = useState(0);
  const[country,setCountry] = useState('');
  const[release,setRelease] = useState('');
  const[genres,setGeneres] = useState([]);
  const[description,setDescription] = useState('');
  const[price,setPrice] = useState(0);
  const [errors,setErrors] = useState({});
  //fetch genre listing
  //util functions
  const setError = (errors) => {
    if(errors.length > 0){
      const errorObj = errors.reduce( (obj,error) => {
        obj[error.entity] = error.message;
        return obj;
      },{});
      setErrors(errorObj);
    }
  }
  
  return (
    <form className="Form" method="post">
      <label className="Form-label" htmlFor="name">
        <span className="Form-text">Name</span>
        <input value={name} className="Form-input" name="name" type="text" placeholder="Place enter name" required/>
        {errors.name && <span className="error">{errors.name}</span>}
      </label>

      <label className="Form-label" htmlFor="email">
        <span className="Form-text">Price</span>
        <input name={price} className="Form-input" name="price" type="number" placeholder="Enter ticket price" required/>
        {errors.ticket_price && <span className="error">{errors.ticket_price}</span>}
      </label>

      <label className="Form-label" htmlFor="email">
        <span className="Form-text">Rating</span>
        <input name={rating} className="Form-input" name="rating" type="number" placeholder="Enter Rating" required/>
        {errors.rating && <span className="error">{errors.rating}</span>}
      </label>

      <label className="Form-label" htmlFor="password">
        <span className="Form-text">Country</span>
        <input name={country} className="Form-input" name="country" type="text" placeholder="Movie Country" required/>
        {errors.country && <span className="error">{errors.country}</span>}
      </label>

      <label className="Form-label" htmlFor="retype-password">
        <span className="Form-text">Release Date</span>
        <input value={release} className="Form-input" name="release" type="text" placeholder="Release Date" required/>
        {errors.rel_date && <span className="error">{errors.rel_date}</span>}
      </label>

      <label className="Form-label" htmlFor="retype-password">
        <span className="Form-text">Genres</span>
        <input value={release} className="Form-input" name="release" type="text" placeholder="Release Date" required/>
        {errors.rel_date && <span className="error">{errors.rel_date}</span>}
      </label>
      <label className="Form-label" htmlFor="retype-password">
        <span className="Form-text">Description</span>
        <input value={description} className="Form-input" name="description" type="text" placeholder="Description" required/>
        {errors.description && <span className="error">{errors.description}</span>}
      </label>

      <button type="submit" className="Form-btn">Save</button>
    </form>
  );
}

export default Create;
