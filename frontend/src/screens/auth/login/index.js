import { useState } from 'react';
// styles
import '../../../form.css';

 
//Utiity function
const handleLogin = (e) => {
  e.preventDefault();

}
function Login() {
  //states
  const [email,setEmail] = useState({value:'',error:''});
  const [password,setPassword] = useState({value:'',error:''});

  //utilityfunction
  const handleEmail = (e) => {
    setEmail( {
      ...email,
      error: '',
      value: e.target.value,
    });
  }
  const handlePassword = (e) => {
    setPassword( {
      ...password,
      error: '',
      value: e.target.value,
    });
  }

  return (
    <form className="Form" method="post" onSubmit={handleLogin}>
      <label className="Form-label" htmlFor="email">
        <span className="Form-text">Email</span>
        <input value={email.value} onChange={ handleEmail } className="Form-input" name="email" type="email" placeholder="Place enter email" required/>
      </label>

      <label className="Form-label" htmlFor="password">
        <span className="Form-text">Password</span>
        <input value={password.value} onChange={handlePassword} className="Form-input" name="password" type="password" placeholder="Place enter password" required/>
      </label>

      <button type="submit" className="Form-btn">Sign In</button>
    </form>
  );
}

export default Login;
