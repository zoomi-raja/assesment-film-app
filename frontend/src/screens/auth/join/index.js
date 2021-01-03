import { useContext, useState } from 'react';
import { Redirect } from 'react-router-dom';
import config from '../../../config';
import { authContext } from '../../../context/auth';
// styles
import '../../../form.css';
import { saveUser } from '../../../utilities/auth';
function Join() {
  //states
  const [name,setName] = useState('');
  const [email,setEmail] = useState('');
  const [password,setPassword] = useState('');
  const [rePassword,setRePassword] = useState('');
  const [toHome,setToHome] = useState(false);
  const [errors,setErrors] = useState({});
  //auth context
  const {setLoggedIn} = useContext(authContext);

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
  const handleRegister = async (e)=>{
     e.preventDefault();
    const data = {name, email, password, passwordRe:rePassword};
    try{
      const json = fetch( `${config.API_URL}/auth/register`, { method: 'POST',
        body: JSON.stringify(data),
        headers:{ 'Content-Type': 'application/json' } });
      const response = await (await json).json();
      if(response.error)
        setError(response.message);
      else{
        saveUser(response);
        setToHome(true);
        setLoggedIn(true);
      }
    }catch(e){
      console.log(e);
    }
  }


  const handleFieldChange = (field) => {
    return (e) => {
      switch(field){
        case 'name':
          setName(e.target.value)
        break;
        case 'email':
          setEmail(e.target.value)
        break;
        case 'password':
          setPassword(e.target.value)
        break;
        case 'rePassword':
          setRePassword(e.target.value)
        break;
      }
    }
  } 
  return (
    <form className="Form" method="post" onSubmit={handleRegister}>
      {toHome && <Redirect to="/films" />}
      <label className="Form-label" htmlFor="name">
        <span className="Form-text">Name</span>
        <input value={name} onChange={handleFieldChange('name')} className="Form-input" name="name" type="text" placeholder="Place enter name" required/>
        {errors.name && <span className="error">{errors.name}</span>}
      </label>

      <label className="Form-label" htmlFor="email">
        <span className="Form-text">Email</span>
        <input value={email} onChange={handleFieldChange('email')}  className="Form-input" name="email" type="email" placeholder="Place enter email" required/>
        {errors.email && <span className="error">{errors.email}</span>}
      </label>

      <label className="Form-label" htmlFor="password">
        <span className="Form-text">Password</span>
        <input value={password} onChange={handleFieldChange('password')}  className="Form-input" name="password" type="password" placeholder="Place enter password" required/>
        {errors.password && <span className="error">{errors.password}</span>}
      </label>

      <label className="Form-label" htmlFor="retype-password">
        <span className="Form-text">Password</span>
        <input value={rePassword} onChange={handleFieldChange('rePassword')}  className="Form-input" name="passwordRe" type="password" placeholder="Place retype password" required/>
        {errors.passwordRe && <span className="error">{errors.passwordRe}</span>}
      </label>

      <button type="submit" className="Form-btn">Register</button>
    </form>
  );
}

export default Join;
