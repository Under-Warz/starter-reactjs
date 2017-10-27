// import vendors
import React from 'react';

// import styles
import styles from './styles';


class SimpleLayout extends React.Component {

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
        {this.props.children}
      </div>
    );
  }

}
export default SimpleLayout;