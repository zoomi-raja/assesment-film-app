import config from "../config";
import {getToken} from './auth';

export async function requestApi({url,data}){
  let request = {
    method:'GET',
    headers:{
      'Content-Type': 'application/json',
      'Authorization': `bearer ${getToken()}`
    }
  }
  if(data){
    request.body= JSON.stringify(data);
    request.method = 'POST';
  }
  try{
    const json = await fetch( `${config.API_URL}${url}`, request);
    const response = await json.json();
    return response;
  } catch(e){
    console.log(e);
  }
}