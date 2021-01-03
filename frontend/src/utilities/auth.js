/** utility function to parse required cookie */
function getCookie(name){
  let dc = document.cookie;
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
/** check if user have jwt token in cookie */
export function isAuth(){
  if(getCookie('jwt-session'))
    return true;
  else
    return false;
}