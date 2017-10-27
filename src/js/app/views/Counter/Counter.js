// import vendors
import React from 'react';
import { connect } from 'react-redux';
import i18next from 'i18next-client';

// import classes
import { increment, doubleAsync } from '../../reducers/counter';

// import styles
import styles from './styles';


const mapDispatchToProps = {
  increment: () => increment(1),
  doubleAsync
}

const mapStateToProps = (state) => ({
  counter: state.counter
})


class Counter extends React.Component {

  //________________________________________________________
  // -                                           CONSTRUCTOR
  constructor(props) {
    super(props);
  }


  //________________________________________________________
  // -                                        PUBLIC METHODS
  render() {
    return (
      <div className={styles.counter}>
        <h1>{i18next.t('counter.title')}</h1>
        <h2>{this.props.counter}</h2>
        <div className="buttons">
          <button onClick={this.props.increment}>{i18next.t('counter.increment')}</button>
          <button onClick={this.props.doubleAsync}>{i18next.t('counter.double')}</button>
        </div>
      </div>
    )
  }

}
export default connect(mapStateToProps, mapDispatchToProps)(Counter);