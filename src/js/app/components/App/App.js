// import vendors
import React from 'react';
import { browserHistory, Router } from 'react-router';
import { Provider } from 'react-redux';
import PropTypes from 'prop-types';

// import styles
import styles from './styles';


class App extends React.Component {

  //________________________________________________________
  // -                                            PROP TYPES
  static propTypes = {
    store: PropTypes.object.isRequired,
    routes: PropTypes.object.isRequired,
  };


  //________________________________________________________
  // -                                        PUBLIC METHODS
  shouldComponentUpdate () {
    return false;
  }


  render () {
    return (
      <Provider store={this.props.store}>
        <div className={styles.wrapper}>
          <Router history={browserHistory} children={this.props.routes} />
        </div>
      </Provider>
    );
  }

}
export default App;