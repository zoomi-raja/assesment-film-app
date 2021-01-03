import { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import Calendar from 'react-calendar';

// styles
import '../../form.css';
import 'react-calendar/dist/Calendar.css';

import { requestApi } from '../../utilities/request';

function Create({onAdd}) {
  //states
  const[name,setName] = useState('');
  const[rating,setRating] = useState(0);
  const[country,setCountry] = useState('');
  const[release,setRelease] = useState('');
  const[genres,setGeneres] = useState([]);
  const[genreIds,setGeneresIds] = useState([]);
  const[description,setDescription] = useState('');
  const[price,setPrice] = useState(0);
  const [errors,setErrors] = useState({});
  //navigation
  const history = useHistory();
  //fetch genre listing
  useEffect(()=>{
    async function fetchDate(){
      const generes = await requestApi({url:'/genre'});
      setGeneres(generes);
    }
    fetchDate();
  },[setGeneres]);
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
  const handleDateChange = (value) => {
    const dValue = new Date(value);
    setRelease(`${dValue.getDate()}-${(dValue.getMonth()+1)}-${(dValue.getFullYear())}`);
  }
  const handleRegister = async (e)=>{
    e.preventDefault();
    const data = {name, rating, country, description, rel_date:release, genre_ids:genreIds, ticket_price:price};
    try{
      const films = await requestApi({url:'/film',data});
      if(films.error)
        setError(films.message);
      else{
        history.push("/films");
        onAdd(films)
      }
    }catch(e){
      console.log(e);
    }
  }
  
  return (
    <form className="Form" method="post" onSubmit={handleRegister}>
      <label className="Form-label" htmlFor="name">
        <span className="Form-text">Name</span>
        <input value={name} onChange={(e)=>setName(e.target.value)} className="Form-input" name="name" type="text" placeholder="Place enter name" required/>
        {errors.name && <span className="error">{errors.name}</span>}
      </label>

      <label className="Form-label" htmlFor="email">
        <span className="Form-text">Price</span>
        <input value={price} onChange={(e)=>setPrice(parseInt(e.target.value))} className="Form-input" name="price" type="number" placeholder="Enter ticket price" required/>
        {errors.ticket_price && <span className="error">{errors.ticket_price}</span>}
      </label>

      <label className="Form-label" htmlFor="email">
        <span className="Form-text">Rating</span>
        <input value={rating} onChange={(e)=>setRating(parseInt(e.target.value))} className="Form-input" name="rating" type="number" placeholder="Enter Rating" required/>
        {errors.rating && <span className="error">{errors.rating}</span>}
      </label>

      <label className="Form-label" htmlFor="password">
        <span className="Form-text">Country</span>
        <input value={country} onChange={(e)=>setCountry(e.target.value)} className="Form-input" name="country" type="text" placeholder="Movie Country" required/>
        {errors.country && <span className="error">{errors.country}</span>}
      </label>

      <label className="Form-label" htmlFor="retype-password">
        <span className="Form-text">Release Date</span>
        <Calendar name="release" onChange={handleDateChange}/>
        {errors.rel_date && <span className="error">{errors.rel_date}</span>}
      </label>

      <label className="Form-label" htmlFor="retype-password">
        <span className="Form-text">Genres</span>
        <select className="Form-input" name="genreIds" multiple={true} required onChange={(e)=> {
            let value = Array.from(e.target.selectedOptions, option => option.value);
            setGeneresIds(value)
          }}>
          <option value={genreIds} >Select Genre</option>
          {genres && genres.map(genre => {
            return <option key={genre.id} value={genre.id}>{genre.name}</option>
          })}

        </select>
        {errors.genres && <span className="error">{errors.genres}</span>}
      </label>
      <label className="Form-label" htmlFor="retype-password">
        <textarea value={description} onChange={(e)=>setDescription(e.target.value)} className="Form-textarea" name="description" type="text" placeholder="Description" required/>
        {errors.description && <span className="error">{errors.description}</span>}
      </label>

      <button type="submit" className="Form-btn">Save</button>
    </form>
  );
}

export default Create;
