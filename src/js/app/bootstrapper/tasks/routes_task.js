// import classes
import RoutesData from '../../models/routes_data';


function promise() {

  return new Promise((resolve, reject) => {

    fetch(window.config.routes_file)
      .then((response) => {
        if (response.ok) {
          var contentType = response.headers.get("content-type");
          if (contentType && contentType.indexOf("application/json") !== -1) {
            return response.json().then((json) => {
              RoutesData.getInstance().routes = json;
              resolve();
            });
          }
        } else {
          reject(new Error('Error::app.bootstrapper.tasks.data_task - error while loading routes.json'));
        }
      })
      .catch((error) => {
        reject(new Error('Error::app.bootstrapper.tasks.data_task - error while loading routes.json'));
      })

  });

}

export default promise;
