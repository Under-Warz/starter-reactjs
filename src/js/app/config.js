class Config {

  static get() {
    // Production
    const prod = {
      debug: false,
      api: {
        host: ''
      }
      // here other datas needed
    };

    // Staging
    const stg = {
      debug: false,
      api: {
        host: ''
      }
      // here other datas needed
    };

    // Dev
    const dev = {
      debug: true,
      api: {
        host: ''
      }
      // here other datas needed
    };

    let config;

    if (__PROD__) {
      config = prod;
    }
    else if (__STG__) {
      config = stg;
    }
    else {
      config = dev;
    }

    return Object.assign({}, config, {});
  }
}

export default Config.get();
