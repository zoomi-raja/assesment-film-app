/** utility function to parse required cookie */
function getCookie(name){
  let dc = document.cookie;
  debugger;
  let prefix = name + "=";
  var begin = dc.indexOf("; " + prefix);
  if (begin === -1) {
      begin = dc.indexOf(prefix);
      if (begin !== 0) return null;
  }
  else
  {
      begin += 2;
      var end = document.cookie.indexOf(";", begin);
      if (end === -1) {
      end = dc.length;
      }
  }
  return decodeURI(dc.substring(begin + prefix.length, end));
}
/**save logged user info */
export function saveUser({user,token}){
  localStorage.setItem("user", JSON.stringify(user));
  localStorage.setItem("film-token", token.access_token);
}
/** check if user have jwt token in cookie */
export function isAuth(){
  if(localStorage.getItem('film-token'))
    return true;
  else
    return false;
}

export function getToken(){
  return localStorage.getItem('film-token')
}

export function logout(){
  localStorage.removeItem('film-token')
  localStorage.removeItem('user')
}