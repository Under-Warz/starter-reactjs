// import vendors
import { create } from 'apisauce';

// import classes
import Config from './config';


const api = create({
  baseURL: Config.api.host,
  headers: {}
});


class Api {

  // -----------------------------------------------------------
  // Example Request (cf: https://github.com/skellock/apisauce)
  // -----------------------------------------------------------
  /*
  static getData() {
    return api.get('datas', {}, {})
      .then((response) => {
        return response;
      })
      .catch((error) => {
        return Promise.reject({ error: response.error });
      });
  }
  */

}
export default Api;
