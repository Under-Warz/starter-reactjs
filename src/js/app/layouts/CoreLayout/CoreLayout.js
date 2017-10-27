// import vendors
import React from 'react';

// import classes
import Header from '../../components/Header';

// import styles
import styles from './styles';


class CoreLayout extends React.Component {

  //________________________________________________________
  // -                                           CONSTRUCTOR
  constructor(props) {
    super(props);
  }


  //________________________________________________________
  // -                                        PUBLIC METHODS
  render() {
    return (
      <div className={styles.container}>
        <Header />
        {this.props.children}
      </div>
    );
  }

}
export default CoreLayout;