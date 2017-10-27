// import vendors
import i18next from 'i18next-client';


function promise() {
  return new Promise((resolve, reject) => {

    let locale = (window.config.locale) ? window.config.locale : 'fr' ;
    let i18nFile = window.config.i18n_file.replace(/{{locale}}/, locale);

    i18next.init({
      lng: locale,
      fallbackLng: false,
      customLoad: (lng, ns, options, loadComplete) => {

        fetch(i18nFile)
          .then((response) => {
            if (response.ok) {
              var contentType = response.headers.get("content-type");
              if (contentType && contentType.indexOf("application/json") !== -1) {
                return response.json().then((json) => {
                  loadComplete(null, json);
                  resolve();
                });
              }
            } else {
              reject(new Error('Error::app.bootstrapper.tasks.i18n_task - error while loading ' + i18nFile));  
            }
          })
          .catch((error) => {
            reject(new Error('Error::app.bootstrapper.tasks.i18n_task - error while loading ' + i18nFile));
          })
      }

    });

  });
}

export default promise;