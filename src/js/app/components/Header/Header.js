// import vendors
import React from 'react';
import { connect } from 'react-redux';
import { IndexLink, Link } from 'react-router';
import i18next from 'i18next-client';

// import classes
import { loginAsync } from '../../reducers/session';
import RoutesData from '../../models/routes_data';

// import styles
import styles from './styles';


const mapDispatchToProps = {
  loginAsync
}

const mapStateToProps = (state) => ({
  session: state.session
})


class Header extends React.Component {

  //________________________________________________________
  // -                                           CONSTRUCTOR
  constructor(props) {
    super(props);

    this.state = {
      login: '',
      password: ''
    }

    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }


  //________________________________________________________
  // -                                        PUBLIC METHODS
  render() {
    let loginForm, links, welcome;

    if (this.props.session.isNotLoggedIn) {
      links = (
        <div className="routes">
          <IndexLink to={RoutesData.getInstance().getRoute('home')} className="route" activeClassName="activeRoute">Home</IndexLink>
          <p className="separator"> - </p>
          <Link to={RoutesData.getInstance().getRoute('counter')} className="route" activeClassName="activeRoute">Counter</Link>
        </div>
      )
      loginForm = (
        <form onSubmit={this.onSubmit}>
          <input type="text" placeholder={i18next.t('header.username')} name="login" onChange={this.onChange} />
          <input type="password" placeholder={i18next.t('header.password')} name="password" onChange={this.onChange} />
          <input type='submit' value={i18next.t('header.submit')} />
          <p className="error">{this.props.session.errorMsg}</p>
        </form>
      )
    } else {
      links = (
        <div className="routes">
          <IndexLink to={RoutesData.getInstance().getRoute('home')} className="route" activeClassName="activeRoute">Home</IndexLink>
          <p className="separator"> - </p>
          <Link to={RoutesData.getInstance().getRoute('counter')} className="route" activeClassName="activeRoute">Counter</Link>
          <p className="separator"> - </p>
          <Link to={RoutesData.getInstance().getRoute('todos')} className="route" activeClassName="activeRoute">Todos</Link>
        </div>
      )
      welcome = (
        <h4 className="welcome">{i18next.t('header.welcome')} {this.props.session.username}</h4>
      )
    }

    return (
      <div className={styles.header}>
        {links}
        {loginForm}
        {welcome}
      </div>
    );
  }


  //________________________________________________________
  // -                                                EVENTS
  onChange(e) {
    this.setState({
      [e.target.name]: e.target.value
    });
  }

  onSubmit(e) {
    e.preventDefault();

    this.props.loginAsync(this.state);
  }

}
export default connect(mapStateToProps, mapDispatchToProps)(Header);