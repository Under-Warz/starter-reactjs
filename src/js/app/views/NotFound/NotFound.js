// import vendors
import React from 'react';
import i18next from 'i18next-client';
import { IndexLink, Link } from 'react-router';

// import classes
import RoutesData from '../../models/routes_data';

// import styles
import styles from './styles';


class NotFound extends React.Component {

  //________________________________________________________
  // -                                           CONSTRUCTOR
  constructor(props) {
    super(props);
  }


  //________________________________________________________
  // -                                        PUBLIC METHODS
  render() {
    return (
      <div className={styles.notfound}>
        <h1 className="title">{i18next.t('not_found.title')}</h1>
        <p className="description">{i18next.t('not_found.description')}</p>
        <div className="routes">
          <IndexLink to={RoutesData.getInstance().getRoute('home')} className="route" activeClassName="activeRoute">Home</IndexLink>
          <p className="separator"> - </p>
          <Link to={RoutesData.getInstance().getRoute('counter')} className="route" activeClassName="activeRoute">Counter</Link>
          <p className="separator"> - </p>
          <Link to={RoutesData.getInstance().getRoute('todos')} className="route" activeClassName="activeRoute">Todos</Link>
        </div>
      </div>
    );
  }

}
export default NotFound;