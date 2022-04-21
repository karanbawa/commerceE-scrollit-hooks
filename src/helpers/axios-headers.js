
  //apply base url for axios
export const API_URL = process.env.REACT_APP_AUTHDOMAIN || '/';

export const headers =  { 
    headers: { 
        "Content-Type": "application/json", 
        "x-api-key": process.env.REACT_APP_APIKEY
    } 
}
