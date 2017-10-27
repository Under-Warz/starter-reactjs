// import vendors
import React from 'react';
import i18next from 'i18next-client';

// import images
import img from 'assets/images/test0.jpg';

// import styles
import styles from './styles';


class Home extends React.Component {

  //________________________________________________________
  // -                                           CONSTRUCTOR
  constructor(props) {
    super(props);
  }


  //________________________________________________________
  // -                                        PUBLIC METHODS
  render() {
    return (
      <div className={styles.home}>
        <h1 className="title">{i18next.t('home.title')}</h1>
        <div className="img"></div>
        <img src={img}/>
        <div className="sharing">
          <a href="http://www.facebook.com" target="_blank">
            <i className="icon icon-facebook"></i>
          </a>
          <a href="http://www.twitter.com" target="_blank">
            <i className="icon icon-twitter"></i>
          </a>
        </div>
      </div>
    );
  }

}
export default Home;
