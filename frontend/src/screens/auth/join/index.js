// styles
import '../../../form.css';

function Login() {
  return (
    <form className="Form" action="#">
      <label className="Form-label" htmlFor="name">
        <span className="Form-text">Name</span>
        <input className="Form-input" name="name" type="text" placeholder="Place enter name" required/>
      </label>

      <label className="Form-label" htmlFor="email">
        <span className="Form-text">Email</span>
        <input className="Form-input" name="email" type="email" placeholder="Place enter email" required/>
      </label>

      <label className="Form-label" htmlFor="password">
        <span className="Form-text">Password</span>
        <input className="Form-input" name="password" type="password" placeholder="Place enter password" required/>
      </label>

      <label className="Form-label" htmlFor="retype-password">
        <span className="Form-text">Password</span>
        <input className="Form-input" name="passwordRe" type="password" placeholder="Place retype password" required/>
      </label>

      <button type="submit" className="Form-btn">Register</button>
    </form>
  );
}

export default Login;
