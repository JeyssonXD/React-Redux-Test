import React from 'react';
import { Route,withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import cx from 'classnames';
import { setMobileNavVisibility } from '../../reducers/Layout';
import PropTypes from 'prop-types';

import Header from './Header';
import Footer from './Footer';
import SideBar from '../../components/SideBar';
/**
 * Pages
 */
import Dashboard from '../Dashboard';
import Person from '../Person';

const Main = ({
  mobileNavVisibility,
  hideMobileMenu,
  history,
  location
}) => {

  history.listen(() => {
    if (mobileNavVisibility === true) {
      hideMobileMenu();
    }
  });

  return (
    <div className={cx({
      'nav-open': mobileNavVisibility === true
    })}>
      <div className="wrapper">
        <div className="close-layer" onClick={hideMobileMenu}></div>
        <SideBar />

        <div className="main-panel">
          <Header />
          <Route location={location} exact path="/" component={Dashboard} />
          <Route location={location} exact path="/person/index" component={Person} />
          <Footer />
        </div>
      </div>
    </div>
  )
};

const mapStateToProp = state => ({
  mobileNavVisibility: state.Layout.mobileNavVisibility
});

const mapDispatchToProps = (dispatch, ownProps) => ({
  hideMobileMenu: () => dispatch(setMobileNavVisibility(false))
});

Main.propTypes = {
  location : PropTypes.shape({
    pathname : PropTypes.string.isRequired
  })
}

export default withRouter(connect(mapStateToProp, mapDispatchToProps)(Main));