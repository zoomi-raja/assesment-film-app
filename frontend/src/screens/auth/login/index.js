import { useContext, useState } from 'react';
import { Redirect } from 'react-router-dom';

import config from '../../../config';
//auth context
import { authContext } from '../../../context/auth';
//utils
import { saveUser } from '../../../utilities/auth';
// styles
import '../../../form.css';

function Login() {
  //states
  const [error,setError] = useState('');
  const [email,setEmail] = useState('');
  const [password,setPassword] = useState('');
  const [toHome,setToHome] = useState(false);
  //auth context
  const {setLoggedIn} = useContext(authContext);

  //utilityfunction
  const handleEmail = (e) => {
    setEmail( e.target.value );
  }
  const handlePassword = (e) => {
    setPassword(e.target.value);
  }
  //Utiity function
  const handleLogin = async (e) => {
    e.preventDefault();
    const data = {email, password};
    try{
      const json = await fetch( `${config.API_URL}/auth/login`, { method: 'POST',
        body: JSON.stringify(data),
        headers:{ 'Content-Type': 'application/json' } });
      const response = await json.json();
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

  return (
    <form className="Form" method="post" onSubmit={handleLogin}>
      {toHome && <Redirect to="/films" />}
      {error && <span className="g-error">{error}</span>}
      <label className="Form-label" htmlFor="email">
        <span className="Form-text">Email</span>
        <input value={email.value} onChange={ handleEmail } className="Form-input" name="email" type="email" placeholder="Place enter email" required/>
      </label>

      <label className="Form-label" htmlFor="password">
        <span className="Form-text">Password</span>
        <input value={password.value} onChange={handlePassword} className="Form-input" name="password" type="password" placeholder="Place enter password" autoComplete='off' required/>
      </label>

      <button type="submit" className="Form-btn">Sign In</button>
    </form>
  );
}

export default Login;
